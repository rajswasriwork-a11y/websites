import React, { useEffect, useMemo, useState } from 'react';
import { FileText, ImagePlus, Settings2, Layers, LogOut, Plus, Trash2, Send, BookOpen, Sparkles } from 'lucide-react';
import { createCategory, createPost, createTag, deleteCategory, deletePost, deleteTag, fetchCategories, fetchPosts, fetchSettings, fetchTags, getCurrentUser, loginAdmin, logoutAdmin, publishPost, unpublishPost, updateCategory, updatePost, updateSettings, uploadImage } from '../lib/api';

interface AdminUser {
  email: string;
  role: string;
}

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
  status: string;
  featured?: boolean;
  readingTime?: string;
}

interface CategoryItem { id: string; name: string; slug: string; parentId?: string | null; featured?: boolean; }
interface TagItem { id: string; name: string; slug: string; }
interface SettingsState { siteName: string; tagline: string; defaultAuthor: string; gaId?: string; clarityId?: string; }

const initialPost: BlogPost = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  category: 'General',
  tags: [],
  seoTitle: '',
  metaDescription: '',
  canonicalUrl: '',
  ogTitle: '',
  ogDescription: '',
  twitterCard: 'summary_large_image',
  author: 'Admin',
  status: 'draft',
  featured: false,
};

