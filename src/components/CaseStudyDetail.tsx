import React from "react";
import { ChevronLeft, CheckCircle2, Award, Hammer, Lightbulb, Target, AlertTriangle } from "lucide-react";
import { CaseStudy } from "../types";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
  onBack: () => void;
}

export default function CaseStudyDetail({ caseStudy, onBack }: CaseStudyDetailProps) {
  return (
    <article className="min-h-screen bg-brand-bg pb-20 transition-colors duration-300 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 font-sans text-xs text-brand-muted dark:text-zinc-400 mb-8 font-medium">
          <button onClick={onBack} className="hover:text-brand-primary">
            <span>Home Base</span>
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-brand-primary">
            <span>Case Studies</span>
          </button>
          <span>/</span>
          <span className="text-brand-dark dark:text-zinc-200 truncate max-w-[200px]">{caseStudy.client}</span>
        </nav>

        {/* Back Link Button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center space-x-1.5 font-sans text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-orange-400 mb-6 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to case studies</span>
        </button>

        {/* Header Block */}
        <div className="mb-8 border-b border-orange-100/30 pb-6 dark:border-zinc-800">
          <span className="inline-block rounded-lg bg-brand-highlight px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:bg-zinc-850 dark:text-orange-400 mb-3 border border-orange-100/10">
            {caseStudy.category}
          </span>
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100 sm:text-4xl">
            {caseStudy.title}
          </h1>
          <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-2 font-semibold">
            Partner organization: {caseStudy.client}
          </p>
        </div>

        {/* Cover Image */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-orange-50/40 border border-orange-100/10 shadow-sm mb-12">
          <img
            src={caseStudy.coverImage}
            alt={caseStudy.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Dense Grid Layout of Structural Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Case Deep-Dive - Left Columns */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* PROBLEM section */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/5 dark:text-amber-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-100">
                  The Problem
                </h3>
                <p className="font-sans text-sm text-brand-dark/90 dark:text-zinc-350 leading-relaxed mt-2">
                  {caseStudy.problem}
                </p>
              </div>
            </div>

            {/* GOAL section */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-100">
                  The Goal
                </h3>
                <p className="font-sans text-sm text-brand-dark/90 dark:text-zinc-350 leading-relaxed mt-2">
                  {caseStudy.goal}
                </p>
              </div>
            </div>

            {/* STRATEGY section */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-100">
                  The Strategy
                </h3>
                <p className="font-sans text-sm text-brand-dark/90 dark:text-zinc-350 leading-relaxed mt-2">
                  {caseStudy.strategy}
                </p>
              </div>
            </div>

            {/* IMPLEMENTATION section */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:bg-orange-500/5 dark:text-orange-400">
                <Hammer className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-100">
                  Implementation
                </h3>
                <div className="font-sans text-sm text-brand-dark/90 dark:text-zinc-350 leading-relaxed mt-2 space-y-3">
                  {caseStudy.implementation.split("\n").map((step, idx) => (
                    <p key={idx}>{step}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* LESSONS LEARNED section */}
            <div className="flex gap-4 border-t border-orange-100/30 pt-8 dark:border-zinc-850">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/5 dark:text-purple-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-brand-dark dark:text-zinc-100">
                  Lessons Learned
                </h3>
                <p className="font-sans text-sm text-brand-dark/90 dark:text-zinc-350 italic mt-2">
                  "{caseStudy.lessonsLearned}"
                </p>
              </div>
            </div>

          </div>

          {/* Results Block & Tools Sidebar - Right Columns */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* RESULTS metric box */}
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2.5 mb-4 dark:border-zinc-800">
                Proven Results
              </h3>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 gap-4 mb-5">
                {caseStudy.results.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-brand-highlight/35 p-3 rounded-xl dark:bg-zinc-850 border border-orange-100/10">
                    <span className="block font-sans text-[10px] uppercase font-bold text-brand-muted dark:text-zinc-400">
                      {metric.label}
                    </span>
                    <span className="block font-sans text-2xl font-extrabold text-brand-primary dark:text-orange-400 mt-1 leading-none">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-sans text-xs leading-relaxed text-brand-dark/95 dark:text-zinc-400">
                {caseStudy.results.description}
              </p>
            </div>

            {/* TOOLS USED box */}
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-200 border-b border-orange-50 pb-2.5 mb-4 dark:border-zinc-800">
                Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="font-sans text-xs font-semibold text-brand-primary bg-brand-highlight px-3 py-1.5 rounded-lg dark:text-orange-400 dark:bg-zinc-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}
