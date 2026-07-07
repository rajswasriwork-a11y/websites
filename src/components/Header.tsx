import React, { useState } from "react";
import { Search, Sun, Moon, Briefcase, BookOpen, User, FolderGit2, Sparkles, Mail, FileCheck, X } from "lucide-react";
import { articles, caseStudies, resources } from "../data";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onNavigateToItem: (type: "article" | "case" | "resource", slugOrId: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onNavigateToItem
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "about", label: "About", icon: User },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "portfolio", label: "Portfolio", icon: FolderGit2 },
    { id: "case-studies", label: "Case Studies", icon: Briefcase },
    { id: "resources", label: "Resources", icon: FileCheck },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  // Perform search across all datasets
  const searchResults = searchQuery.trim() === "" ? [] : [
    ...articles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(a => ({ type: "article" as const, id: a.slug, title: a.title, category: "Blog" })),
    ...caseStudies.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(c => ({ type: "case" as const, id: c.slug, title: c.title, category: "Case Study" })),
    ...resources.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(r => ({ type: "resource" as const, id: r.id, title: r.title, category: "Resource" }))
  ];

  const handleResultClick = (item: { type: "article" | "case" | "resource"; id: string }) => {
    onNavigateToItem(item.type, item.id);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100/40 bg-brand-bg/85 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/50 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => { setActiveTab("home"); }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20">
            <span className="font-sans text-xl font-bold tracking-tight">R</span>
          </div>
          <div>
            <h1 className="font-sans font-semibold tracking-tight text-brand-dark dark:text-zinc-100 leading-none">
              Rajswa Srivastava
            </h1>
            <span className="font-sans text-[10px] tracking-wide text-brand-primary font-medium block mt-1 uppercase">
              AI Brand Strategist
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1 overflow-x-auto max-w-[65%]">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg font-sans text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-highlight text-brand-primary dark:bg-zinc-800 dark:text-orange-400"
                    : "text-brand-muted hover:bg-orange-50/50 hover:text-brand-dark dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <IconComponent className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-brand-muted hover:bg-orange-50/50 hover:text-brand-dark transition-all dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            title="Search Site"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-brand-muted hover:bg-orange-50/50 hover:text-brand-dark transition-all dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 xl:hidden rounded-lg text-brand-muted hover:bg-orange-50/50 hover:text-brand-dark dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-orange-100/40 bg-brand-bg px-4 py-3 space-y-1 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 px-3 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-brand-highlight text-brand-primary dark:bg-zinc-850 dark:text-orange-400"
                    : "text-brand-muted hover:bg-orange-50/50 hover:text-brand-dark dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* FLOATING SEARCH DIALOG OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-zinc-950/40 p-4 pt-[15vh] backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-orange-50 px-4 py-3.5 dark:border-zinc-800">
              <div className="flex items-center space-x-2.5 text-brand-muted">
                <Search className="h-5 w-5 text-brand-primary" />
                <input
                  type="text"
                  placeholder="Search articles, case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent font-sans text-sm text-brand-dark placeholder-brand-muted focus:outline-none dark:text-zinc-100 w-64"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-brand-muted hover:bg-orange-50 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center font-sans text-xs text-brand-muted">
                  Type to search. Quick index search matches titles, content, and tags.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center font-sans text-xs text-brand-muted">
                  No matching results found for <span className="font-semibold text-brand-dark dark:text-zinc-200">"{searchQuery}"</span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-muted">
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleResultClick(result)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-sans text-sm hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all"
                    >
                      <span className="font-medium text-brand-dark dark:text-zinc-200 truncate pr-4">
                        {result.title}
                      </span>
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-brand-highlight px-2 py-0.5 rounded text-brand-primary dark:bg-zinc-700 dark:text-orange-400">
                        {result.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
