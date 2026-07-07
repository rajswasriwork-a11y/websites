import React from "react";
import { Briefcase, ArrowRight, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { CaseStudy } from "../types";
import { caseStudies } from "../data";

interface CaseStudiesListProps {
  onSelectCaseStudy: (cs: CaseStudy) => void;
}

export default function CaseStudiesList({ onSelectCaseStudy }: CaseStudiesListProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Intro Header */}
      <div className="border-b border-orange-100/40 pb-6 mb-8 dark:border-zinc-800">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
          <Briefcase className="h-4 w-4" />
          <span>Proven Transformations</span>
        </span>
        <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
          Case Studies & Growth Engineering
        </h2>
        <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Detailed deep-dives outlining actual business bottlenecks, engineered strategies, and specific quantitative metrics delivered to enterprise clients.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs) => (
          <div
            key={cs.id}
            onClick={() => onSelectCaseStudy(cs)}
            className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 dark:border-zinc-850 dark:bg-zinc-900 cursor-pointer flex flex-col h-full"
          >
            {/* Cover image with ratio */}
            <div className="relative aspect-video w-full overflow-hidden bg-orange-50/40">
              <img
                src={cs.coverImage}
                alt={cs.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center space-x-1 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:bg-zinc-900/95 dark:text-orange-400 border border-orange-100/10">
                  {cs.category}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <span className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                  Partner: {cs.client}
                </span>
                <h3 className="font-sans text-lg font-bold tracking-tight text-brand-dark dark:text-zinc-100 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors mt-1.5 mb-2.5 leading-snug">
                  {cs.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-muted dark:text-zinc-400 line-clamp-3">
                  {cs.summary}
                </p>
              </div>

              {/* Quick Metrics preview inside cards */}
              <div className="mt-6 pt-5 border-t border-orange-50/50 flex items-center justify-between dark:border-zinc-800/50">
                <div className="flex space-x-4">
                  {cs.results.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx}>
                      <span className="block font-sans text-xs text-brand-muted dark:text-zinc-500 font-medium">
                        {metric.label}
                      </span>
                      <span className="block font-sans text-base font-bold text-brand-primary dark:text-orange-400 leading-none mt-1">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                <span className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                  <span>View Breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
