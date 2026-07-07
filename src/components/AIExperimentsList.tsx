import React, { useState } from "react";
import { Beaker, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Zap, Target } from "lucide-react";
import { aiExperiments } from "../data";
import { AIExperiment } from "../types";

export default function AIExperimentsList() {
  const [selectedExp, setSelectedExp] = useState<AIExperiment | null>(null);

  if (selectedExp) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setSelectedExp(null)}
          className="mb-8 inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400 hover:underline cursor-pointer"
        >
          &larr; Back to Experiments Lab
        </button>

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100/40 pb-6 mb-8 dark:border-zinc-800">
            <div>
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:text-orange-400">
                <Beaker className="h-3.5 w-3.5" />
                <span>Active AI Lab</span>
              </span>
              <h2 className="mt-3 font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
                {selectedExp.title}
              </h2>
              <p className="text-xs text-brand-muted dark:text-zinc-400 mt-2">
                Experiment conducted on {selectedExp.date}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {selectedExp.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF3EA]/40 border border-orange-100/30 dark:bg-zinc-950/40 dark:border-zinc-800">
                <span className="block font-sans text-xs text-brand-muted dark:text-zinc-500 font-medium">{m.label}</span>
                <span className="block font-sans text-2xl font-extrabold text-brand-primary dark:text-orange-400 leading-none mt-2">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-8 font-sans text-sm text-brand-dark/90 dark:text-zinc-350 leading-relaxed">
            {/* Objective & Hypothesis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-orange-100 bg-[#FAF3EA]/20 dark:border-zinc-850 dark:bg-zinc-900/40">
              <div>
                <h3 className="font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-brand-primary" />
                  <span>Objective</span>
                </h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedExp.objective}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-brand-dark dark:text-zinc-100 flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-brand-primary" />
                  <span>Hypothesis</span>
                </h3>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedExp.hypothesis}
                </p>
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-3">Tools &amp; Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedExp.toolsUsed.map((t) => (
                  <span key={t} className="px-3 py-1 bg-orange-50/50 border border-orange-100 rounded-lg text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:border-zinc-800 dark:text-orange-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Method */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Methodology &amp; Architecture</h3>
              <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                {selectedExp.method}
              </p>
            </div>

            {/* Results */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Results &amp; Findings</h3>
              <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                {selectedExp.results}
              </p>
            </div>

            {/* What worked vs What failed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-green-100 bg-green-50/10 dark:border-green-950/20 dark:bg-green-950/5">
                <h3 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>What Worked</span>
                </h3>
                <p className="text-xs leading-relaxed text-green-800/80 dark:text-green-300">
                  {selectedExp.whatWorked}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5">
                <h3 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  <span>What Failed &amp; Bottlenecks</span>
                </h3>
                <p className="text-xs leading-relaxed text-red-800/80 dark:text-red-300">
                  {selectedExp.whatFailed}
                </p>
              </div>
            </div>

            {/* Future Improvements */}
            <div className="pt-6 border-t border-orange-100/40 dark:border-zinc-800/50">
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-2">Future Iterations</h3>
              <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                {selectedExp.futureImprovements}
              </p>
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
          <Beaker className="h-4 w-4" />
          <span>Active Experiments Lab</span>
        </span>
        <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
          AI &amp; Cognitive Research Lab
        </h2>
        <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-2xl">
          Where theoretical cognitive theory meets practical implementation. Real hypotheses, metrics, and technical failures exposed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aiExperiments.map((exp) => (
          <div
            key={exp.id}
            onClick={() => setSelectedExp(exp)}
            className="group overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-850 dark:bg-zinc-900 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/40 px-2.5 py-0.5 text-[10px] font-extrabold text-brand-primary uppercase tracking-wide dark:bg-zinc-800 dark:text-orange-400">
                  <Beaker className="h-3 w-3" />
                  <span>Lab Run</span>
                </span>
                <span className="text-[10px] text-brand-muted dark:text-zinc-500 font-medium">
                  {exp.date}
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-brand-dark dark:text-zinc-100 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors leading-snug">
                {exp.title}
              </h3>
              <p className="mt-2.5 font-sans text-xs leading-relaxed text-brand-muted dark:text-zinc-400 line-clamp-3">
                <strong>Hypothesis:</strong> {exp.hypothesis}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-orange-50/50 flex items-center justify-between dark:border-zinc-800/50">
              <div className="flex space-x-4">
                {exp.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx}>
                    <span className="block text-[10px] text-brand-muted dark:text-zinc-500 font-medium">{m.label}</span>
                    <span className="block text-sm font-extrabold text-brand-primary dark:text-orange-400 mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
              <span className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400">
                <span>View Lab Book</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
