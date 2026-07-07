import React, { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link2, Check, ArrowRight } from "lucide-react";
import { Article } from "../types";
import { articles } from "../data";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
}

export default function ArticleDetail({ article, onBack, onSelectArticle }: ArticleDetailProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Real scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find 2 related articles in the same category or overall
  const relatedArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-brand-bg transition-colors duration-300 dark:bg-zinc-950 pb-20">
      
      {/* Dynamic top progress bar */}
      <div className="fixed top-16 left-0 z-50 h-1 bg-brand-primary transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 font-sans text-xs text-brand-muted dark:text-zinc-400 mb-8 font-medium">
          <button onClick={onBack} className="hover:text-brand-primary flex items-center gap-1">
            <span>Home Base</span>
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-brand-primary">
            <span>Insights Hub</span>
          </button>
          <span>/</span>
          <span className="text-brand-dark dark:text-zinc-200 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Back Link Button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center space-x-1.5 font-sans text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-orange-400 mb-6 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to list</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main content body - Left Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Post Header Meta */}
            <div>
              <span className="inline-block rounded-lg bg-brand-highlight px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:bg-zinc-800 dark:text-orange-400 mb-3 border border-orange-100/10">
                {article.category}
              </span>
              <h1 className="font-sans text-2xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100 sm:text-4xl leading-tight">
                {article.title}
              </h1>

              {/* Author & Timestamp bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-y border-orange-100/40 py-4 mt-6 gap-4 dark:border-zinc-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-orange-100/10"
                  />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-brand-dark dark:text-zinc-200 leading-none">
                      {article.author.name}
                    </h4>
                    <span className="font-sans text-[10px] text-brand-muted dark:text-zinc-400 mt-1 block">
                      {article.author.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 font-sans text-xs text-brand-muted dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readingTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-orange-50/40 border border-orange-100/10 shadow-sm">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Structured HTML Render */}
            <div className="prose prose-orange dark:prose-invert max-w-none font-sans text-sm text-brand-dark/95 dark:text-zinc-300 leading-relaxed space-y-6">
              
              {/* Manual parsing of body to support bold headings beautifully */}
              {article.content.split("\n\n").map((para, pIdx) => {
                if (para.trim() === "") return null;
                
                if (para.startsWith("## ")) {
                  const headingText = para.replace("## ", "").trim();
                  const targetId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h2 key={pIdx} id={targetId} className="font-sans text-xl font-bold tracking-tight text-brand-dark dark:text-zinc-100 pt-4 mt-6">
                      {headingText}
                    </h2>
                  );
                }

                if (para.startsWith("* ") || para.startsWith("- ")) {
                  return (
                    <ul key={pIdx} className="space-y-1.5 py-1.5">
                      {para.split("\n").map((line, lIdx) => {
                        const cleanLine = line.replace(/^[\s*-]+/, "").trim();
                        return (
                          <li key={lIdx} className="list-disc ml-5 font-sans text-sm text-brand-dark/90 dark:text-zinc-300">
                            {cleanLine}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return (
                  <p key={pIdx} className="leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Bottom Section: Share Bar */}
            <div className="flex items-center justify-between border-t border-orange-100/40 pt-6 dark:border-zinc-800">
              <div className="flex items-center space-x-2">
                <Share2 className="h-4 w-4 text-brand-muted" />
                <span className="font-sans text-xs font-semibold text-brand-muted">Share:</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-orange-50 text-brand-muted hover:text-[#1DA1F2] dark:hover:bg-zinc-900 transition-colors">
                  <Twitter className="h-4.5 w-4.5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-orange-50 text-brand-muted hover:text-[#0A66C2] dark:hover:bg-zinc-900 transition-colors">
                  <Linkedin className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={handleShareCopy}
                  className="p-2 rounded-lg hover:bg-orange-50 text-brand-muted hover:text-brand-primary dark:hover:bg-zinc-900 transition-colors relative"
                  title="Copy Link"
                >
                  {copied ? <Check className="h-4.5 w-4.5 text-green-500" /> : <Link2 className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

          </div>

          {/* Table of Contents & Side Meta - Right Column */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Table of Contents Box */}
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2.5 mb-3.5 dark:border-zinc-800">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {article.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="block font-sans text-xs text-brand-muted hover:text-brand-primary dark:text-zinc-400 dark:hover:text-orange-400 transition-colors hover:translate-x-0.5 transform font-medium"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>

            {/* Related Insights */}
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2.5 mb-3.5 dark:border-zinc-800">
                Related Insights
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group cursor-pointer block border-b border-orange-50/50 pb-3 last:border-0 last:pb-0 dark:border-zinc-800/50"
                  >
                    <span className="block font-sans text-[10px] font-bold text-brand-primary uppercase tracking-wide">
                      {rel.category}
                    </span>
                    <h4 className="font-sans text-xs font-bold text-brand-dark dark:text-zinc-200 mt-1 line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </article>
  );
}
