import express from "express";
import path from "path";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import bcrypt from "bcryptjs";
import sanitizeHtml from "sanitize-html";
import sharp from "sharp";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  status: "draft" | "published" | "scheduled";
  featured?: boolean;
  readingTime?: string;
  scheduledFor?: string;
}

interface SessionUser {
  email: string;
  role: string;
}

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
    csrfToken?: string;
  }
}

const PORT = Number(process.env.PORT || 3000);
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMe123!";
const SESSION_SECRET = process.env.SESSION_SECRET || "blog-session-secret";
const DEFAULT_AUTHOR = process.env.DEFAULT_AUTHOR || "Admin";
let supabaseClient: SupabaseClient | null = null;

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sanitizeText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return supabaseClient;
}

async function ensureAdminUser(supabase: SupabaseClient) {
  const email = DEFAULT_ADMIN_EMAIL.toLowerCase();
  try {
    const { data: existing } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
    if (existing) {
      return;
    }
    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    await supabase.from("users").insert({ email, password_hash: passwordHash, role: "admin" });
  } catch (error) {
    console.warn("Supabase admin user bootstrap skipped:", error);
  }
}

async function ensureAdminPasswordHash() {
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  if (configuredHash) {
    return configuredHash;
  }
  return bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
}

function buildPublicPost(post: BlogPost) {
  return {
    ...post,
    content: post.content || "",
  };
}

function normalizePost(input: Partial<BlogPost>, defaultAuthor: string = DEFAULT_AUTHOR): BlogPost {
  const title = input.title ? sanitizeText(input.title) : "Untitled Post";
  const content = input.content ? sanitizeText(input.content) : "";
  const excerpt = input.excerpt ? sanitizeText(input.excerpt) : content.slice(0, 180);
  const now = new Date().toISOString();
  const slugBase = input.slug || slugify(title);
  const slug = slugBase.toLowerCase();
  return {
    id: input.id || randomUUID(),
    title,
    slug,
    excerpt,
    content,
    featuredImage: input.featuredImage || "",
    category: input.category || "General",
    tags: Array.isArray(input.tags) ? input.tags : [],
    seoTitle: input.seoTitle || title,
    metaDescription: input.metaDescription || excerpt,
    canonicalUrl: input.canonicalUrl || `https://example.com/blog/${slug}`,
    ogTitle: input.ogTitle || title,
    ogDescription: input.ogDescription || excerpt,
    twitterCard: input.twitterCard || "summary_large_image",
    author: input.author || defaultAuthor || "Admin",
    publishedAt: input.publishedAt || now,
    updatedAt: now,
    status: input.status || "draft",
    featured: Boolean(input.featured),
    readingTime: input.readingTime || estimateReadingTime(content),
    scheduledFor: input.scheduledFor || "",
  };
}

function buildPostInputFromRow(row: any, overrides: Partial<BlogPost> = {}): Partial<BlogPost> {
  const tags = Array.isArray(row.post_tags)
    ? row.post_tags
        .map((entry: any) => entry?.tags?.name)
        .filter(Boolean)
    : [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content: row.content || "",
    featuredImage: row.featured_image || "",
    category: row.categories?.name || "General",
    tags,
    seoTitle: row.seo_title || row.title,
    metaDescription: row.meta_description || row.excerpt || "",
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || row.title,
    ogDescription: row.og_description || row.excerpt || "",
    twitterCard: row.twitter_card || "summary_large_image",
    author: row.authors?.name || DEFAULT_AUTHOR,
    publishedAt: row.publish_date || row.created_at || "",
    updatedAt: row.last_updated || row.created_at || "",
    status: row.status || "draft",
    featured: Boolean(row.featured),
    readingTime: row.reading_time || estimateReadingTime(row.content || ""),
    scheduledFor: row.scheduled_for || "",
    ...overrides,
  };
}

function mapPostRow(row: any, tagNames: string[] = []): BlogPost {
  const tags = tagNames.length > 0 ? tagNames : Array.isArray(row.post_tags)
    ? row.post_tags
        .map((entry: any) => entry?.tags?.name)
        .filter(Boolean)
    : [];

  return normalizePost({ ...buildPostInputFromRow(row), tags }, row.authors?.name || DEFAULT_AUTHOR);
}

async function ensureCategory(supabase: SupabaseClient, name: string, featured = false) {
  const slugValue = slugify(name || "general");
  const { data: existing } = await supabase.from("categories").select("id").eq("slug", slugValue).maybeSingle();
  if (existing?.id) {
    return existing.id as string;
  }
  const { data, error } = await supabase.from("categories").insert({ name, slug: slugValue, featured }).select("id").single();
  if (error || !data?.id) {
    throw new Error(error?.message || "Unable to create category");
  }
  return data.id as string;
}