const toolbarButtons = [
  { label: 'H2', action: 'heading' },
  { label: 'Bold', action: 'bold' },
  { label: 'Italic', action: 'italic' },
  { label: 'List', action: 'list' },
  { label: 'Quote', action: 'quote' },
  { label: 'Code', action: 'code' },
  { label: 'Link', action: 'link' },
];

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [settings, setSettings] = useState<SettingsState>({ siteName: 'Rajswa Blog', tagline: 'Production-ready publishing workflow', defaultAuthor: 'Admin' });
  const [activeView, setActiveView] = useState<'dashboard' | 'posts' | 'categories' | 'media' | 'settings'>('dashboard');
  const [form, setForm] = useState<BlogPost>(initialPost);
  const [isEditing, setIsEditing] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: 'admin@example.com', password: 'ChangeMe123!' });
  const [loginError, setLoginError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    void loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const userResponse = await getCurrentUser();
      if (userResponse.user) {
        setUser(userResponse.user as AdminUser);
        const [postsData, categoryData, tagData, settingsData] = await Promise.all([fetchPosts(true), fetchCategories(), fetchTags(), fetchSettings().catch(() => null)]);
        setPosts(postsData || []);
        setCategories(categoryData || []);
        setTags(tagData || []);
        if (settingsData) setSettings(settingsData);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');
    try {
      const response = await loginAdmin(loginForm.email, loginForm.password);
      setUser(response.user as AdminUser);
      await loadDashboard();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Unable to sign in');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
    setActiveView('dashboard');
  };

  const handleCreateOrUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatusMessage('');
    try {
      const payload = {
        ...form,
        tags: form.tags.filter(Boolean),
        featuredImage: form.featuredImage || undefined,
      };
      if (isEditing && form.id) {
        const updated = await updatePost(form.id, payload);
        setPosts((current) => current.map((post) => post.id === updated.id ? updated : post));
        setStatusMessage('Post updated successfully.');
      } else {
        const created = await createPost(payload);
        setPosts((current) => [created, ...current]);
        setStatusMessage('Post created and saved as draft.');
      }
      setForm(initialPost);
      setIsEditing(false);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to save post');
    }
  };

  const handlePublish = async (post: BlogPost) => {
    if (!post.id) return;
    const updated = await publishPost(post.id);
    setPosts((current) => current.map((item) => item.id === updated.id ? updated : item));
    setStatusMessage('Post published.');
  };

  const handleUnpublish = async (post: BlogPost) => {
    if (!post.id) return;
    const updated = await unpublishPost(post.id);
    setPosts((current) => current.map((item) => item.id === updated.id ? updated : item));
    setStatusMessage('Post moved back to draft.');
  };

  const handleDelete = async (post: BlogPost) => {
    if (!post.id) return;
    await deletePost(post.id);
    setPosts((current) => current.filter((item) => item.id !== post.id));
    setStatusMessage('Post removed.');
  };

  const handleCategorySave = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      name: (document.getElementById('categoryName') as HTMLInputElement | null)?.value || '',
      slug: (document.getElementById('categorySlug') as HTMLInputElement | null)?.value || '',
      featured: (document.getElementById('categoryFeatured') as HTMLInputElement | null)?.checked || false,
    };
    const created = await createCategory(payload);
    setCategories((current) => [created, ...current]);
    setStatusMessage('Category created.');
  };

  const handleCategoryDelete = async (category: CategoryItem) => {
    await deleteCategory(category.id);
    setCategories((current) => current.filter((item) => item.id !== category.id));
  };

  const handleTagCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      name: (document.getElementById('tagName') as HTMLInputElement | null)?.value || '',
      slug: (document.getElementById('tagSlug') as HTMLInputElement | null)?.value || '',
    };
    const created = await createTag(payload);
    setTags((current) => [created, ...current]);
    setStatusMessage('Tag created.');
  };

  const handleTagDelete = async (tag: TagItem) => {
    await deleteTag(tag.id);
    setTags((current) => current.filter((item) => item.id !== tag.id));
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadResult = await uploadImage(file);
      setForm((current) => ({ ...current, featuredImage: uploadResult.url }));
      setStatusMessage('Image uploaded successfully.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSettingsSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const updated = await updateSettings(settings);
    setSettings(updated);
    setStatusMessage('Settings saved.');
  };

  const applyFormat = (action: string) => {
    const textarea = document.getElementById('post-content') as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.slice(start, end) || 'content';
    let replacement = selected;
    switch (action) {
      case 'heading': replacement = `## ${selected}`; break;
      case 'bold': replacement = `**${selected}**`; break;
      case 'italic': replacement = `*${selected}*`; break;
      case 'list': replacement = `- ${selected}`; break;
      case 'quote': replacement = `> ${selected}`; break;
      case 'code': replacement = `\`\`${selected}\`\``; break;
      case 'link': replacement = `[${selected}](https://example.com)`; break;
      default: break;
    }
    const next = value.slice(0, start) + replacement + value.slice(end);
    setForm((current) => ({ ...current, content: next }));
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + replacement.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const stats = useMemo(() => ({
    total: posts.length,
    published: posts.filter((post) => post.status === 'published').length,
    drafts: posts.filter((post) => post.status === 'draft').length,
  }), [posts]);

  if (loading && !user) {
    return <div className="min-h-screen bg-zinc-950 p-10 text-white">Preparing admin workspace…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-orange-500/20 p-3 text-orange-400"><Sparkles className="h-5 w-5" /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-400">Secure access</p>
              <h1 className="text-2xl font-semibold">Admin login</h1>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input value={loginForm.email} onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))} type="email" placeholder="Email" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
            <input value={loginForm.password} onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))} type="password" placeholder="Password" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
            {loginError ? <p className="text-sm text-red-400">{loginError}</p> : null}
            <button className="w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row">
        <aside className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:w-72">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-400">CMS</p>
              <h2 className="text-xl font-semibold">Admin console</h2>
            </div>
            <button onClick={handleLogout} className="rounded-2xl border border-zinc-800 p-2 text-zinc-400"><LogOut className="h-4 w-4" /></button>
          </div>
          <nav className="mt-8 space-y-2">
            {['dashboard', 'posts', 'categories', 'media', 'settings'].map((item) => (
              <button key={item} onClick={() => setActiveView(item as typeof activeView)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm ${activeView === item ? 'bg-orange-500/20 text-orange-300' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                {item === 'dashboard' ? <BookOpen className="h-4 w-4" /> : item === 'posts' ? <FileText className="h-4 w-4" /> : item === 'categories' ? <Layers className="h-4 w-4" /> : item === 'media' ? <ImagePlus className="h-4 w-4" /> : <Settings2 className="h-4 w-4" />}
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
            <p className="font-semibold text-white">Signed in as</p>
            <p>{user.email}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-orange-400">{user.role}</p>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          {statusMessage ? <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm text-orange-200">{statusMessage}</div> : null}
          {activeView === 'dashboard' ? (
            <div className="grid gap-6">
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-orange-400">Publishing pipeline</p>
                <h1 className="mt-3 text-3xl font-semibold">Manage your blog without touching code</h1>
                <p className="mt-3 max-w-2xl text-sm text-zinc-400">Create posts, schedule publishing, upload media, update SEO metadata, and keep categories and tags organized from a single admin workspace.</p>
              </section>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { label: 'Total posts', value: stats.total },
                  { label: 'Published', value: stats.published },
                  { label: 'Drafts', value: stats.drafts },
                ].map((card) => (
                  <div key={card.label} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                    <p className="text-sm text-zinc-400">{card.label}</p>
                    <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                  </div>
                ))}
              </div>
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent articles</h2>
                  <button onClick={() => setActiveView('posts')} className="text-sm font-semibold text-orange-400">Open editor</button>
                </div>
                <div className="mt-6 space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <div>
                        <p className="font-semibold">{post.title || 'Untitled draft'}</p>
                        <p className="text-sm text-zinc-400">{post.status} • {post.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setForm(post); setIsEditing(true); setActiveView('posts'); }} className="rounded-xl border border-zinc-800 px-3 py-2 text-sm">Edit</button>
                        {post.status === 'published' ? <button onClick={() => void handleUnpublish(post)} className="rounded-xl bg-zinc-800 px-3 py-2 text-sm">Unpublish</button> : <button onClick={() => void handlePublish(post)} className="rounded-xl bg-orange-500 px-3 py-2 text-sm">Publish</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeView === 'posts' ? (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Post composer</h2>
                  <button onClick={() => { setForm(initialPost); setIsEditing(false); }} className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm">New</button>
                </div>
                <form onSubmit={handleCreateOrUpdate} className="mt-6 space-y-4">
                  <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value, slug: event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))} placeholder="Title" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="Slug" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <textarea value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} placeholder="Excerpt" className="min-h-24 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <div className="flex flex-wrap gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
                    {toolbarButtons.map((button) => (
                      <button key={button.action} type="button" onClick={() => applyFormat(button.action)} className="rounded-xl border border-zinc-800 px-3 py-2 text-sm">{button.label}</button>
                    ))}
                  </div>
                  <textarea id="post-content" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="Write your article here in Markdown" className="min-h-72 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm" />
                  <input value={form.featuredImage} onChange={(event) => setForm((current) => ({ ...current, featuredImage: event.target.value }))} placeholder="Featured image URL" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input type="file" onChange={handleUpload} className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="Category" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                    <input value={form.tags.join(', ')} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) }))} placeholder="Tags (comma separated)" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={form.seoTitle} onChange={(event) => setForm((current) => ({ ...current, seoTitle: event.target.value }))} placeholder="SEO title" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                    <input value={form.metaDescription} onChange={(event) => setForm((current) => ({ ...current, metaDescription: event.target.value }))} placeholder="Meta description" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={form.canonicalUrl} onChange={(event) => setForm((current) => ({ ...current, canonicalUrl: event.target.value }))} placeholder="Canonical URL" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                    <input value={form.author} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} placeholder="Author" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  </div>
                  <label className="flex items-center gap-3 text-sm text-zinc-400"><input type="checkbox" checked={form.featured || false} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} /> Feature this post</label>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold">{isEditing ? 'Update post' : 'Save draft'}</button>
                    <button type="button" onClick={() => void handlePublish(form)} className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 font-semibold">Publish now</button>
                  </div>
                </form>
              </section>
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">Existing posts</h2>
                <div className="mt-6 space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{post.title || 'Untitled'}</p>
                          <p className="text-sm text-zinc-400">{post.status} • {post.category}</p>
                        </div>
                        <button onClick={() => { setForm(post); setIsEditing(true); }} className="text-sm text-orange-400">Edit</button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.status === 'published' ? <button onClick={() => void handleUnpublish(post)} className="rounded-xl bg-zinc-800 px-3 py-2 text-sm">Unpublish</button> : <button onClick={() => void handlePublish(post)} className="rounded-xl bg-orange-500 px-3 py-2 text-sm">Publish</button>}
                        <button onClick={() => void handleDelete(post)} className="rounded-xl border border-zinc-800 px-3 py-2 text-sm"><Trash2 className="mr-1 inline h-4 w-4" /> Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeView === 'categories' ? (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">Create category</h2>
                <form onSubmit={handleCategorySave} className="mt-6 space-y-4">
                  <input id="categoryName" placeholder="Category name" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input id="categorySlug" placeholder="Slug" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <label className="flex items-center gap-3 text-sm text-zinc-400"><input id="categoryFeatured" type="checkbox" /> Featured category</label>
                  <button className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold">Create</button>
                </form>
              </section>
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">Categories</h2>
                <div className="mt-6 space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <div>
                        <p className="font-semibold">{category.name}</p>
                        <p className="text-sm text-zinc-400">/{category.slug}</p>
                      </div>
                      <button onClick={() => void handleCategoryDelete(category)} className="rounded-xl border border-zinc-800 px-3 py-2 text-sm">Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeView === 'media' ? (
            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-xl font-semibold">Media library</h2>
              <p className="mt-3 text-sm text-zinc-400">Upload images to keep your featured visuals and article assets in one place. Files are optimized and stored in the local uploads directory for development.</p>
              <input type="file" onChange={handleUpload} className="mt-6 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
              {uploading ? <p className="mt-3 text-sm text-orange-400">Optimizing image…</p> : null}
            </section>
          ) : null}

          {activeView === 'settings' ? (
            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">Site settings</h2>
                <form onSubmit={handleSettingsSave} className="mt-6 space-y-4">
                  <input value={settings.siteName} onChange={(event) => setSettings((current) => ({ ...current, siteName: event.target.value }))} placeholder="Site name" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input value={settings.tagline} onChange={(event) => setSettings((current) => ({ ...current, tagline: event.target.value }))} placeholder="Tagline" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input value={settings.defaultAuthor} onChange={(event) => setSettings((current) => ({ ...current, defaultAuthor: event.target.value }))} placeholder="Default author" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input value={settings.gaId || ''} onChange={(event) => setSettings((current) => ({ ...current, gaId: event.target.value }))} placeholder="Google Analytics ID" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input value={settings.clarityId || ''} onChange={(event) => setSettings((current) => ({ ...current, clarityId: event.target.value }))} placeholder="Microsoft Clarity ID" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <button className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold">Save settings</button>
                </form>
              </section>
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">Tags</h2>
                <form onSubmit={handleTagCreate} className="mt-6 space-y-4">
                  <input id="tagName" placeholder="Tag name" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <input id="tagSlug" placeholder="Slug" className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
                  <button className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold">Create tag</button>
                </form>
                <div className="mt-6 space-y-3">
                  {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <div>
                        <p className="font-semibold">#{tag.name}</p>
                        <p className="text-sm text-zinc-400">/{tag.slug}</p>
                      </div>
                      <button onClick={() => void handleTagDelete(tag)} className="rounded-xl border border-zinc-800 px-3 py-2 text-sm">Delete</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
