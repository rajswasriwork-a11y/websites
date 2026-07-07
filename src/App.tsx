import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Beaker, Layers, Workflow, CheckCircle2, FileText, ArrowUpRight, ShieldAlert, Award, Command } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import CaseStudiesList from "./components/CaseStudiesList";
import CaseStudyDetail from "./components/CaseStudyDetail";
import PortfolioView from "./components/PortfolioView";
import ResourcesList from "./components/ResourcesList";
import ContactForm from "./components/ContactForm";
import { Article, CaseStudy } from "./types";
import { articles, caseStudies } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(true); // Default to premium dark mode!
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Maintain Dark Mode Class on Document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.title = "Rajswa Blog";
  }, [activeTab, selectedArticle, selectedCaseStudy]);

  // Global navigator function for search results or cross-link clicks
  const handleNavigateToItem = (
    type: "article" | "case" | "resource",
    slugOrId: string
  ) => {
    if (type === "article") {
      const art = articles.find((a) => a.slug === slugOrId);
      if (art) {
        setSelectedArticle(art);
        setActiveTab("blog");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (type === "case") {
      const cs = caseStudies.find((c) => c.slug === slugOrId);
      if (cs) {
        setSelectedCaseStudy(cs);
        setActiveTab("case-studies");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (type === "resource") {
      setActiveTab("resources");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCaseStudies = () => {
    setSelectedCaseStudy(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-[#FFFFFF] transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col justify-between selection:bg-orange-500/20 selection:text-brand-primary">
      
      {/* Top Header Component */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
          setSelectedCaseStudy(null);
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNavigateToItem={handleNavigateToItem}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* SHOW STANDARD PREMIUM PORTFOLIO APP */}
        <>
          {/* 1. HOME TAB */}
          {activeTab === "home" && (
            <div className="space-y-16 py-10">
              {/* HERO AREA with animated grid subtle orange glow */}
              <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-16 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] h-full w-full" />
                
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary border border-orange-500/20">
                  <Sparkles className="h-4 w-4" />
                  <span>Personal Learning Headquarters</span>
                </span>
                
                <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-[#FFFFFF] dark:text-zinc-100 sm:text-6xl max-w-4xl mx-auto leading-[1.1]">
                  Rajswa Srivastava
                </h1>
                
                <p className="mt-6 font-sans text-base sm:text-lg text-[#A1A1AA] dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
                  I document real experiments, research, code, and practical systems that simplify AI, marketing, business, and product strategy.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => { setActiveTab("blog"); setSelectedArticle(null); }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-brand-primary px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/10 hover:bg-opacity-90 transition-all cursor-pointer"
                  >
                    <span>Read My Blog</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { setActiveTab("portfolio"); }}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#181818] border border-[#2A2A2A] px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#FFFFFF] shadow-sm hover:bg-[#2A2A2A] transition-all cursor-pointer dark:bg-zinc-900"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-primary" />
                  </button>
                </div>
              </section>

              {/* BENTO DASHBOARD LABS SECTION */}
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div 
                    onClick={() => setActiveTab("case-studies")}
                    className="p-6 rounded-2xl border border-[#2A2A2A] bg-[#181818] hover:border-brand-primary/40 cursor-pointer transition-all flex flex-col justify-between h-48 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">01 / Transformations</span>
                        <Beaker className="h-4 w-4 text-brand-primary" />
                      </div>
                      <h3 className="text-base font-bold text-[#FFFFFF] mt-3 group-hover:text-brand-primary transition-colors">Case Studies</h3>
                      <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                        In-depth analyses of business growth problems, custom strategic approaches, and measurable outcomes.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-primary flex items-center gap-1 mt-4">
                      <span>View Studies</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div 
                    onClick={() => setActiveTab("blog")}
                    className="p-6 rounded-2xl border border-[#2A2A2A] bg-[#181818] hover:border-brand-primary/40 cursor-pointer transition-all flex flex-col justify-between h-48 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">02 / Documentation</span>
                        <Layers className="h-4 w-4 text-brand-primary" />
                      </div>
                      <h3 className="text-base font-bold text-[#FFFFFF] mt-3 group-hover:text-brand-primary transition-colors">Learning Notes</h3>
                      <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                        Practical articles and notes demystifying programming models, SEO, marketing systems, and psychology.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-primary flex items-center gap-1 mt-4">
                      <span>Read Notes</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>

                  {/* Card 3 */}
                  <div 
                    onClick={() => setActiveTab("resources")}
                    className="p-6 rounded-2xl border border-[#2A2A2A] bg-[#181818] hover:border-brand-primary/40 cursor-pointer transition-all flex flex-col justify-between h-48 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">03 / Assets Vault</span>
                        <Workflow className="h-4 w-4 text-brand-primary" />
                      </div>
                      <h3 className="text-base font-bold text-[#FFFFFF] mt-3 group-hover:text-brand-primary transition-colors">Resource Vault</h3>
                      <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                        Directly copyable prompt systems, automation templates, tactical checklists, and curated learning lists.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-primary flex items-center gap-1 mt-4">
                      <span>Access Assets</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </section>

              {/* FEATURED ARTICLES */}
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-[#2A2A2A] pb-4">
                  <div>
                    <h2 className="font-sans text-2xl font-extrabold tracking-tight text-[#FFFFFF] dark:text-zinc-100">
                      Recent Blog Posts
                    </h2>
                    <p className="font-sans text-xs text-[#A1A1AA] dark:text-zinc-400 mt-1 uppercase tracking-wide font-semibold">
                      Writing &amp; Research Highlights
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTab("blog"); setSelectedArticle(null); }}
                    className="font-sans text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 mt-2 md:mt-0 cursor-pointer"
                  >
                    <span>See all posts ({articles.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.slice(0, 3).map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleNavigateToItem("article", art.slug)}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#181818] p-5 shadow-sm hover:border-brand-primary/40 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="inline-block rounded-lg bg-orange-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-primary border border-orange-500/20">
                            {art.category}
                          </span>
                          <span className="font-sans text-[10px] text-[#A1A1AA]">
                            {art.readingTime}
                          </span>
                        </div>
                        <h3 className="font-sans text-base font-bold text-[#FFFFFF] group-hover:text-brand-primary transition-colors leading-snug">
                          {art.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-[#A1A1AA] line-clamp-3">
                          {art.excerpt}
                        </p>
                      </div>
                      <div className="mt-5 pt-3.5 border-t border-[#2A2A2A] flex items-center justify-between">
                        <span className="font-sans text-[10px] text-[#A1A1AA]">
                          {art.date}
                        </span>
                        <span className="inline-flex items-center text-xs font-bold text-brand-primary">
                          <span>Read Article</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CASE STUDIES TEASER */}
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-[#2A2A2A] pb-4">
                  <div>
                    <h2 className="font-sans text-2xl font-extrabold tracking-tight text-[#FFFFFF]">
                      Proven Transformations
                    </h2>
                    <p className="font-sans text-xs text-[#A1A1AA] mt-1 uppercase tracking-wide font-semibold">
                      Problem, Strategy, Implementation and Concrete Metrics
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTab("case-studies"); setSelectedCaseStudy(null); }}
                    className="font-sans text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 mt-2 md:mt-0 cursor-pointer"
                  >
                    <span>See all case studies ({caseStudies.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {caseStudies.slice(0, 2).map((cs) => (
                    <div
                      key={cs.id}
                      onClick={() => handleNavigateToItem("case", cs.slug)}
                      className="group overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#181818] p-6 shadow-sm hover:border-brand-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="font-sans text-[10px] font-extrabold text-brand-primary uppercase tracking-wide">
                            Partner: {cs.client}
                          </span>
                          <span className="inline-block rounded-lg bg-orange-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-primary border border-orange-500/20">
                            {cs.category}
                          </span>
                        </div>
                        <h3 className="font-sans text-lg font-bold text-[#FFFFFF] group-hover:text-brand-primary transition-colors leading-snug">
                          {cs.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-[#A1A1AA]">
                          {cs.summary}
                        </p>
                      </div>

                      {/* Metrics highlights */}
                      <div className="mt-6 pt-5 border-t border-[#2A2A2A] flex items-center justify-between">
                        <div className="flex space-x-4">
                          {cs.results.metrics.slice(0, 2).map((m, idx) => (
                            <div key={idx}>
                              <span className="block font-sans text-[10px] text-[#A1A1AA] font-medium">{m.label}</span>
                              <span className="block font-sans text-sm font-extrabold text-brand-primary leading-none mt-1">{m.value}</span>
                            </div>
                          ))}
                        </div>
                        <span className="inline-flex items-center text-xs font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                          <span>Deep Analysis</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 2. ABOUT TAB */}
          {activeTab === "about" && <AboutSection />}

          {/* 3. BLOG TAB */}
          {activeTab === "blog" && (
            selectedArticle ? (
              <ArticleDetail
                article={selectedArticle}
                onBack={handleBackToArticles}
                onSelectArticle={setSelectedArticle}
              />
            ) : (
              <ArticlesList onSelectArticle={setSelectedArticle} />
            )
          )}

          {/* 4. PORTFOLIO TAB */}
          {activeTab === "portfolio" && <PortfolioView />}

          {/* 5. CASE STUDIES TAB */}
          {activeTab === "case-studies" && (
            selectedCaseStudy ? (
              <CaseStudyDetail
                caseStudy={selectedCaseStudy}
                onBack={handleBackToCaseStudies}
              />
            ) : (
              <CaseStudiesList onSelectCaseStudy={setSelectedCaseStudy} />
            )
          )}

          {/* 6. RESOURCES TAB */}
          {activeTab === "resources" && <ResourcesList />}

          {/* 7. CONTACT TAB */}
          {activeTab === "contact" && <ContactForm darkMode={darkMode} />}
        </>
      </main>

      {/* Footer block */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
          setSelectedCaseStudy(null);
        }}
      />
    </div>
  );
}
