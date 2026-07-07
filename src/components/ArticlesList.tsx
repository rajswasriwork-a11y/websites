import React, { useState } from "react";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";
import { Article } from "../types";
import { articles } from "../data";

interface ArticlesListProps {
  onSelectArticle: (article: Article) => void;
}

export default function ArticlesList({ onSelectArticle }: ArticlesListProps) {
  const [filter, setFilter] = useState<"ALL" | "AI" | "Marketing" | "SEO" | "Product Management" | "Business" | "Automation" | "Psychology" | "Technology">("ALL");

  const categories = ["ALL", "AI", "Marketing", "SEO", "Product Management", "Business", "Automation", "Psychology", "Technology"] as const;

  const filteredArticles = filter === "ALL" 
    ? articles 
    : articles.filter(art => art.category === filter);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Category Header */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            <BookOpen className="h-4 w-4" />
            <span>Personal Writings</span>
          </span>
          <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-white">
            Blog &amp; Learning Notes
          </h2>
          <p className="font-sans text-sm text-zinc-400 mt-1">
            Documenting deep dives, experiments, and systems guides across AI, Marketing, SEO, Product, Business, and Tech.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1.5 rounded-xl max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat === "ALL" ? "All Posts" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900">
          <p className="font-sans text-xs text-zinc-400">
            No articles published under this category yet. Stay tuned for upcoming notes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 rounded-lg bg-zinc-900/95 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-primary border border-zinc-800">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center space-x-4 font-sans text-xs text-zinc-400 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-orange-400/60" />
                    <span>{article.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-orange-400/60" />
                    <span>{article.readingTime}</span>
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold tracking-tight text-white line-clamp-2 group-hover:text-brand-primary transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2.5 font-sans text-xs leading-relaxed text-zinc-400 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tags and Action */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((t) => (
                      <span key={t} className="font-sans text-[10px] text-zinc-400 bg-zinc-850 px-1.5 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-xs font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
