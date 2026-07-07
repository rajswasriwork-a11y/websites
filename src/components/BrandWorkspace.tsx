import React, { useState } from "react";
import { uxStrategyData, sitemapData, nextJsFolderStructure } from "../data";
import { Layout, Palette, Network, Layers, Copy, Check, Code, ShieldCheck, Cpu, Database } from "lucide-react";

export default function BrandWorkspace() {
  const [activeSpecSection, setActiveSpecSection] = useState("ux-strategy");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const specSections = [
    { id: "ux-strategy", label: "UX Strategy Board", icon: ShieldCheck },
    { id: "sitemap", label: "Sitemap & Routes", icon: Network },
    { id: "wireframe", label: "Interactive Wireframes", icon: Layout },
    { id: "design-system", label: "Design System Specs", icon: Palette },
    { id: "architecture", label: "Next.js Folder Layout", icon: Layers }
  ];

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Intro Header */}
      <div className="mb-8 border-b border-orange-100/40 pb-6 dark:border-zinc-800">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
          <Cpu className="h-4 w-4" />
          <span>Architectural Spec & Design HQ</span>
        </span>
        <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100 sm:text-4xl">
          Creative Director & Architectural Workspace
        </h2>
        <p className="mt-2 font-sans text-sm text-brand-muted dark:text-zinc-400 max-w-3xl leading-relaxed">
          The technical and visual blueprint powering Alex Sterling's digital headquarters. This interactive spec outlines the UX strategy, sitemap, wireframe designs, and Next.js scale architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1.5">
          {specSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSpecSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSpecSection(section.id)}
                className={`flex w-full items-center space-x-2.5 rounded-xl px-4 py-3 text-left font-sans text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-brand-muted hover:bg-[#FFF8F0] hover:text-brand-dark dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{section.label}</span>
              </button>
            );
          })}

          <div className="pt-6 border-t border-orange-50 mt-6 dark:border-zinc-800">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-300 mb-2">
              Future Scale Ideas
            </h4>
            <ul className="space-y-2 text-xs text-brand-muted dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                <span>**Programmatic SEO** page compilation mapped via Ahrefs keyword density metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                <span>**Multi-Tenant DB (Cloud SQL)** support to house enterprise lead workspaces securely.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                <span>**Custom RSS & sitemap.xml** feed generation modules compiled dynamically on build.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Workspace Display Area */}
        <div className="lg:col-span-9 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900">
          
          {/* Section: UX Strategy */}
          {activeSpecSection === "ux-strategy" && (
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-primary" />
                <span>Comprehensive UX Strategy Board</span>
              </h3>
              <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 leading-relaxed">
                Positioning is nothing without flawless presentation. The core pillars below translate Alex Sterling's AI marketing authority into digital design rules.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {uxStrategyData.map((strategy, idx) => (
                  <div key={idx} className="rounded-xl bg-[#FFF8F0]/30 border border-orange-100/40 p-4 dark:bg-zinc-950 dark:border-zinc-850">
                    <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wide">
                      Pillar 0{idx + 1}
                    </span>
                    <h4 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-200 mt-1 mb-2">
                      {strategy.pillar}
                    </h4>
                    <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mb-3 leading-relaxed">
                      {strategy.details}
                    </p>
                    <div className="border-t border-orange-50/50 pt-2.5 dark:border-zinc-800/40">
                      <span className="font-sans text-[10px] uppercase font-semibold text-brand-dark dark:text-zinc-300">
                        Visual Rule:
                      </span>
                      <p className="font-sans text-[11px] text-brand-primary dark:text-orange-400 mt-0.5 italic">
                        {strategy.implementation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Sitemap */}
          {activeSpecSection === "sitemap" && (
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                <Network className="h-5 w-5 text-brand-primary" />
                <span>Sitemap, Routes & Component Hierarchy</span>
              </h3>
              <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 leading-relaxed">
                AlexSterling.com routes mapped semantically with exact React structural bindings for fast indexing and high crawlers fidelity.
              </p>
              <div className="rounded-xl border border-orange-50 bg-[#FFF8F0]/20 p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300">
                  Root URL: <span className="font-bold text-brand-primary">{sitemapData.root}</span>
                </span>
                <div className="mt-4 space-y-3">
                  {sitemapData.pages.map((p, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-100/20 pb-2.5 last:border-0 dark:border-zinc-800/40">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                        <span className="font-sans text-sm font-semibold text-brand-dark dark:text-zinc-200">{p.path}</span>
                        <span className="font-sans text-xs text-brand-muted dark:text-zinc-400">({p.label})</span>
                      </div>
                      {p.subpages && (
                        <div className="flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                          {p.subpages.map((sub, sIdx) => (
                            <span key={sIdx} className="font-mono text-[10px] bg-brand-highlight text-brand-primary px-2 py-0.5 rounded dark:bg-zinc-800 dark:text-orange-400">
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section: Interactive Wireframes */}
          {activeSpecSection === "wireframe" && (
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                <Layout className="h-5 w-5 text-brand-primary" />
                <span>System Wireframe Blueprints</span>
              </h3>
              <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 leading-relaxed">
                Below are the physical wireframe diagrams showing layout proportions, margins, padding constraints, and interaction hotspots for desktop and mobile displays.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wireframe 1: Desktop Homepage */}
                <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3 dark:border-zinc-800">
                    <span className="font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-100">
                      [Wireframe] Desktop Home Base
                    </span>
                    <span className="text-[10px] bg-zinc-200 px-1.5 rounded dark:bg-zinc-800">
                      1280px Scale
                    </span>
                  </div>
                  <div className="border border-dashed border-zinc-300 p-2 text-center rounded dark:border-zinc-800">
                    +--------------------------------------------------------------+
                    | Header: LOGO [Left]        Nav Links [Center]      Search/Dark[Right]|
                    +--------------------------------------------------------------+
                    | HERO SPACE (Whitespace: 64px)                                |
                    |   [Label: 12px] Brand Authority Indicator                    |
                    |   [H1: 48px, Bold] Simplifying AI & Business Systems.        |
                    |   [Sub: 16px] Helping founders grow through automations.     |
                    |   [Buttons: Rounded-xl]  [Explore Insights] [Workspace]      |
                    +--------------------------------------------------------------+
                    | INTERACTIVE COMPONENT: Live AI Strategic Planner             |
                    |   +------------------------------------------------------+   |
                    |   | Business Info (Input)   | Live AI Plan Result (Output) |   |
                    |   +------------------------------------------------------+   |
                    +--------------------------------------------------------------+
                    | FEATURED GRID (Bento Layout, 3 Columns, Rounded Cards, Shadow)|
                    |   [Card 1: AI]       |   [Card 2: Marketing] |   [Card 3: Auto]  |
                    +--------------------------------------------------------------+
                    | NEWSLETTER BLOCK: Full Width Minimal Capsule (Check circle CTAs)|
                    +--------------------------------------------------------------+
                    | FOOTER: Legal [Left]            External social tags [Right] |
                    +--------------------------------------------------------------+
                  </div>
                </div>

                {/* Wireframe 2: Mobile Article Deep Reader */}
                <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3 dark:border-zinc-800">
                    <span className="font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-100">
                      [Wireframe] Mobile Deep Reader
                    </span>
                    <span className="text-[10px] bg-zinc-200 px-1.5 rounded dark:bg-zinc-800">
                      375px Scale
                    </span>
                  </div>
                  <div className="border border-dashed border-zinc-300 p-2 text-center rounded dark:border-zinc-800">
                    +-----------------------------------+
                    | [Logo]                    [Menu =] |
                    +-----------------------------------+
                    | READING PROGRESS (Height: 2px)    |
                    +-----------------------------------+
                    | BREADCRUMBS: Home &gt; Insights    |
                    +-----------------------------------+
                    | HEADER:                           |
                    |   [Category Capsule: 10px] AI     |
                    |   [H1: 28px] AI-First Engine      |
                    |   [Author Card: Avatar + 12px bio] |
                    +-----------------------------------+
                    | BODY CONTENT (Inter Font, 15px)   |
                    |   [Sub-header: 18px] The Paradox  |
                    |   Our modern channels require     |
                    |   unprecedented scale...          |
                    +-----------------------------------+
                    | FLOATING SHARE CONTROLS (Static)  |
                    +-----------------------------------+
                    | NEXT ARTICLES &amp; SIGNUP CAPSULE |
                    +-----------------------------------+
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Design System Specs */}
          {activeSpecSection === "design-system" && (
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                <Palette className="h-5 w-5 text-brand-primary" />
                <span>Typography & Design System Specs</span>
              </h3>
              <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 leading-relaxed">
                Color token definitions, typographic scale, and UI parameters used to establish Stripe/Linear-level premium visual aesthetics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Typographical Hierarchy */}
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2 dark:border-zinc-800">
                    Typography Pairing
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <span className="font-sans text-[11px] font-bold text-brand-primary uppercase tracking-wide">
                        Headings (Manrope)
                      </span>
                      <p className="font-sans text-xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
                        Designing Practical AI systems.
                      </p>
                      <span className="font-mono text-[10px] text-brand-muted">
                        Font-weight: 700/800, tracking-tight, Line-height: 1.15
                      </span>
                    </div>

                    <div>
                      <span className="font-sans text-[11px] font-bold text-brand-primary uppercase tracking-wide">
                        Body Text (Inter)
                      </span>
                      <p className="font-sans text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                        Helping founders and businesses grow through scalable cognitive automations and programmatic distribution.
                      </p>
                      <span className="font-mono text-[10px] text-brand-muted">
                        Font-weight: 400/500, leading-relaxed, Color: #1F2937 / #6B7280
                      </span>
                    </div>
                  </div>
                </div>

                {/* Color Palette Cards */}
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2 dark:border-zinc-800">
                    Hex Palette Mappings
                  </h4>
                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { label: "Background", hex: "#FFF8F0", text: "text-brand-dark", bg: "bg-[#FFF8F0] border border-orange-100" },
                      { label: "Cards", hex: "#FFFFFF", text: "text-brand-dark", bg: "bg-[#FFFFFF] border border-orange-50" },
                      { label: "Primary Accent", hex: "#C46A2D", text: "text-white", bg: "bg-[#C46A2D]" },
                      { label: "Secondary Accent", hex: "#E6A15A", text: "text-brand-dark", bg: "bg-[#E6A15A]" },
                      { label: "Highlight Tone", hex: "#FFE8CC", text: "text-brand-primary", bg: "bg-[#FFE8CC]" },
                      { label: "Dark Typography", hex: "#1F2937", text: "text-white", bg: "bg-[#1F2937]" }
                    ].map((col, idx) => (
                      <div key={idx} className={`rounded-xl p-3 flex flex-col justify-between h-20 ${col.bg}`}>
                        <span className={`font-sans text-xs font-semibold ${col.text}`}>{col.label}</span>
                        <span className={`font-mono text-[10px] ${col.text} opacity-90`}>{col.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Snippet for Reusable Component */}
              <div className="mt-6">
                <div className="flex items-center justify-between bg-zinc-950 text-zinc-100 rounded-t-xl px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-orange-400" />
                    <span className="font-mono text-xs font-semibold">PremiumButton.tsx</span>
                  </div>
                  <button
                    onClick={() => copyCode(reusableButtonCode, "reusable-btn")}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-xs flex items-center space-x-1"
                  >
                    {copiedText === "reusable-btn" ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="rounded-b-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                  {reusableButtonCode}
                </pre>
              </div>
            </div>
          )}

          {/* Section: Next.js Architecture */}
          {activeSpecSection === "architecture" && (
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-primary" />
                <span>Next.js App Router Scalability Path</span>
              </h3>
              <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 leading-relaxed">
                A professional Next.js 15+ App Router file mapping proposed for when you scale this React prototype into a production server-rendered corporate website.
              </p>

              <div className="relative">
                <div className="flex items-center justify-between bg-zinc-950 text-zinc-100 rounded-t-xl px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-orange-400" />
                    <span className="font-mono text-xs font-semibold">File Structure Tree Map</span>
                  </div>
                  <button
                    onClick={() => copyCode(nextJsFolderStructure, "next-struct")}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-xs flex items-center space-x-1"
                  >
                    {copiedText === "next-struct" ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Tree</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="rounded-b-xl bg-zinc-950 p-5 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[400px] leading-relaxed">
                  {nextJsFolderStructure}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const reusableButtonCode = `import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'highlight';
  showArrow?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  showArrow = true,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center space-x-1.5 px-5 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm border";
  
  const variants = {
    primary: "bg-[#C46A2D] border-[#C46A2D] text-white hover:bg-opacity-92 hover:shadow-md",
    secondary: "bg-[#FFFFFF] border-orange-100 text-[#1F2937] hover:bg-[#FFF8F0] hover:border-orange-200",
    highlight: "bg-[#FFE8CC] border-transparent text-[#C46A2D] hover:bg-[#FFF3E5]"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={\`\${baseStyle} \${variants[variant]} \${className}\`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && <ArrowUpRight className="h-3.5 w-3.5" />}
    </motion.button>
  );
};`;