async function ensureAuthor(supabase: SupabaseClient, name: string) {
  const authorName = name || DEFAULT_AUTHOR;
  const { data: existing } = await supabase.from("authors").select("id").eq("name", authorName).maybeSingle();
  if (existing?.id) {
    return existing.id as string;
  }
  const { data, error } = await supabase.from("authors").insert({ name: authorName, role: "Author" }).select("id").single();
  if (error || !data?.id) {
    throw new Error(error?.message || "Unable to create author");
  }
  return data.id as string;
}

async function ensureTag(supabase: SupabaseClient, name: string) {
  const slugValue = slugify(name || "tag");
  const { data: existing } = await supabase.from("tags").select("id").eq("slug", slugValue).maybeSingle();
  if (existing?.id) {
    return existing.id as string;
  }
  const { data, error } = await supabase.from("tags").insert({ name, slug: slugValue }).select("id").single();
  if (error || !data?.id) {
    throw new Error(error?.message || "Unable to create tag");
  }
  return data.id as string;
}

async function syncPostTags(supabase: SupabaseClient, postId: string, tags: string[]) {
  await supabase.from("post_tags").delete().eq("post_id", postId);
  for (const tagName of tags) {
    const cleanName = tagName.trim();
    if (!cleanName) {
      continue;
    }
    const tagId = await ensureTag(supabase, cleanName);
    await supabase.from("post_tags").insert({ post_id: postId, tag_id: tagId });
  }
}

async function upsertSettings(supabase: SupabaseClient, payload: Record<string, unknown>) {
  const { data: existing } = await supabase.from("settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  const values = {
    site_name: payload.siteName || "Rajswa Blog",
    tagline: payload.tagline || "Production-ready publishing workflow",
    default_author: payload.defaultAuthor || DEFAULT_AUTHOR,
    ga_id: payload.gaId || null,
    clarity_id: payload.clarityId || null,
    updated_at: new Date().toISOString(),
  };
  if (existing?.id) {
    const { data, error } = await supabase.from("settings").update(values).eq("id", existing.id).select("*").single();
    if (error || !data) {
      throw new Error(error?.message || "Unable to update settings");
    }
    return data;
  }
  const { data, error } = await supabase.from("settings").insert(values).select("*").single();
  if (error || !data) {
    throw new Error(error?.message || "Unable to create settings");
  }
  return data;
}

async function getSettings(supabase: SupabaseClient) {
  const { data } = await supabase.from("settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (!data) {
    return {
      siteName: "Rajswa Blog",
      tagline: "Production-ready publishing workflow",
      defaultAuthor: DEFAULT_AUTHOR,
    };
  }
  return {
    siteName: data.site_name || "Rajswa Blog",
    tagline: data.tagline || "Production-ready publishing workflow",
    defaultAuthor: data.default_author || DEFAULT_AUTHOR,
    gaId: data.ga_id || undefined,
    clarityId: data.clarity_id || undefined,
  };
}

