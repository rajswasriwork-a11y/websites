import React, { useState } from "react";
import { Layers, ArrowRight, CheckCircle2, AlertOctagon, Sparkles, Download, HelpCircle } from "lucide-react";
import { marketingFrameworks } from "../data";
import { MarketingFramework } from "../types";

export default function MarketingFrameworksList() {
  const [selectedFw, setSelectedFw] = useState<MarketingFramework | null>(null);

  if (selectedFw) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setSelectedFw(null)}
          className="mb-8 inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400 hover:underline cursor-pointer"
        >
          &larr; Back to Systems Frameworks
        </button>

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
          <div className="border-b border-orange-100/40 pb-6 mb-8 dark:border-zinc-800">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:text-orange-400">
              <Layers className="h-3.5 w-3.5" />
              <span>GTM Framework Blueprint</span>
            </span>
            <h2 className="mt-3 font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
              {selectedFw.title}
            </h2>
            <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-2 italic leading-relaxed">
              {selectedFw.definition}
            </p>
          </div>

          {/* Dynamic Interactive Diagram */}
          <div className="mb-10">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-brand-primary dark:text-orange-400 mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Workflow Diagram</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
              {selectedFw.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col justify-between p-4 rounded-xl border border-orange-100 bg-orange-50/10 dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div>
                    <span className="text-xl font-extrabold text-brand-primary/20 dark:text-orange-500/10 block mb-1">
                      0{idx + 1}
                    </span>
                    <h4 className="font-sans text-xs font-bold text-brand-dark dark:text-zinc-100 leading-snug">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[11px] text-brand-muted dark:text-zinc-400 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {idx < selectedFw.steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-brand-primary/40">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deep Content */}
          <div className="space-y-8 font-sans text-sm text-brand-dark/95 dark:text-zinc-300 leading-relaxed">
            
            {/* When to use */}
            <div className="p-5 rounded-2xl bg-[#FAF3EA]/40 border border-orange-100/40 dark:bg-zinc-950/40 dark:border-zinc-800">
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 flex items-center gap-2 mb-2">
                <HelpCircle className="h-4 w-4 text-brand-primary" />
                <span>When to Deploy This System</span>
              </h3>
              <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                {selectedFw.whenToUse}
              </p>
            </div>

            {/* Business vs Product Real Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-orange-100/40 bg-white dark:border-zinc-850 dark:bg-zinc-900">
                <h4 className="font-bold text-brand-dark dark:text-zinc-100 mb-2">Business Operations Case</h4>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedFw.businessExample}
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-orange-100/40 bg-white dark:border-zinc-850 dark:bg-zinc-900">
                <h4 className="font-bold text-brand-dark dark:text-zinc-100 mb-2">Product Integration Case</h4>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedFw.productExample}
                </p>
              </div>
            </div>

            {/* Mistakes */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-3 flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-red-500" />
                <span>Common Strategic Pitfalls</span>
              </h3>
              <ul className="space-y-2">
                {selectedFw.mistakes.map((m, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-brand-muted dark:text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-8 border-t border-orange-100/40 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-brand-dark dark:text-zinc-100">Ready to execute?</h4>
                <p className="text-xs text-brand-muted dark:text-zinc-400 mt-0.5">
                  Download our high-resolution strategic vector planner.
                </p>
              </div>
              <button
                onClick={() => alert("Strategic GTM Blueprint download initiated.")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-brand-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download GTM PDF Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-orange-100/40 pb-6 mb-10 dark:border-zinc-800">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
          <Layers className="h-4 w-4" />
          <span>Marketing Frameworks</span>
        </span>
        <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
          Strategic GTM Playbooks
        </h2>
        <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-2xl">
          Actionable business architectures designed to align product value props directly with real buyer demands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {marketingFrameworks.map((fw) => (
          <div
            key={fw.id}
            onClick={() => setSelectedFw(fw)}
            className="group overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-850 dark:bg-zinc-900 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                {fw.steps.length}-Stage System
              </span>
              <h3 className="font-sans text-lg font-bold text-brand-dark dark:text-zinc-100 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors leading-snug mt-1.5">
                {fw.title}
              </h3>
              <p className="mt-2.5 font-sans text-xs leading-relaxed text-brand-muted dark:text-zinc-400 line-clamp-3">
                {fw.definition}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-orange-50/50 flex items-center justify-between dark:border-zinc-800/50">
              <span className="text-[10px] text-brand-muted dark:text-zinc-500 font-bold uppercase tracking-wide">
                Interactive Model Ready
              </span>
              <span className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400">
                <span>See Framework</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
