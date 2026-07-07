import { Article, CaseStudy, PortfolioItem, Resource, AIExperiment, MarketingFramework, AutomationWorkflow } from "./types";

export const articles: Article[] = [
  {
    id: "art-1",
    title: "The AI-First Content Engine: Automating Distribution Without Losing Brand Voice",
    slug: "ai-first-content-engine",
    excerpt: "A tactical guide to building a multi-agent system that repurposes high-signal founder insights into multi-platform campaigns while preserving authentic tone.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    category: "AI",
    readingTime: "8 min read",
    date: "June 24, 2026",
    author: {
      name: "Rajswa Srivastava",
      role: "AI Brand Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    tags: ["LLMs", "Marketing Automation", "Content Strategy", "Prompt Engineering"],
    tableOfContents: [
      { id: "introduction", text: "Introduction: The Repurposing Paradox", level: 2 },
      { id: "architecture", text: "The Multi-Agent System Architecture", level: 2 },
      { id: "voice-cloning", text: "Codifying Brand Voice & Tone Parameters", level: 2 },
      { id: "execution-blueprint", text: "Step-by-Step Implementation Blueprint", level: 2 },
      { id: "results-scaling", text: "Measuring Output and Next Steps", level: 2 }
    ],
    content: `
## Introduction: The Repurposing Paradox

Modern marketing demands omni-presence. Founders and executives have high-signal insights, but lack the bandwidth to manually translate a 60-minute podcast or a deep-dive technical brief into 15 LinkedIn posts, 3 newsletters, and an SEO-optimized blog post. 

The common solution is to hand these assets over to generic AI tools. However, this creates a major bottleneck: **loss of authentic voice**. The output sounds robotic, excessively clinical, and relies heavily on hallucinated clichés like "In today's fast-paced digital landscape."

To solve this, we must build a custom **AI-First Content Engine**. Rather than relying on simple, single-turn prompts, we design an agentic chain-of-thought system that analyzes raw transcripts, extracts core frameworks, filters noise, and maps elements to distinct, hyper-focused channel templates.

## The Multi-Agent System Architecture

Our content engine uses three distinct agent personas powered by advanced LLMs:

1. **The Curator Agent**: Focuses on analyzing raw speech transcriptions or raw text and identifying "High-Signal Nuggets"—declarative claims, counter-intuitive arguments, or specific metrics. It strips away verbal fillers and redundant speech.
2. **The Stylist Agent**: Holds a dense dictionary of the author's voice guidelines. It rewrites curated nuggets using specific syntactic structures, custom vocabulary exclusions, and preferred sentence length distributions.
3. **The Channel Architect Agent**: Formats the stylized copy into perfect native social posts (LinkedIn, X, or Newsletter sections) using platform-specific guidelines (e.g., strong hooks, clean line spacing, and subtle CTAs).

## Codifying Brand Voice & Tone Parameters

To maintain voice fidelity, we avoid vague adjectives like "warm" or "professional." Instead, we codify specific, quantifiable parameters in the system prompt:

*   **Pacing & Sentence Length**: Alternating short, impactful declarations (4-8 words) with moderately compound explanations (15-20 words). Never exceed 25 words in a single sentence.
*   **Linguistic Negatives**: Strictly ban words such as *delve, testament, leverage, revolutionized, game-changer, landscape, unleash*, and *supercharge*.
*   **Perspective**: Always write in the active voice, first-person singular ("I built this") or first-person plural ("We discovered that"), never passive second-person.
*   **Density**: Prefer clear, short-form nouns and direct verbs over flowery nominalizations.

## Step-by-Step Implementation Blueprint

Here is how you can set up this engine using a visual automation tool (such as Make or n8n) connected to the Gemini API:

1.  **Ingestion**: Set up an automated folder in Google Drive or Notion where you upload raw audio transcripts or raw markdown drafts.
2.  **Signal Extraction (The Curator)**: Route the text to Gemini, instructing it to output a JSON list of key strategic insights.
3.  **Refining (The Stylist)**: Pass each JSON nugget through a second Gemini module equipped with your personalized brand profile.
4.  **Formatting (The Channel Architect)**: Distribute outputs to specific rows in a Google Sheet categorized by platform (LinkedIn, X) for human review and scheduling.

## Measuring Output and Next Steps

By deploying this specific, multi-layered agent workflow, teams typically reduce raw content production time by **78%** while maintaining a brand voice that reads indistinguishably from hand-crafted drafts. The magic isn't in the model; it's in the precision of the routing and the strict constraints applied to the system instructions.
`,
    relatedArticles: ["product-led-ai-strategy"],
    relatedProjects: ["port-1"],
    relatedCaseStudies: ["cs-2"]
  },
  {
    id: "art-2",
    title: "Product-Led AI Strategy: Beyond Chatbots and Simple Prompt Wrappers",
    slug: "product-led-ai-strategy",
    excerpt: "Why the next wave of business value lies in server-authoritative agent networks integrated directly into core product UX and operational data.",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    category: "Product Management",
    readingTime: "6 min read",
    date: "May 12, 2026",
    author: {
      name: "Rajswa Srivastava",
      role: "AI Brand Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    tags: ["Product Strategy", "UX Design", "System Architecture", "B2B SaaS"],
    tableOfContents: [
      { id: "wrapper-problem", text: "The Demise of the Prompt Wrapper", level: 2 },
      { id: "invisible-ai", text: "Designing Invisible AI Experiences", level: 2 },
      { id: "context-engine", text: "Building the Context Engine", level: 2 },
      { id: "strategic-takeaway", text: "Strategic Takeaways for Product Leaders", level: 2 }
    ],
    content: `
## The Demise of the Prompt Wrapper

In the early stages of generative AI, companies hurried to deploy simple chat interfaces. These "prompt wrappers"—which merely sent user text to an external model with a thin system prompt—quickly became commoditized. Users grew tired of chatting with their software.

Chat is a high-friction UI. It demands that the user knows exactly what to ask, understands prompt engineering, and has the patience to iterate. The future of product-led AI is not conversational; it is **context-aware and action-oriented**.

## Designing Invisible AI Experiences

The most powerful AI integrations are invisible. They don't require a chat input box. Instead, they act in the background based on existing user state, intent, and telemetry:

*   **Proactive Synthesis**: Instead of asking an AI to "summarize my dashboard," the product automatically presents a three-bullet executive synthesis alongside the chart.
*   **Intent Prediction**: Based on a user's mouse trajectories and past actions, the system pre-computes recommendations and auto-completes complex form inputs.
*   **Self-Healing Workflows**: When a background integration fails (e.g., an API schema change), the system automatically diagnoses the issue, rewrites the mapper, and notifies the developer with a proposed fix.

## Building the Context Engine

To transition from generic prompts to high-signal solutions, we must build a dedicated Context Engine. This layer sits between your application database and the AI model:

1.  **State Enrichment**: When a request is triggered, the system pulls the user's recent interactions, billing tier, company size, and historical patterns.
2.  **Semantic Truncation**: It queries a vector database for relevant historical templates, keeping only the highly matching context to reduce token costs and latency.
3.  **Strict JSON Output**: The LLM is configured to output strict schemas (via JSON schema or structured outputs) that can be reliably parsed by frontend state managers.

## Strategic Takeaways for Product Leaders

If you are designing a product strategy in 2026, stop building chatbots. Focus on background pipelines that solve concrete, micro-tasks. True competitive advantage comes from proprietary context, elegant system choreography, and a user experience that removes the friction of prompting entirely.
`,
    relatedArticles: ["ai-first-content-engine"],
    relatedProjects: ["port-4"],
    relatedCaseStudies: ["cs-1"]
  },
  {
    id: "art-3",
    title: "Programmatic SEO for B2B SaaS: Scale Organic Traffic Without Quality Degradation",
    slug: "programmatic-seo-saas",
    excerpt: "A technical breakdown of how we built an automated, compliance-focused programmatic engine that generates highly structured landing pages from database tables.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    category: "SEO",
    readingTime: "10 min read",
    date: "April 08, 2026",
    author: {
      name: "Rajswa Srivastava",
      role: "AI Brand Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    tags: ["SEO", "Ahrefs", "Next.js", "Programmatic Content", "B2B Growth"],
    tableOfContents: [
      { id: "p-seo-shift", text: "The Paradigm Shift in SEO Strategy", level: 2 },
      { id: "database-design", text: "Designing the Structured Database Schema", level: 2 },
      { id: "content-generation", text: "Scale Generation with Tone Rules", level: 2 },
      { id: "seo-results", text: "Measuring Search Visibility Impact", level: 2 }
    ],
    content: `
## The Paradigm Shift in SEO Strategy

Historically, SEO teams spent weeks manually drafting individual articles targeting single keywords. While this works for high-editorial thought leadership, it fails when trying to address broad matrices of user search intents (e.g., 'SOC2 Compliance for [Industry] in [Region]').

Programmatic SEO (pSEO) automates this by treating content as a structural data product. We design template structures, seed databases with precise data, and use dynamic routing to render thousands of clean, high-value, fast-loading pages.

## Designing the Structured Database Schema

The foundation of any pSEO machine is high-quality data. If you feed generic AI-generated junk to search crawlers, your domain will get flagged. We build clean relational rows containing verified data variables:

*   **Primary Variables**: Industry, Regulatory Framework, Key Challenge, Target Audience.
*   **Enriched Variables**: Specific audit steps, required security controls, typical costs, average timeline.

By mapping variables cleanly, every generated page features unique, highly-actionable, technical text rather than generic repeating paragraphs.

## Scale Generation with Tone Rules

When automating, we must strictly apply our voice and tone guidelines. Generative models default to highly repetitive transitions. We restrict the generator using these rules:

1.  **Do not summarize**: Never write a concluding paragraph that begins with "In conclusion" or "To sum up."
2.  **Use real examples**: Instead of describing theoretical compliance, the prompt references specific real-world compliance steps (e.g., configuring AWS CloudTrail).
3.  **Ensure speed**: Keep pages highly optimized, lightweight, and fast-loading using Static Site Generation (SSG).

## Measuring Search Visibility Impact

By treating SEO as a database engineering task, we've successfully mapped search query gaps, deployed targeted silos, and achieved outstanding ranking speed. It shifts SEO from a slow editorial process into an automated, highly-predictable traffic engine.
`,
    relatedArticles: ["product-led-ai-strategy"],
    relatedProjects: ["port-2"],
    relatedCaseStudies: ["cs-1"]
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port-1",
    title: "AI-Driven Competitor Copy & Positioning Engine",
    slug: "competitor-copy-positioning-engine",
    category: "AI Projects",
    client: "Apex SaaS Group",
    description: "An automated intelligence workspace that crawls competitor copy, extracts core value props, and maps differentiated brand hooks on autopilot.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop",
    impact: "Drove 40% increase in outbound LinkedIn conversion rates using AI-extracted hooks.",
    tools: ["React", "Express", "Google GenAI SDK", "Tailwind CSS"],
    overview: "This project was built to solve a major problem for product marketers: the painstaking process of manually monitoring competitor landing pages, cataloging claims, and translating those into fresh messaging angles.",
    problem: "Marketers spent 12+ hours monthly manually auditing competitor landing pages, resulting in stale static files that were rarely used by active sales development reps.",
    objective: "Create an autonomous backend crawler and analyzer that extracts high-intent positioning strategies, pain points, and specific messaging angles in real time.",
    research: "Analyzed 150+ startup value propositions. Discovered that 80% of landing pages rely on the same 5 value templates (speed, ease of use, cost-savings, automation, enterprise security). True differentiation comes from addressing micro-challenges in unique brand syntax.",
    strategy: "Instead of raw generic summaries, we trained a multi-agent parser utilizing Jobs-to-be-Done (JTBD) criteria to identify precise functional, emotional, and social dimensions of user problems.",
    process: "1. Raw html ingestion of competitor URL.\n2. DOM extraction of primary header and paragraph tags.\n3. Segmented processing through the Curator LLM Agent to isolate actual core claims from marketing fluff.\n4. Output formatting into clean JSON schemas describing value maps.",
    results: "Processed competitor analysis reports on autopilot in under 15 seconds. Generated 45 high-converting outbound LinkedIn sequences that achieved a 40% response increase.",
    keyLearnings: "Deep positioning requires structural constraints. LLMs perform exceptionally when structured around rigid business frameworks rather than free-form prompting.",
    relatedArticles: ["ai-first-content-engine"],
    relatedCaseStudies: ["cs-2"]
  },
  {
    id: "port-2",
    title: "Scale-Safe Programmatic SEO Pipeline",
    slug: "programmatic-seo-pipeline",
    category: "SEO Projects",
    client: "CertifyFlow",
    description: "Built an automated programmatic engine that dynamically generates compliance-focused landing pages based on Search Console gaps.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
    impact: "Boosted organic search traffic by 215% and domain authority from 24 to 41.",
    tools: ["Vite", "Ahrefs API", "Markdown", "Node.js"],
    overview: "For high-compliance SaaS startups, long-tail search queries are gold mines. Buyers looking for specific regulatory mappings have extremely high buying intent. We engineered a scalable system to capture these queries.",
    problem: "Writing regulatory guides for 150+ industries manually would have cost $50,000+ in copywriting fees and taken 9+ months to complete.",
    objective: "Deploy 150+ ultra-targeted, technically sound, compliance-focused search silo landing pages in under 3 weeks.",
    research: "Audited search trends in cybersecurity compliance. Discovered heavy search volume around variations of 'SOC2 compliance checklist for [industry]'. Buyers wanted specific examples, not generic overviews.",
    strategy: "Constructed a highly structured relational database containing sector-specific controls (e.g. HIPAA controls for telemedicine, SOC2 for HR platforms). Rendered pages dynamically using lightweight templates.",
    process: "1. Identified core long-tail keywords in Ahrefs.\n2. Built database of industry-specific compliance requirements.\n3. Scripted dynamic Markdown generation mapping compliance controls to industry challenges.\n4. Compiled static HTML files and submitted directly to search indexes.",
    results: "150 pages indexed in 14 days. Achieved top-3 rankings on 42 high-intent keywords, driving a 215% organic traffic surge and 180+ inbound leads.",
    keyLearnings: "Programmatic pages must maintain editorial integrity. Clean data inputs produce high-quality pages that search crawlers reward.",
    relatedArticles: ["programmatic-seo-saas"],
    relatedCaseStudies: ["cs-1"]
  },
  {
    id: "port-3",
    title: "Autonomous Lead Enrichment & CRM Scoring Engine",
    slug: "lead-enrichment-crm-scoring",
    category: "Automation",
    client: "Lumina Labs",
    description: "Built an automated lead routing and scoring engine connecting n8n, Hunter.io, and Gemini to accelerate sales response times.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
    impact: "Reduced manual pipeline research time by 92% and doubled lead scoring accuracy.",
    tools: ["Make.com", "ActiveCampaign", "Hunter API", "Webhooks"],
    overview: "In B2B sales, speed is everything. However, reps often wait hours for manual lead enrichment before scheduling demos. This pipeline automates the entire research process, scoring leads instantly on submission.",
    problem: "Sales representatives spent hours manually researching newly registered leads on LinkedIn and corporate sites, causing prospect drop-offs.",
    objective: "Automate lead data collection, perform deep firmographic profiling, and inject score categories in HubSpot within 60 seconds of demo registration.",
    research: "Analyzed sales rep bottlenecks. Discovered that 60% of research time went to checking simple parameters like company size, funding round, and core industry focus.",
    strategy: "Designed a lightweight, webhook-triggered middleware that scrapes prospect company domains and passes the context to an LLM script for categorical scoring.",
    process: "1. Capture form webhook.\n2. Call Hunter API to extract corporate details.\n3. Scrape company homepage content.\n4. Call Gemini to classify buyer persona and score lead potential from 1 to 5.",
    results: "Processed lead dossiers instantly inside HubSpot and Slack. Reps contacted prospects in under 4 minutes with highly personalized talking points.",
    keyLearnings: "Automation is most effective when it acts as an assistant to human intelligence, stripping away administrative tasks and leaving creative work to salespeople.",
    relatedArticles: ["ai-first-content-engine"],
    relatedCaseStudies: ["cs-2"]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Organic Inbound Transformation: Fueling B2B Acquisition for Securify Corp",
    slug: "organic-inbound-transformation-securify",
    category: "SEO & Content",
    client: "Securify Corporation",
    summary: "How a redesigned content engine and automated SEO analysis drove a 310% increase in inbound qualified leads within 6 months.",
    problem: "Securify faced extremely high customer acquisition costs (CAC) through paid social channels. Their organic search presence was flat, and product onboarding guides were confusing, causing prospects to drop out during trials.",
    goal: "Reduce CAC by 45%, construct a scalable organic inbound marketing engine, and increase trial-to-paid conversions by 30%.",
    research: "Audited buyer search habits and identified that compliance officers search heavily for functional solutions to specific compliance challenges rather than broad marketing slogans. The onboarding drop-off was driven by a lack of clear contextual guidance.",
    strategy: "Constructed an automated, interactive self-assessment 'Compliance Score' calculator on their site. In parallel, launched 150 industry-specific programmatic SEO compliance guides.",
    implementation: "1. Executed a comprehensive technical SEO audit, rebuilding site navigation around structured compliance silos.\n2. Designed an interactive compliance diagnostic flow where prospects assessed their security parameters and received an instant custom email blueprint.\n3. Scaled programmatic content targeting high-intent compliance keywords.",
    results: {
      metrics: [
        { label: "Inbound Leads", value: "+310%" },
        { label: "CAC Reduction", value: "-52%" },
        { label: "Trial-to-Paid", value: "+37%" }
      ],
      description: "Securify established deep organic search authority. The interactive calculator became their highest-performing lead generator, capturing 4,500+ high-quality accounts with an outstanding demo booking rate."
    },
    lessonsLearned: "Technical buyers seek immediate value. Providing an interactive diagnostic tool is far more effective than generic whitepapers or long-form static brochures.",
    nextSteps: "We are currently expanding the interactive diagnostic into a localized regulatory mapping system to target European compliance frameworks.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    toolsUsed: ["Ahrefs", "n8n", "Node.js", "Markdown", "Vite", "Google Analytics"],
    relatedProjectSlug: "programmatic-seo-pipeline"
  },
  {
    id: "cs-2",
    title: "Autonomous Lead Operations: Scaling Agency Lead Engines for Vanguard Global",
    slug: "autonomous-lead-operations-vanguard",
    category: "Automation Operations",
    client: "Vanguard Global Group",
    summary: "Deploying a server-authoritative multi-agent pipeline that automates lead enrichment, classification, and personalized outreach.",
    problem: "Vanguard received 800+ leads weekly, but their 5-person SDR team was overwhelmed. They spent 80% of their time manually reviewing submissions, researching company profiles, and drafting initial messages.",
    goal: "Automate 90% of lead enrichment, reduce sales response time to under 5 minutes, and increase booked appointments.",
    research: "Discovered that lead quality varied wildly, and SDRs spent too much time chasing low-intent accounts while high-value prospects sat in queues.",
    strategy: "Built a fully autonomous enrichment and scoring system using n8n and Gemini. Leads are instantly scraped, scored against target criteria, and routed based on value tier.",
    implementation: "1. Developed an Express API webhook receiver.\n2. Built n8n workflows to scrape target domains and extract key statistics.\n3. Configured Gemini to score leads and draft tailored, founder-voiced outbound emails for sales team review.",
    results: {
      metrics: [
        { label: "Time Saved", value: "34 hrs/wk" },
        { label: "Response Time", value: "<4 mins" },
        { label: "Bookings", value: "+48%" }
      ],
      description: "The pipeline successfully automated Vanguard's operations, processing thousands of leads monthly with precise filtering and rich data delivery to reps."
    },
    lessonsLearned: "SDRs perform best when freed from administrative tasks. Automation enables sales teams to focus on high-value conversations that close deals.",
    nextSteps: "Integrating CRM historical data to automatically train scoring criteria based on won-lost trends.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    toolsUsed: ["n8n", "Gemini API", "Hunter.io", "HubSpot", "Slack API", "Express.js"],
    relatedProjectSlug: "lead-enrichment-crm-scoring"
  }
];

export const aiExperiments: AIExperiment[] = [
  {
    id: "exp-1",
    title: "Multi-Agent LinkedIn Content Sieve Experiment",
    slug: "multi-agent-linkedin-sieve",
    objective: "Test whether a multi-agent routing system can accurately repurpose long-form audio transcripts into high-performing LinkedIn posts without sounding robotic.",
    hypothesis: "By separating the tasks of raw topic extraction, brand stylistic mapping, and platform-specific formatting into distinct LLM agents, we can generate content indistinguishable from human-written copy.",
    toolsUsed: ["Gemini API", "Node.js", "n8n Workflows", "Google Docs API"],
    method: "Fed 15 raw transcriptions of podcast episodes through two distinct pipelines: a Single-Turn Prompt pipeline (control) and a Multi-Agent Pipeline (treatment). Each output was reviewed by 3 growth marketers in a blind quality test.",
    results: "The Multi-Agent pipeline achieved a 92% approval score from human editors, compared to only 34% for the single-turn baseline. The resulting posts drove a 24% increase in organic LinkedIn impressions over a 30-day trial.",
    metrics: [
      { label: "Editorial Quality", value: "92%" },
      { label: "Organic Reach", value: "+24%" },
      { label: "Production Speed", value: "10x" }
    ],
    whatWorked: "Separating content selection from stylistic polishing. The Stylist agent with a list of banned words successfully stripped away AI clichés.",
    whatFailed: "Directly outputting to social platforms without human review. Some technical details needed manual verification.",
    futureImprovements: "Integrating an automatic search verification module to check technical claims against reliable search databases before writing drafts.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    date: "June 20, 2026"
  }
];

export const marketingFrameworks: MarketingFramework[] = [
  {
    id: "fw-1",
    title: "Jobs-To-Be-Done (JTBD) for AI SaaS",
    slug: "jtbd-for-ai-saas",
    definition: "A framework focused on understanding the core functional, social, and emotional 'jobs' customers purchase software to solve.",
    businessExample: "Instead of buying an 'AI email writing assistant' (features), a B2B sales director is buying the 'confidence that my SDRs are sending highly targeted emails that won't damage brand reputation' (job).",
    productExample: "In our positioning engine project, we shifted the copy from 'Generative AI competitor analyzer' to 'Generate personalized outreach hooks that increase outbound reply rates by 40%'.",
    whenToUse: "When launching an AI-first product or trying to find product-market fit in a crowded category.",
    mistakes: [
      "Focusing on what the customer IS (demographics) rather than what they are trying to ACCOMPLISH (jobs).",
      "Listing technical capabilities (e.g., 'Powered by Gemini 1.5') rather than concrete business outcomes."
    ],
    templateDownloadUrl: "#",
    steps: [
      { title: "Define the Situation", desc: "When [situation happens]..." },
      { title: "Identify the Motivation", desc: "I want to [accomplish functional/emotional challenge]..." },
      { title: "Specify the Outcome", desc: "So that I can [experience desired transformation]." }
    ]
  },
  {
    id: "fw-2",
    title: "AARRR Pirate Funnel for PLG Products",
    slug: "aarrr-pirate-funnel-plg",
    definition: "A customer lifecycle framework that breaks growth down into five key pillars: Acquisition, Activation, Retention, Referral, and Revenue.",
    businessExample: "Securify Corporation used this framework to optimize onboarding, focusing heavily on Activation (calculating compliance score) which boosted trial-to-paid conversions.",
    productExample: "Designed dynamic tooltips and clear progress steps to guide users directly to their first interactive value milestone.",
    whenToUse: "To audit product growth funnels and locate user drop-off bottlenecks.",
    mistakes: [
      "Spending budgets on Acquisition before fixing Activation and Retention leaks.",
      "Measuring vanity metrics (such as page views) instead of core activation metrics (completed setup)."
    ],
    templateDownloadUrl: "#",
    steps: [
      { title: "Acquisition", desc: "How do prospects discover your value?" },
      { title: "Activation", desc: "Do they experience their first 'Aha!' moment?" },
      { title: "Retention", desc: "Do they build a habit and return regularly?" },
      { title: "Referral", desc: "Do they invite team members or colleagues?" },
      { title: "Revenue", desc: "Do they transition into active paying customers?" }
    ]
  }
];

export const automationWorkflows: AutomationWorkflow[] = [
  {
    id: "wf-1",
    title: "Inbound Lead Intelligence & Scoring Workflow",
    slug: "inbound-lead-intelligence-scoring",
    tools: ["n8n", "Gemini API", "Hunter.io", "HubSpot"],
    prompts: [
      "Review the scraped text from this company domain: {{context}}. Isolate their core business model, check if they sell B2B software, and evaluate their potential need for automated positioning software. Output score 1 to 5."
    ],
    automationLogic: "Triggers on form submission. Calls Hunter to verify domain, scrapes homepage header elements, routes unstructured text to Gemini, and posts enriched client profiles to HubSpot and Slack.",
    businessUseCase: "Accelerates outbound sales follow-up times and filters spam accounts automatically without manual research.",
    estimatedTimeSaved: "34 hours per week for SDR teams.",
    steps: [
      { title: "Form Inbound Webhook", action: "Captures name, company, email.", tool: "Form Element" },
      { title: "Enrich Company Data", action: "Verifies domain details and fetches metadata.", tool: "Hunter API" },
      { title: "Scrape Corporate Site", action: "Extracts main landing page copy.", tool: "n8n Crawler" },
      { title: "Cognitive Scoring", action: "Evaluates B2B fit and drafts intro hooks.", tool: "Gemini API" },
      { title: "HubSpot & Slack Inject", action: "Notifies sales team and populates pipeline.", tool: "HubSpot CRM" }
    ]
  }
];

export const resources: Resource[] = [
  {
    id: "res-1",
    title: "Competitor Value Proposition Extractor",
    category: "Prompt Collections",
    type: "prompt",
    description: "An advanced system prompt structured around the Jobs-To-Be-Done framework to extract value props, messaging hooks, and pain points from competitor web content.",
    downloadCount: 1420,
    content: `You are an expert UX Researcher and B2B Product Strategist. 
Your objective is to analyze the following raw text containing competitor landing page copy and extract a structured Positioning Profile.

Please output your analysis in standard JSON format containing:
1. "functional_jobs": What concrete tasks does their software perform?
2. "emotional_jobs": What peace of mind or confidence does the buyer seek?
3. "social_jobs": How does this product make the buyer look to their team?
4. "pain_points_addressed": Frustrations they resolve.
5. "proposed_differentiators": 3 strategic angles to beat this competitor's messaging.

Raw Text For Analysis:
[INSERT COMPETITOR LANDING PAGE COPY]`
  },
  {
    id: "res-2",
    title: "n8n Lead Enrichment Blueprint Template",
    category: "Templates",
    type: "template",
    description: "JSON configuration structure for n8n to ingest webhook data, query enrichment APIs, send context to Gemini, and update sales CRMs.",
    downloadCount: 945,
    content: `To import this template into your n8n workflow:
1. Copy this JSON block.
2. Inside your n8n canvas, press Ctrl+V to paste the node tree.
3. Replace placeholder API keys in Hunter and HubSpot node configurations.

Nodes Configured:
- Webhook (Trigger): Inbound registration webhook.
- HTTP Request: Checks company details on Hunter.
- HTTP Request: Scrapes primary text.
- OpenAI/Gemini Node: Synthesizes B2B fit.
- HubSpot Node: Creates/updates contact.`
  },
  {
    id: "res-3",
    title: "SaaS SEO Technical Audit Checklist",
    category: "Checklists",
    type: "checklist",
    description: "A comprehensive, 45-point tactical checklist to audit B2B SaaS indexability, core web vitals, dynamic sitemaps, and programmatic silos.",
    downloadCount: 2150,
    content: `## Crawlability & Indexing Audit Checklist
[ ] robots.txt is updated and points directly to the XML sitemap.
[ ] sitemap.xml dynamically lists all newly deployed programmatic SEO landing pages.
[ ] Canonical tags are set on all dynamic pages to prevent duplicate content flags.
[ ] Breadcrumbs schema markup is active on all content articles.

## Speed & CWV Checklist
[ ] Largest Contentful Paint (LCP) is under 2.5 seconds on mobile.
[ ] All cover images are converted to WebP formats and properly lazy-loaded.
[ ] Static site generation is utilized for core knowledge lab content.

## Schema Markup Checklist
[ ] Schema.org Organization markup is active on the homepage.
[ ] Article schema is embedded on all blog pages with author credit.
[ ] BreadcrumbList schema is valid in Search Console.`
  },
  {
    id: "res-4",
    title: "Essential Reading & Learning List",
    category: "Reading Lists",
    type: "list",
    description: "A carefully curated reading list documenting books and essays on product strategy, cognitive engineering, consumer behavior, and SEO.",
    downloadCount: 810,
    content: `### Product Strategy & Marketing
1. "Obviously Awesome" by April Dunford - The definitive guide to positioning.
2. "Play Bigger" by Al Ramadan - Establishing new product categories.
3. "Competing Against Luck" by Clayton Christensen - The fundamental framework of Jobs-to-be-Done (JTBD).

### Cognitive Automation & AI Engineering
1. Google GenAI SDK Documentation - Best practices for client/server interface patterns.
2. "Designing Agentic Workflows" - Deep dives into multi-agent systems and task decomposition.

### Organic Traffic & SEO
1. "Product-Led SEO" by Eli Schwartz - Strategic organic growth built into product.
2. Ahrefs Academy - Mastering programmatic keyword research and backlink topology.`
  }
];

export const sitemapData = {
  root: "https://rajswa.co",
  pages: [
    { path: "/", label: "Home (Brand Headquarters Hub)", component: "App.tsx (Main View)" },
    { path: "/about", label: "About Rajswa: Bio, Values, Philosophy", component: "AboutSection.tsx" },
    {
      path: "/insights",
      label: "Insights: Articles, Marketing Frameworks, AI Experiments",
      subpages: ["/insights/:slug (Deep Reader Context)"]
    },
    { path: "/case-studies", label: "Case Studies: Full Deep-Dives", subpages: ["/case-studies/:slug"] },
    { path: "/portfolio", label: "Portfolio Grid: Filterable Categorization" },
    { path: "/resources", label: "Resources: Copyable Prompts, Blueprints, Templates" },
    { path: "/newsletter", label: "Newsletter: Insights Capture" },
    { path: "/contact", label: "Contact Form" }
  ]
};

export const uxStrategyData = [
  {
    pillar: "Swiss-Inspired Minimalist Design",
    details: "High whitespace, bold clear typography, and absolute exclusion of simulated server telemetry or logs.",
    implementation: "16px default layout grid, premium charcoal dark colors, and Inter + Manrope typography."
  },
  {
    pillar: "Actionable Content Authority",
    details: "Displaying actual real-world prompt parameters, vector blueprints, and programmatic indexing checklists.",
    implementation: "Copy-paste code blocks, direct download triggers, and step-by-step workflow diagrams."
  },
  {
    pillar: "Organic Inbound Loops",
    details: "Frictionless interactive scoring calculators and search indexable routes.",
    implementation: "The live interactive strategic GTM planner, robust multi-source search indexing."
  }
];

export const nextJsFolderStructure = `my-app/
├── app/
│   ├── layout.tsx (Root Layout with SEO meta tags)
│   ├── page.tsx (Personal Brand Headquarters Hero & Bento Hub)
│   ├── about/
│   │   └── page.tsx (Core Biography & Philosophy)
│   ├── insights/
│   │   ├── page.tsx (Knowledge Lab: Articles, GTM Frameworks, AI Experiments)
│   │   └── [slug]/
│   │       └── page.tsx (SEO Optimized Reader with Breadcrumbs schema)
│   ├── case-studies/
│   │   ├── page.tsx (Transformations Index)
│   │   └── [slug]/
│   │       └── page.tsx (Problem, Strategy, Metrics Case Study)
│   ├── portfolio/
│   │   └── page.tsx (Filterable Projects Portfolio)
│   ├── resources/
│   │   └── page.tsx (Asset and Copyable Prompt Downloads)
│   └── contact/
│       └── page.tsx (Interactive Planner & Project Form)
├── components/
│   ├── Header.tsx (Global navigation & search dialog)
│   ├── Footer.tsx (Interactive newsletter & links)
│   ├── UI/
│   │   └── Button.tsx (Reusable premium components)
│   └── BrandWorkspace.tsx (Director Blueprint Dashboard)
├── data/
│   └── brandData.ts (Static source data mapping)
├── types/
│   └── index.ts (TypeScript type configurations)
├── package.json
└── tsconfig.json`;
