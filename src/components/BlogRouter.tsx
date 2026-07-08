import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { fetchPost, fetchPosts, searchPosts } from '../lib/api';

interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  seoTitle?: string;
  metaDescription?: string;
}

export default function BlogRouter() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPostSummary | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const slugMatch = path.match(/^\/blog\/([^/]+)$/);
    if (slugMatch) {
      setSelectedSlug(slugMatch[1]);
      void loadPost(slugMatch[1]);
    } else {
      void loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data || []);
      setSelectedPost(null);
    } finally {
      setLoading(false);
    }
  };

  const loadPost = async (slug: string) => {
    setLoading(true);
    try {
      const data = await fetchPost(slug);
      setSelectedPost(data);
      document.title = `${data?.seoTitle || data?.title || 'Blog'} — Rajswa Blog`;
    } catch {
      setSelectedPost(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!query && !category && !tag) return posts;
    return posts.filter((post) => {
      const matchesQuery = !query || [post.title, post.excerpt, post.content].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || post.category === category;
      const matchesTag = !tag || post.tags.includes(tag);
      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [posts, query, category, tag]);

  const openPost = (slug: string) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setSelectedSlug(slug);
    void loadPost(slug);
  };

  const backToList = () => {
    window.history.pushState({}, '', '/blog');
    setSelectedSlug(null);
    setSelectedPost(null);
    void loadPosts();
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await searchPosts(query, category || undefined, tag || undefined);
      setPosts(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        setSelectedSlug(slug);
        void loadPost(slug);
      } else {
        setSelectedSlug(null);
        setSelectedPost(null);
        void loadPosts();
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (loading && !selectedPost && !posts.length) {
    return <div className="mx-auto max-w-6xl px-6 py-20 text-white">Loading blog content…</div>;
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <button onClick={backToList} className="mb-6 text-sm font-semibold text-orange-400">← Back to blog</button>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-400">{selectedPost.category}</p>
            <h1 className="text-4xl font-bold">{selectedPost.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {selectedPost.publishedAt}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {selectedPost.readingTime}</span>
            </div>
            {selectedPost.featuredImage ? <img src={selectedPost.featuredImage} alt={selectedPost.title} className="mt-8 h-80 w-full rounded-2xl object-cover" /> : null}
            <p className="mt-8 text-lg text-zinc-300">{selectedPost.excerpt}</p>
            <article className="prose prose-invert mt-8 max-w-none">
              <div className="whitespace-pre-wrap leading-8 text-zinc-300">{selectedPost.content}</div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Production blog</p>
          <h1 className="mt-3 text-3xl font-bold">Browse published articles</h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">This view is powered by the new admin-managed content pipeline with SEO-ready metadata, filtering, and search.</p>
          <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3">
              <Search className="mr-3 h-4 w-4 text-zinc-500" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts" className="w-full bg-transparent outline-none" />
            </div>
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
            <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3" />
            <button className="rounded-2xl bg-orange-500 px-4 py-3 font-semibold">Search</button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
              {post.featuredImage ? <img src={post.featuredImage} alt={post.title} className="h-44 w-full object-cover" /> : <div className="h-44 bg-gradient-to-br from-orange-500/20 to-zinc-800" />}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-orange-400">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-sm text-zinc-400">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tagName) => <span key={tagName} className="rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400">#{tagName}</span>)}
                </div>
                <button onClick={() => openPost(post.slug)} className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-400">
                  Read article <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
