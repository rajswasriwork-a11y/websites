import React, { useState } from "react";
import { Mail, ArrowRight, Github, Linkedin, CheckCircle2, ArrowUpRight } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 850);
  };

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FAF3EA] border-t border-orange-100/50 py-16 transition-colors duration-300 dark:bg-zinc-950 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top: Newsletter Block */}
        <div id="footer-newsletter" className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center rounded-2xl bg-white border border-orange-100 p-8 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
              <Mail className="h-3.5 w-3.5" />
              <span>Newsletter Archive</span>
            </span>
            <h3 className="mt-2 font-sans text-xl font-bold tracking-tight text-brand-dark dark:text-zinc-100 sm:text-2xl">
              Practical guides on AI, Marketing, Business &amp; Product.
            </h3>
            <p className="mt-2 font-sans text-xs text-brand-muted dark:text-zinc-400">
              No fluff. No hype. Only authentic systems, frameworks and personal learning documentation.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center space-x-2.5 rounded-xl bg-orange-50/50 border border-brand-primary/20 p-4 text-brand-primary dark:bg-zinc-800/40 dark:border-orange-500/20 dark:text-orange-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="font-sans text-xs font-medium">
                  Welcome! Thank you for subscribing.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-orange-150 bg-[#FFF8F0]/30 px-4 py-3 font-sans text-xs text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center space-x-2 rounded-xl bg-brand-primary px-5 py-3 font-sans text-xs font-semibold text-white transition-all hover:bg-opacity-90 hover:shadow-md disabled:bg-opacity-60 cursor-pointer shrink-0"
                >
                  <span>{loading ? "Joining..." : "Subscribe"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: Links and description */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 mb-16">
          
          {/* Logo Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
                <span className="font-sans text-base font-bold">R</span>
              </div>
              <span className="font-sans font-bold tracking-tight text-brand-dark dark:text-zinc-100">Rajswa Srivastava</span>
            </div>
            <p className="font-sans text-xs text-brand-dark dark:text-zinc-300 italic mb-4 leading-relaxed font-medium">
              "I document real-world experiments, research, frameworks, and projects that explain complex ideas in AI, marketing, business, and tech."
            </p>
            <p className="font-sans text-[11px] text-brand-muted dark:text-zinc-400">
              Personal learning portfolio and knowledge database.
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-3 lg:col-start-8">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-dark dark:text-zinc-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "blog", label: "Blog" },
                { id: "portfolio", label: "Portfolio" },
                { id: "case-studies", label: "Case Studies" },
                { id: "resources", label: "Resources" },
                { id: "contact", label: "Contact" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="font-sans text-xs text-brand-muted hover:text-brand-primary dark:text-zinc-400 dark:hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="lg:col-span-2 lg:col-start-11">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-dark dark:text-zinc-200 mb-4">
              Direct Channels
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:rajswa.sriwork@gmail.com"
                  className="flex items-center space-x-1 font-sans text-xs text-brand-muted hover:text-brand-primary dark:text-zinc-400 dark:hover:text-orange-400"
                >
                  <span>Email</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/rajswa-srivastava-marketing/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 font-sans text-xs text-brand-muted hover:text-brand-primary dark:text-zinc-400 dark:hover:text-orange-400"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-orange-100/30 pt-8 dark:border-zinc-900">
          <p className="font-sans text-xs text-brand-muted dark:text-zinc-500">
            &copy; 2026 Rajswa Srivastava. All rights reserved. Built with minimalist, content-first design principles.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/rajswa-srivastava-marketing/" target="_blank" rel="noreferrer" className="text-brand-muted hover:text-brand-primary dark:text-zinc-500 dark:hover:text-orange-400 transition-colors">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