async function startServer() {
  await ensureUploadDir();
  const adminPasswordHash = await ensureAdminPasswordHash();
  const app = express();
  const supabase = await getSupabaseClient();
  if (supabase) {
    await ensureAdminUser(supabase);
  }

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", sameSite: true },
    })
  );

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));

  app.use("/uploads", express.static(UPLOAD_DIR));

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  function generateCsrfToken(req: express.Request) {
    const token = req.session.csrfToken || randomUUID();
    req.session.csrfToken = token;
    return token;
  }

  function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.session.user) {
      return next();
    }
    return res.status(401).json({ error: "Authentication required" });
  }

  app.use("/api", (req, res, next) => {
    if (req.method === "GET" || req.path === "/auth/csrf" || req.path === "/auth/login") {
      return next();
    }
    const token = req.header("x-csrf-token") || (req.body && req.body.csrfToken);
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).json({ error: "Invalid CSRF token" });
    }
    return next();
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/auth/csrf", (req, res) => {
    res.json({ csrfToken: generateCsrfToken(req) });
  });

  app.get("/api/auth/me", (req, res) => {
    res.json({ user: req.session.user || null });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const emailValue = (email || "").toLowerCase();
    const supabaseClientInstance = await getSupabaseClient();

    if (supabaseClientInstance) {
      try {
        const { data: userRow } = await supabaseClientInstance.from("users").select("*").eq("email", emailValue).maybeSingle();
        if (userRow?.password_hash && (await bcrypt.compare(password || "", userRow.password_hash))) {
          req.session.user = { email: emailValue, role: userRow.role || "admin" };
          return res.json({ user: req.session.user });
        }
      } catch (error) {
        console.warn("Supabase login lookup failed:", error);
      }
    }

    const fallbackValid = emailValue === DEFAULT_ADMIN_EMAIL.toLowerCase() && (await bcrypt.compare(password || "", adminPasswordHash));
    if (!fallbackValid) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }
    req.session.user = { email: emailValue, role: "admin" };
    return res.json({ user: req.session.user });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  app.get("/api/posts", async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const includeAll = req.query.include === "all" && Boolean(req.session.user);
    const query = supabaseClientInstance
      .from("posts")
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .order("publish_date", { ascending: false, nullsFirst: false });

    const { data, error } = includeAll ? await query : await query.eq("status", "published");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const posts = (data || [])
      .map((row) => mapPostRow(row))
      .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
    return res.json(posts.map(buildPublicPost));
  });

  app.get("/api/posts/:slug", async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data, error } = await supabaseClientInstance
      .from("posts")
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .eq("slug", req.params.slug)
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (data.status !== "published" && !req.session.user) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json(buildPublicPost(mapPostRow(data)));
  });

  app.post("/api/posts", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }

    const normalized = normalizePost({ ...req.body, status: "draft" }, DEFAULT_AUTHOR);
    let slug = normalized.slug;
    const { data: existingSlug } = await supabaseClientInstance.from("posts").select("id").eq("slug", slug).maybeSingle();
    if (existingSlug) {
      slug = `${slug}-${randomUUID().slice(0, 6)}`;
    }

    const categoryId = await ensureCategory(supabaseClientInstance, normalized.category || "General", false);
    const authorId = await ensureAuthor(supabaseClientInstance, normalized.author || DEFAULT_AUTHOR);
    const insertPayload = {
      title: normalized.title,
      slug,
      excerpt: normalized.excerpt,
      content: normalized.content,
      featured_image: normalized.featuredImage || null,
      category_id: categoryId,
      author_id: authorId,
      status: normalized.status,
      featured: normalized.featured || false,
      seo_title: normalized.seoTitle || normalized.title,
      meta_description: normalized.metaDescription || normalized.excerpt,
      canonical_url: normalized.canonicalUrl || `https://example.com/blog/${slug}`,
      og_title: normalized.ogTitle || normalized.title,
      og_description: normalized.ogDescription || normalized.excerpt,
      twitter_card: normalized.twitterCard || "summary_large_image",
      reading_time: normalized.readingTime || estimateReadingTime(normalized.content),
      publish_date: normalized.status === "published" ? new Date().toISOString() : null,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseClientInstance.from("posts").insert(insertPayload).select("*, categories(*), authors(*), post_tags(tag_id, tags(*))").single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to create post" });
    }

    await syncPostTags(supabaseClientInstance, data.id, normalized.tags || []);
    return res.status(201).json(mapPostRow(data, normalized.tags || []));
  });

  app.put("/api/posts/:id", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }

    const { data: existing, error: fetchError } = await supabaseClientInstance
      .from("posts")
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .eq("id", req.params.id)
      .maybeSingle();
    if (fetchError || !existing) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existingInput = buildPostInputFromRow(existing);
    const normalized = normalizePost({ ...existingInput, ...req.body, id: req.params.id }, existingInput.author || DEFAULT_AUTHOR);
    const categoryId = await ensureCategory(supabaseClientInstance, normalized.category || "General", false);
    const authorId = await ensureAuthor(supabaseClientInstance, normalized.author || DEFAULT_AUTHOR);

    const updatePayload = {
      title: normalized.title,
      slug: normalized.slug,
      excerpt: normalized.excerpt,
      content: normalized.content,
      featured_image: normalized.featuredImage || null,
      category_id: categoryId,
      author_id: authorId,
      status: normalized.status,
      featured: normalized.featured || false,
      seo_title: normalized.seoTitle || normalized.title,
      meta_description: normalized.metaDescription || normalized.excerpt,
      canonical_url: normalized.canonicalUrl || `https://example.com/blog/${normalized.slug}`,
      og_title: normalized.ogTitle || normalized.title,
      og_description: normalized.ogDescription || normalized.excerpt,
      twitter_card: normalized.twitterCard || "summary_large_image",
      reading_time: normalized.readingTime || estimateReadingTime(normalized.content),
      last_updated: new Date().toISOString(),
    };

    const { data, error } = await supabaseClientInstance
      .from("posts")
      .update(updatePayload)
      .eq("id", req.params.id)
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to update post" });
    }

    await syncPostTags(supabaseClientInstance, req.params.id, normalized.tags || []);
    return res.json(mapPostRow(data, normalized.tags || []));
  });

  app.delete("/api/posts/:id", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    await supabaseClientInstance.from("post_tags").delete().eq("post_id", req.params.id);
    const { error } = await supabaseClientInstance.from("posts").delete().eq("id", req.params.id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({ ok: true });
  });

  app.post("/api/posts/:id/publish", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data, error } = await supabaseClientInstance
      .from("posts")
      .update({ status: "published", publish_date: new Date().toISOString(), last_updated: new Date().toISOString() })
      .eq("id", req.params.id)
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .single();
    if (error || !data) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json(mapPostRow(data));
  });

  app.post("/api/posts/:id/unpublish", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data, error } = await supabaseClientInstance
      .from("posts")
      .update({ status: "draft", last_updated: new Date().toISOString() })
      .eq("id", req.params.id)
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .single();
    if (error || !data) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json(mapPostRow(data));
  });

  app.post("/api/posts/:id/duplicate", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data: source, error: fetchError } = await supabaseClientInstance
      .from("posts")
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .eq("id", req.params.id)
      .maybeSingle();
    if (fetchError || !source) {
      return res.status(404).json({ error: "Post not found" });
    }
    const duplicateInput = buildPostInputFromRow(source, {
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy`,
      status: "draft",
      publishedAt: "",
    });
    const duplicate = normalizePost(duplicateInput, source.authors?.name || DEFAULT_AUTHOR);
    const categoryId = await ensureCategory(supabaseClientInstance, duplicate.category || "General", false);
    const authorId = await ensureAuthor(supabaseClientInstance, duplicate.author || DEFAULT_AUTHOR);
    const { data, error } = await supabaseClientInstance
      .from("posts")
      .insert({
        title: duplicate.title,
        slug: duplicate.slug,
        excerpt: duplicate.excerpt,
        content: duplicate.content,
        featured_image: duplicate.featuredImage || null,
        category_id: categoryId,
        author_id: authorId,
        status: duplicate.status,
        featured: duplicate.featured || false,
        seo_title: duplicate.seoTitle || duplicate.title,
        meta_description: duplicate.metaDescription || duplicate.excerpt,
        canonical_url: duplicate.canonicalUrl || `https://example.com/blog/${duplicate.slug}`,
        og_title: duplicate.ogTitle || duplicate.title,
        og_description: duplicate.ogDescription || duplicate.excerpt,
        twitter_card: duplicate.twitterCard || "summary_large_image",
        reading_time: duplicate.readingTime || estimateReadingTime(duplicate.content),
        publish_date: null,
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select("*, categories(*), authors(*), post_tags(tag_id, tags(*))")
      .single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to duplicate post" });
    }
    await syncPostTags(supabaseClientInstance, data.id, duplicate.tags || []);
    return res.status(201).json(mapPostRow(data, duplicate.tags || []));
  });

  app.get("/api/categories", async (_req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data, error } = await supabaseClientInstance.from("categories").select("*").order("created_at", { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json((data || []).map((item: any) => ({ id: item.id, name: item.name, slug: item.slug, parentId: item.parent_id || null, featured: Boolean(item.featured) })));
  });

  app.post("/api/categories", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const name = sanitizeText(req.body.name || "New Category");
    const slugValue = slugify(req.body.slug || name || "new-category");
    const { data, error } = await supabaseClientInstance.from("categories").insert({ name, slug: slugValue, featured: Boolean(req.body.featured), parent_id: req.body.parentId || null }).select("*").single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to create category" });
    }
    return res.status(201).json({ id: data.id, name: data.name, slug: data.slug, parentId: data.parent_id || null, featured: Boolean(data.featured) });
  });

  app.put("/api/categories/:id", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const name = sanitizeText(req.body.name || "Category");
    const slugValue = slugify(req.body.slug || name || "category");
    const { data, error } = await supabaseClientInstance.from("categories").update({ name, slug: slugValue, featured: Boolean(req.body.featured) }).eq("id", req.params.id).select("*").single();
    if (error || !data) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({ id: data.id, name: data.name, slug: data.slug, parentId: data.parent_id || null, featured: Boolean(data.featured) });
  });

  app.delete("/api/categories/:id", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { error } = await supabaseClientInstance.from("categories").delete().eq("id", req.params.id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({ ok: true });
  });

  app.get("/api/tags", async (_req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { data, error } = await supabaseClientInstance.from("tags").select("*").order("created_at", { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json((data || []).map((item: any) => ({ id: item.id, name: item.name, slug: item.slug })));
  });

  app.post("/api/tags", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const name = sanitizeText(req.body.name || "Tag");
    const slugValue = slugify(req.body.slug || name || "tag");
    const { data, error } = await supabaseClientInstance.from("tags").insert({ name, slug: slugValue }).select("*").single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to create tag" });
    }
    return res.status(201).json({ id: data.id, name: data.name, slug: data.slug });
  });

  app.delete("/api/tags/:id", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const { error } = await supabaseClientInstance.from("tags").delete().eq("id", req.params.id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({ ok: true });
  });

  app.post("/api/media/upload", requireAuth, upload.single("image"), async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const optimized = await sharp(req.file.buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true })
      .toBuffer();
    const ext = path.extname(req.file.originalname || ".jpg") || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filePath, optimized);
    const publicUrl = `/uploads/${filename}`;
    const { data, error } = await supabaseClientInstance.from("media").insert({ original_name: req.file.originalname, url: publicUrl, alt: req.body.alt || "Uploaded image", caption: req.body.caption || "", created_at: new Date().toISOString() }).select("*").single();
    if (error || !data) {
      return res.status(500).json({ error: error?.message || "Unable to save media metadata" });
    }
    return res.json({ url: publicUrl, media: { id: data.id, originalName: data.original_name, url: data.url, alt: data.alt || "", caption: data.caption || "", createdAt: data.created_at } });
  });

  app.get("/api/settings", async (_req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    return res.json(await getSettings(supabaseClientInstance));
  });

  app.put("/api/settings", requireAuth, async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const saved = await upsertSettings(supabaseClientInstance, req.body as Record<string, unknown>);
    return res.json({
      siteName: saved.site_name || "Rajswa Blog",
      tagline: saved.tagline || "Production-ready publishing workflow",
      defaultAuthor: saved.default_author || DEFAULT_AUTHOR,
      gaId: saved.ga_id || undefined,
      clarityId: saved.clarity_id || undefined,
    });
  });

  app.get("/api/search", async (req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).json({ error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
    }
    const q = (req.query.q as string | undefined || "").toLowerCase();
    const category = (req.query.category as string | undefined || "").toLowerCase();
    const tag = (req.query.tag as string | undefined || "").toLowerCase();
    const { data, error } = await supabaseClientInstance.from("posts").select("*, categories(*), authors(*), post_tags(tag_id, tags(*))").eq("status", "published").order("publish_date", { ascending: false, nullsFirst: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const results = (data || [])
      .map((row) => mapPostRow(row))
      .filter((post) => {
        const haystack = [post.title, post.excerpt, post.content, post.category, ...(post.tags || [])].join(" ").toLowerCase();
        const matchesQuery = !q || haystack.includes(q);
        const matchesCategory = !category || post.category.toLowerCase() === category;
        const matchesTag = !tag || post.tags.some((item) => item.toLowerCase() === tag);
        return matchesQuery && matchesCategory && matchesTag;
      })
      .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
    return res.json(results.map(buildPublicPost));
  });

  app.get("/sitemap.xml", async (_req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).type("application/xml").send("<error>Supabase not configured</error>");
    }
    const { data } = await supabaseClientInstance.from("posts").select("slug").eq("status", "published");
    const urls = (data || []).map((post: any) => `<url><loc>https://example.com/blog/${post.slug}</loc></url>`).join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  });

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n");
  });

  app.get("/rss.xml", async (_req, res) => {
    const supabaseClientInstance = await getSupabaseClient();
    if (!supabaseClientInstance) {
      return res.status(503).type("application/xml").send("<error>Supabase not configured</error>");
    }
    const { data } = await supabaseClientInstance.from("posts").select("title, slug, excerpt").eq("status", "published").order("publish_date", { ascending: false, nullsFirst: false }).limit(10);
    const items = (data || []).map((post: any) => `<item><title>${post.title}</title><link>https://example.com/blog/${post.slug}</link><description>${post.excerpt}</description></item>`).join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Rajswa Blog</title><link>https://example.com</link><description>Production-ready publishing workflow</description>${items}</channel></rss>`);
  });

  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add it via Settings > Secrets.",
        });
      }
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: systemInstruction ? { systemInstruction } : undefined,
      });
      return res.json({ text: response.text });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred during API content generation.";
      console.error("Gemini API Error in backend:", error);
      return res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
