import React, { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Terminal, Play, Bot, Workflow, Layers, AlertCircle } from "lucide-react";

interface InteractivePlannerProps {
  darkMode: boolean;
}

export default function InteractivePlanner({ darkMode }: InteractivePlannerProps) {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [bottleneck, setBottleneck] = useState("lead-gen");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [planOutput, setPlanOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const bottlenecks = [
    { id: "lead-gen", label: "Inbound Lead Generation", description: "Attracting high-intent buyers without massive ad spend" },
    { id: "operations", label: "Manual Operations & Research", description: "Sales or operations teams wasting hours doing repetitive database lookups" },
    { id: "onboarding", label: "User Onboarding Friction", description: "Trial users dropping off before realizing the product value" }
  ];

  const presets = [
    {
      name: "SaaS Platform",
      desc: "A developer analytics tool that monitors server latencies and costs in real time.",
      aud: "VP of Engineering, Devops leads, CTOs of mid-market startups.",
      bot: "lead-gen"
    },
    {
      name: "E-Commerce Brand",
      desc: "An organic lifestyle brand selling ergonomic home-office chairs.",
      aud: "Remote professionals, remote-first founders, and corporate benefit managers.",
      bot: "onboarding"
    },
    {
      name: "Professional Agency",
      desc: "A global visual design firm specializing in rebrands for mature B2B companies.",
      aud: "CMOs, Head of Brand, and private equity operation partners.",
      bot: "operations"
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setBusinessName(preset.name);
    setDescription(preset.desc);
    setAudience(preset.aud);
    setBottleneck(preset.bot);
    setErrorMsg(null);
  };

  const generateStrategy = async () => {
    if (!description.trim()) {
      setErrorMsg("Please provide a business description first.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setPlanOutput(null);

    // Stagger status messages for human-centered design feel
    const statuses = [
      "Analyzing target audience persona signals...",
      "Configuring specialized AI curator & stylist models...",
      "Mapping automation workflow triggers & integrations...",
      "Formulating bespoke prompt strategies..."
    ];

    let currentStatusIdx = 0;
    setStatusMessage(statuses[0]);
    const interval = setInterval(() => {
      currentStatusIdx++;
      if (currentStatusIdx < statuses.length) {
        setStatusMessage(statuses[currentStatusIdx]);
      }
    }, 1500);

    try {
      const promptText = `
Generate a custom "AI & Product Growth System" plan for a business with the following profile:
Business Name: ${businessName || "Unnamed Venture"}
Business Description: ${description}
Target Audience: ${audience || "General target market"}
Core Bottleneck to Solve: ${bottlenecks.find(b => b.id === bottleneck)?.label || bottleneck}

Please return the response as a highly detailed, comprehensive strategy structured exactly with these four key sections. Do not add conversational fluff in the beginning:

# AI Growth Blueprint: ${businessName || "Your Venture"}

## Phase 1: Core Multi-Agent Marketing Engine
Design a 3-agent pipeline (Curator, Stylist, Channel Architect) customized to capture this brand's authentic voice and reach their target market. Detail the exact styling guidelines, specific exclusions, and pacing rules required to attract their exact audience.

## Phase 2: Autonomous Operations Blueprint
Propose a practical background automation workflow (using Make.com or n8n) that integrates their systems to solve their specific bottleneck (${bottlenecks.find(b => b.id === bottleneck)?.label}). Detail each step: Trigger, Enrichment, AI Parsing, and Output channel.

## Phase 3: High-Performing System Prompt (Copyable)
Write a fully complete, copy-pasteable Advanced System Prompt that the user can use immediately in ChatGPT, Claude, or Gemini to execute this exact workflow. It must include: Role, Context, Constraints, Inputs, and expected JSON output schema.
`;

      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: "You are Alex Sterling, an elite AI Marketing Consultant, Creative Director, and Frontend Architect. Write in a highly specific, warm, analytical, and professional tone. Avoid marketing buzzwords like 'revolutionize' or 'game-changer'. Provide highly actionable, technical blueprints."
        })
      });

      const data = await response.json();
      clearInterval(interval);

      if (response.ok && data.text) {
        setPlanOutput(data.text);
      } else {
        throw new Error(data.error || "Failed to generate strategy blueprint.");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMsg(err.message || "Could not connect to the AI Strategy Planner. Please verify that your server is running and the GEMINI_API_KEY is defined in secrets.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!planOutput) return;
    navigator.clipboard.writeText(planOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe manual markdown renderer to avoid external dependencies
  const renderFormattedOutput = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("# ")) {
        return <h3 key={idx} className="font-sans text-2xl font-bold tracking-tight text-brand-dark dark:text-zinc-100 mt-6 mb-3">{line.replace("# ", "")}</h3>;
      }
      if (line.startsWith("## ")) {
        return <h4 key={idx} className="font-sans text-lg font-bold tracking-tight text-brand-primary dark:text-orange-400 mt-5 mb-2.5 flex items-center gap-2">
          {line.includes("Phase 1") && <Bot className="h-5 w-5 shrink-0" />}
          {line.includes("Phase 2") && <Workflow className="h-5 w-5 shrink-0" />}
          {line.includes("Phase 3") && <Layers className="h-5 w-5 shrink-0" />}
          <span>{line.replace("## ", "")}</span>
        </h4>;
      }
      if (line.startsWith("### ")) {
        return <h5 key={idx} className="font-sans text-sm font-semibold text-brand-dark dark:text-zinc-200 mt-4 mb-2">{line.replace("### ", "")}</h5>;
      }
      if (line.startsWith("* ") || line.startsWith("- ")) {
        // Simple bold parser inside list items
        const rawContent = line.replace(/^[\s*-]+/, "");
        const parts = rawContent.split("**");
        return (
          <li key={idx} className="ml-4 list-disc font-sans text-sm text-brand-dark/90 dark:text-zinc-300 mb-1.5 leading-relaxed">
            {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-brand-dark dark:text-zinc-100">{p}</strong> : p)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      // Bold parser for normal paragraphs
      const parts = line.split("**");
      return (
        <p key={idx} className="font-sans text-sm text-brand-dark/85 dark:text-zinc-350 leading-relaxed mb-3">
          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-brand-dark dark:text-zinc-100">{p}</strong> : p)}
        </p>
      );
    });
  };

  return (
    <div className="rounded-2xl border border-orange-100/60 bg-white p-6 shadow-sm dark:border-zinc-850 dark:bg-zinc-900 transition-all duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary dark:bg-orange-500/10 dark:text-orange-400">
          <Terminal className="h-4 w-4" />
        </div>
        <h2 className="font-sans text-xl font-bold tracking-tight text-brand-dark dark:text-zinc-100">
          Dynamic AI Systems Planner
        </h2>
      </div>
      <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mb-6 leading-relaxed">
        Demonstrating real AI capability. Use the interactive engine below to customize an automated marketing strategy and operational workflow.
      </p>

      {/* Preset Buttons */}
      <div className="mb-6">
        <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-500 mb-3">
          Or Quick-Start With Business Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3.5 py-2 rounded-xl bg-[#FFF8F0] border border-orange-100 text-brand-dark font-sans text-xs font-medium hover:bg-brand-highlight hover:border-brand-primary/30 transition-all cursor-pointer dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-750"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1.5 uppercase tracking-wide">
              Business Name
            </label>
            <input
              type="text"
              placeholder="e.g. Apex Analytics"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/20 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1.5 uppercase tracking-wide">
              Business Description <span className="text-brand-primary">*</span>
            </label>
            <textarea
              placeholder="Explain what your product or service actually does, what unique value it provides, and how you monetize."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/20 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1.5 uppercase tracking-wide">
              Target Audience
            </label>
            <input
              type="text"
              placeholder="e.g. Early-stage seed founders, busy B2B SaaS CMOs"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/20 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-2 uppercase tracking-wide">
              Core Operational Bottleneck
            </label>
            <div className="space-y-2">
              {bottlenecks.map((b) => (
                <label
                  key={b.id}
                  className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                    bottleneck === b.id
                      ? "border-brand-primary bg-brand-highlight/20 dark:border-orange-500 dark:bg-zinc-800/40"
                      : "border-orange-50/50 bg-transparent hover:border-orange-100 dark:border-zinc-800 dark:hover:border-zinc-750"
                  }`}
                >
                  <input
                    type="radio"
                    name="bottleneck"
                    value={b.id}
                    checked={bottleneck === b.id}
                    onChange={() => setBottleneck(b.id)}
                    disabled={loading}
                    className="mt-1 h-4 w-4 accent-brand-primary border-orange-200 focus:ring-0 cursor-pointer"
                  />
                  <div className="ml-3 select-none">
                    <span className="block font-sans text-sm font-semibold text-brand-dark dark:text-zinc-200 leading-tight">
                      {b.label}
                    </span>
                    <span className="block font-sans text-xs text-brand-muted dark:text-zinc-400 mt-0.5 leading-tight">
                      {b.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center space-x-2 text-xs font-medium text-red-600 bg-red-50 p-3 rounded-xl dark:bg-red-950/25 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={generateStrategy}
            disabled={loading}
            className="flex w-full items-center justify-center space-x-2.5 rounded-xl bg-brand-primary py-3.5 font-sans text-sm font-semibold text-white hover:bg-opacity-95 shadow-md shadow-brand-primary/15 transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{statusMessage}</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Build System Strategy</span>
              </>
            )}
          </button>
        </div>

        {/* Display Output Column */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between border-b border-orange-50 pb-3 mb-4 dark:border-zinc-800">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400">
              System Strategy Blueprint
            </span>
            {planOutput && (
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-orange-100 text-brand-muted hover:text-brand-dark dark:border-zinc-800 dark:hover:text-zinc-200 transition-all text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Full Spec</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 rounded-xl bg-[#FFF8F0]/30 border border-orange-100/40 p-5 overflow-y-auto max-h-[500px] dark:bg-zinc-950 dark:border-zinc-850">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3 py-16">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/20 opacity-75"></span>
                  <div className="relative rounded-full h-8 w-8 bg-brand-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white animate-spin" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-sans text-sm font-semibold text-brand-dark dark:text-zinc-200">
                    {statusMessage}
                  </p>
                  <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mt-1">
                    Generating optimized model architectures...
                  </p>
                </div>
              </div>
            ) : planOutput ? (
              <div className="prose prose-sm prose-orange dark:prose-invert max-w-none">
                {renderFormattedOutput(planOutput)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <Bot className="h-12 w-12 text-brand-primary/20 dark:text-orange-400/20 mb-3" />
                <h4 className="font-sans text-sm font-bold text-brand-dark dark:text-zinc-200">
                  Ready for Generation
                </h4>
                <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                  Provide your business description or click one of the presets on the left to output your customized strategic engine.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
