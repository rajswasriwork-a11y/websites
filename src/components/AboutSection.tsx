import React from "react";
import { User, ShieldCheck, Target, Sparkles, Award, Star, Compass, BookOpen, Brain, Briefcase, ExternalLink } from "lucide-react";

export default function AboutSection() {
  const interests = [
    {
      title: "AI & Automation",
      desc: "Building multi-agent systems, automating lead operations with n8n/Make, and exploring server-side cognitive engineering."
    },
    {
      title: "Product Management",
      desc: "Designing user journeys that remove the friction of prompting, prioritizing background task automation and contextual features."
    },
    {
      title: "Marketing & Growth",
      desc: "Deploying high-quality programmatic SEO campaigns and using cognitive value mapping based on Jobs-to-be-Done."
    },
    {
      title: "Consumer Psychology",
      desc: "Studying how buyers perceive AI tools and messaging, aiming to write copy that sounds deeply human and authentic."
    }
  ];

  const tools = [
    "Gemini API", "Node.js", "TypeScript", "n8n", "Make.com", "Ahrefs", "HubSpot", "Vite", "Tailwind CSS", "Python", "Google Analytics", "GitHub"
  ];

  const coreGoals = [
    {
      title: "Build & Document",
      desc: "Keep learning in public, creating open-source templates, custom prompt files, and checklists for other builders."
    },
    {
      title: "Product Growth",
      desc: "Transition into product marketing or product management, bridging deep technical AI capabilities with actual consumer needs."
    },
    {
      title: "Avoid Hype",
      desc: "Advocate for clean, simple engineering and authentic communication, steering clear of 'AI wrapper' bubbles."
    }
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Intro */}
      <div className="border-b border-zinc-800 pb-8 mb-12">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <User className="h-4 w-4" />
          <span>About Me</span>
        </span>
        <h2 className="mt-2 font-sans text-4xl font-extrabold tracking-tight text-white">
          Rajswa Srivastava
        </h2>
        <p className="font-sans text-base text-zinc-400 mt-2">
          University student studying AI, Marketing, Product Management, and Technology. Documenting everything I build and learn.
        </p>
      </div>

      <div className="space-y-12">
        {/* Narrative bio */}
        <div className="space-y-6">
          <h3 className="font-sans text-lg font-bold text-white">Who I Am &amp; My Learning Journey</h3>
          <div className="font-sans text-sm text-zinc-300 space-y-4 leading-relaxed">
            <p>
              I am a university student serious about technology and growth. Rather than just reading textbooks, I build practical tools, script automation routines, deploy technical SEO silos, and deeply analyze how businesses actually acquire customers in the AI era.
            </p>
            <p>
              I started this website as my personal headquarters—a central repository to document my experiments, share templates, and store structured case studies. I believe the best way to understand technology is to build it ourselves, document what goes wrong, and explain it clearly to others.
            </p>
            <p>
              When I'm not writing code or setting up webhooks, I read about consumer psychology and analyze product strategies of companies like Apple, Google, and Spotify.
            </p>
          </div>
        </div>

        {/* Interests */}
        <div className="pt-8 border-t border-zinc-800">
          <h3 className="font-sans text-lg font-bold text-white mb-6">Core Interests</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {interests.map((interest, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-900 border border-zinc-850">
                <h4 className="font-sans text-sm font-bold text-white mb-2">{interest.title}</h4>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="pt-8 border-t border-zinc-800">
          <h3 className="font-sans text-lg font-bold text-white mb-4">The Tools I Use</h3>
          <p className="font-sans text-xs text-zinc-400 mb-6">
            The active stack I rely on to execute marketing pipelines, write API scripts, and manage database templates.
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850 font-mono text-xs text-zinc-300">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="pt-8 border-t border-zinc-800">
          <h3 className="font-sans text-lg font-bold text-white mb-6">My Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreGoals.map((goal, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-brand-primary text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="font-sans text-sm font-bold text-white">{goal.title}</h4>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed pl-7">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link Section */}
        <div className="pt-10 border-t border-zinc-800 text-center">
          <p className="font-sans text-sm text-zinc-400 mb-4">
            Let's connect. I regular share notes and project updates on LinkedIn.
          </p>
          <a
            href="https://www.linkedin.com/in/rajswa-srivastava-marketing/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 rounded-xl bg-brand-primary px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-opacity-90 transition-all shadow-lg shadow-orange-500/10 cursor-pointer"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>

    </section>
  );
}
