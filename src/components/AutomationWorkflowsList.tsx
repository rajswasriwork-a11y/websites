import React, { useState } from "react";
import { Workflow, ArrowRight, Clock, HelpCircle, Terminal, Copy, Check, ShieldCheck } from "lucide-react";
import { automationWorkflows } from "../data";
import { AutomationWorkflow } from "../types";

export default function AutomationWorkflowsList() {
  const [selectedWf, setSelectedWf] = useState<AutomationWorkflow | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (selectedWf) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => setSelectedWf(null)}
          className="mb-8 inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400 hover:underline cursor-pointer"
        >
          &larr; Back to Workflows Database
        </button>

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
          <div className="border-b border-orange-100/40 pb-6 mb-8 dark:border-zinc-800">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/50 px-3 py-1 text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:text-orange-400">
              <Workflow className="h-3.5 w-3.5" />
              <span>Verified Automation Engine</span>
            </span>
            <h2 className="mt-3 font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
              {selectedWf.title}
            </h2>
            <p className="text-xs text-brand-muted dark:text-zinc-400 mt-2">
              Saves approximately <strong className="text-brand-primary dark:text-orange-400">{selectedWf.estimatedTimeSaved}</strong>
            </p>
          </div>

          {/* Workflow Diagram */}
          <div className="mb-10">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-brand-primary dark:text-orange-400 mb-6">
              Workflow Node Sequence Map
            </h3>
            <div className="relative flex flex-col space-y-6 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-orange-100 dark:before:bg-zinc-800">
              {selectedWf.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Step bubble */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 border border-orange-200 text-brand-primary font-bold text-xs dark:bg-zinc-800 dark:border-zinc-700 dark:text-orange-400 z-10">
                    {idx + 1}
                  </div>
                  <div className="p-4 rounded-xl border border-orange-100/40 bg-[#FAF3EA]/10 dark:border-zinc-850 dark:bg-zinc-900/60 flex-1 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-sans text-xs font-bold text-brand-dark dark:text-zinc-100">
                        {step.title}
                      </h4>
                      <p className="font-sans text-[11px] text-brand-muted dark:text-zinc-400 mt-1">
                        {step.action}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-highlight/40 text-brand-primary dark:bg-zinc-800 dark:text-orange-400 shrink-0">
                      {step.tool}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 font-sans text-sm text-brand-dark/95 dark:text-zinc-300 leading-relaxed">
            
            {/* Logic & Business case */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#FAF3EA]/30 border border-orange-100/30 dark:bg-zinc-950/20 dark:border-zinc-850">
                <h4 className="font-bold text-brand-dark dark:text-zinc-100 mb-2">Business Case</h4>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedWf.businessUseCase}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF3EA]/30 border border-orange-100/30 dark:bg-zinc-950/20 dark:border-zinc-850">
                <h4 className="font-bold text-brand-dark dark:text-zinc-100 mb-2">Automation Routing Logic</h4>
                <p className="text-xs leading-relaxed text-brand-muted dark:text-zinc-400">
                  {selectedWf.automationLogic}
                </p>
              </div>
            </div>

            {/* Prompt Vault */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-brand-primary" />
                <span>Embedded System Prompts</span>
              </h3>
              <div className="space-y-4">
                {selectedWf.prompts.map((p, pIdx) => (
                  <div key={pIdx} className="relative rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 font-mono text-[11px] leading-relaxed text-brand-dark dark:text-zinc-300">
                    <button
                      onClick={() => handleCopyPrompt(p, pIdx)}
                      className="absolute right-3 top-3 p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-all dark:border-zinc-800 dark:bg-zinc-900 text-zinc-500 cursor-pointer"
                      title="Copy Prompt"
                    >
                      {copiedIndex === pIdx ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <div className="pr-10 whitespace-pre-wrap">{p}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Integrations */}
            <div>
              <h3 className="font-extrabold text-brand-dark dark:text-zinc-100 mb-3">Orchestrated Integrations</h3>
              <div className="flex flex-wrap gap-2">
                {selectedWf.tools.map((t) => (
                  <span key={t} className="px-3 py-1 bg-orange-50/50 border border-orange-100 rounded-lg text-xs font-semibold text-brand-primary dark:bg-zinc-850 dark:border-zinc-800 dark:text-orange-400">
                    {t}
                  </span>
                ))}
              </div>
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
          <Workflow className="h-4 w-4" />
          <span>Operational Systems</span>
        </span>
        <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
          Automation Workflows
        </h2>
        <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-2xl">
          Complete, end-to-end integration pathways connecting webhooks, data mappers, scraping nodes, and LLM classifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {automationWorkflows.map((wf) => (
          <div
            key={wf.id}
            onClick={() => setSelectedWf(wf)}
            className="group overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-850 dark:bg-zinc-900 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-100/40 px-2.5 py-0.5 text-[10px] font-extrabold text-brand-primary uppercase tracking-wide dark:bg-zinc-800 dark:text-orange-400">
                  <Workflow className="h-3 w-3" />
                  <span>Integration Map</span>
                </span>
                <span className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Saves {wf.estimatedTimeSaved}</span>
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-brand-dark dark:text-zinc-100 group-hover:text-brand-primary dark:group-hover:text-orange-400 transition-colors leading-snug">
                {wf.title}
              </h3>
              <p className="mt-2.5 font-sans text-xs leading-relaxed text-brand-muted dark:text-zinc-400 line-clamp-3">
                {wf.businessUseCase}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-orange-50/50 flex items-center justify-between dark:border-zinc-800/50">
              <div className="flex gap-1.5">
                {wf.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="text-[9px] font-semibold text-brand-muted bg-zinc-50 px-2 py-0.5 rounded dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40">
                    {tool}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center text-xs font-bold text-brand-primary dark:text-orange-400">
                <span>View Nodes</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
