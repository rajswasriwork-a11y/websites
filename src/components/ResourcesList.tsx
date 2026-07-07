import React, { useState } from "react";
import { FileCheck, Download, Copy, Check, Eye, HelpCircle, FileText, CheckSquare, Zap, Terminal, List } from "lucide-react";
import { Resource } from "../types";
import { resources } from "../data";

export default function ResourcesList() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "Templates" | "Checklists" | "Prompt Collections" | "Reading Lists">("ALL");
  const [inspectedResource, setInspectedResource] = useState<Resource | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ["ALL", "Templates", "Checklists", "Prompt Collections", "Reading Lists"] as const;

  const filteredResources = activeCategory === "ALL"
    ? resources
    : resources.filter(res => res.category === activeCategory);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "prompt":
        return <Terminal className="h-5 w-5 text-amber-500" />;
      case "template":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "checklist":
        return <CheckSquare className="h-5 w-5 text-emerald-500" />;
      case "list":
        return <List className="h-5 w-5 text-purple-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-brand-primary" />;
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            <FileCheck className="h-4 w-4" />
            <span>Learning Resources</span>
          </span>
          <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-white">
            Resource Vault
          </h2>
          <p className="font-sans text-sm text-zinc-400 mt-1 max-w-lg">
            Directly copyable prompt structures, automation blueprints, audit checklists, and curated books/guides.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-xl justify-center max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setInspectedResource(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat === "ALL" ? "All Assets" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Resources Grid List */}
        <div className={inspectedResource ? "lg:col-span-6 space-y-4" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}>
          {filteredResources.map((res) => (
            <div
              key={res.id}
              onClick={() => setInspectedResource(res)}
              className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-zinc-900 cursor-pointer ${
                inspectedResource?.id === res.id
                  ? "border-brand-primary ring-1 ring-brand-primary/20"
                  : "border-zinc-850 hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950">
                  {getIcon(res.type)}
                </div>
                <span className="font-sans text-[10px] font-bold text-zinc-500">
                  {res.downloadCount}+ used
                </span>
              </div>

              <span className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-wide">
                {res.category}
              </span>

              <h3 className="font-sans text-sm font-bold tracking-tight text-white mt-1 mb-2">
                {res.title}
              </h3>

              <p className="font-sans text-xs leading-relaxed text-zinc-400 mb-4 line-clamp-2">
                {res.description}
              </p>

              <div className="pt-3.5 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-sans text-[10px] font-semibold text-zinc-400 capitalize">
                  Type: {res.type}
                </span>
                <span className="inline-flex items-center text-xs font-bold text-brand-primary">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  <span>Inspect Spec</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Resources Inline Inspector Drawer */}
        {inspectedResource && (
          <div className="lg:col-span-6 rounded-2xl border border-zinc-850 bg-zinc-900 p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div>
                <span className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-wide">
                  {inspectedResource.category}
                </span>
                <h3 className="font-sans text-base font-extrabold text-white">
                  {inspectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectedResource(null)}
                className="px-2.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-sans text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                Close View
              </button>
            </div>

            <p className="font-sans text-xs leading-relaxed text-zinc-400 mb-6">
              {inspectedResource.description}
            </p>

            {/* Content copy box */}
            <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-inner">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => handleCopy(inspectedResource.content)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 text-brand-primary hover:bg-zinc-750 hover:shadow-sm transition-all text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-green-500 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Content</span>
                    </>
                  )}
                </button>
              </div>

              {/* Monospace display scroll view */}
              <pre className="font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap max-h-[250px] leading-relaxed pr-2 pt-8">
                {inspectedResource.content}
              </pre>
            </div>

            <div className="mt-5 text-[11px] font-medium text-zinc-400 flex items-center space-x-1">
              <HelpCircle className="h-3.5 w-3.5 text-brand-primary" />
              <span>Feel free to copy and adapt this asset inside your local systems.</span>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
