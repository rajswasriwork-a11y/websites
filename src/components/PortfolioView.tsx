import React, { useState } from "react";
import { FolderGit2, ArrowRight, Tag, Globe, Settings, Network, Calendar, HelpCircle, CheckCircle2 } from "lucide-react";
import { PortfolioItem } from "../types";
import { portfolioItems } from "../data";

export default function PortfolioView() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "AI Projects" | "Marketing Projects" | "SEO Projects" | "Automation" | "Analytics" | "Product Thinking" | "Business Strategy" | "Website Development">("ALL");

  const categories = [
    "ALL",
    "AI Projects",
    "Marketing Projects",
    "SEO Projects",
    "Automation",
    "Analytics",
    "Product Thinking",
    "Business Strategy",
    "Website Development"
  ] as const;

  const filteredItems = selectedCategory === "ALL"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  if (selectedItem) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setSelectedItem(null)}
          className="mb-8 inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400 hover:underline cursor-pointer"
        >
          &larr; Back to Portfolio Grid
        </button>

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
          {/* Header */}
          <div className="border-b border-orange-100/40 pb-6 mb-8 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:text-orange-400">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>{selectedItem.category}</span>
              </span>
              <h2 className="mt-3 font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
                {selectedItem.title}
              </h2>
              <p className="text-xs text-brand-muted dark:text-zinc-400 mt-2">
                Client / Partner: <strong className="text-brand-dark dark:text-zinc-200">{selectedItem.client}</strong>
              </p>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-orange-50/40 mb-8 border border-orange-100/10">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Deep Content */}
          <div className="space-y-8 font-sans text-sm text-brand-dark/95 dark:text-zinc-350 leading-relaxed">
            {/* Impact Highlights */}
            <div className="p-5 rounded-2xl bg-[#FAF3EA]/40 border border-orange-100/40 dark:bg-zinc-950/40 dark:border-zinc-800">
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Key Achievement &amp; Impact</span>
              </h3>
              <p className="text-sm font-semibold text-brand-primary dark:text-orange-400">
                {selectedItem.impact}
              </p>
            </div>

            {/* Overview & Problem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Project Overview</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.overview}
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">The Challenge / Problem</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.problem}
                </p>
              </div>
            </div>

            {/* Objective & Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-orange-100/20 dark:border-zinc-850">
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Strategic Objective</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.objective}
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">User Research &amp; Market Insights</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.research}
                </p>
              </div>
            </div>

            {/* Strategy & Process */}
            <div className="pt-6 border-t border-orange-100/20 dark:border-zinc-850">
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Growth Strategy</h3>
              <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400 mb-6">
                {selectedItem.strategy}
              </p>

              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Execution Process</h3>
              <div className="bg-zinc-50 border border-zinc-200/40 p-4 rounded-xl font-mono text-xs text-brand-dark dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-400 whitespace-pre-line">
                {selectedItem.process}
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-3">Tools &amp; Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tools.map((t) => (
                  <span key={t} className="px-3 py-1 bg-orange-50/50 border border-orange-100 rounded-lg text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:border-zinc-800 dark:text-orange-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Results & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-orange-100/20 dark:border-zinc-850">
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Quantitative Results</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.results}
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Key Strategic Learnings</h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedItem.keyLearnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Intro */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-orange-100/40 pb-6 mb-8 gap-4 dark:border-zinc-800">
        <div>
          <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
            <FolderGit2 className="h-4 w-4" />
            <span>Showcase of systems</span>
          </span>
          <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
            Portfolio
          </h2>
          <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-xl">
            Filter and explore actual dynamic systems, marketing pipelines, and custom SEO tools designed to fuel organic inbound growth.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 bg-[#FAF3EA] p-1.5 rounded-xl justify-center max-w-full overflow-x-auto dark:bg-zinc-950/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-dark dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {cat === "ALL" ? "All projects" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-orange-100 bg-white dark:border-zinc-850 dark:bg-zinc-900">
          <Globe className="h-10 w-10 text-brand-primary/20 mx-auto mb-3" />
          <h4 className="font-sans text-sm font-semibold text-brand-dark dark:text-zinc-200">
            No active project templates found
          </h4>
          <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mt-1">
            Stay tuned! More specific custom frameworks are uploaded weekly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 dark:border-zinc-850 dark:bg-zinc-900 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-orange-50/40 mb-4 border border-orange-100/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="inline-flex items-center space-x-1 rounded-lg bg-white/95 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-primary dark:bg-zinc-900/95 dark:text-orange-400 border border-orange-150/10 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-wide">
                  Partner: {item.client}
                </span>

                <h3 className="font-sans text-base font-bold tracking-tight text-brand-dark dark:text-zinc-100 mt-1 mb-2 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-xs leading-relaxed text-brand-muted dark:text-zinc-400 mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Bottom detail row */}
              <div className="pt-4 border-t border-orange-50/50 dark:border-zinc-800/50 mt-4 flex-1 flex flex-col justify-end">
                <span className="block font-sans text-[10px] uppercase font-bold text-brand-dark dark:text-zinc-300">
                  Business Impact:
                </span>
                <p className="font-sans text-xs text-brand-primary dark:text-orange-400 font-semibold italic mt-0.5 leading-snug">
                  {item.impact}
                </p>

                {/* Micro tech pills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="font-sans text-[9px] font-medium text-brand-muted bg-orange-50/30 border border-orange-100/10 px-2 py-0.5 rounded-md dark:text-zinc-400 dark:bg-zinc-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
