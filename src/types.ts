export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: "AI" | "Marketing" | "Business" | "SEO" | "Automation" | "Product Management" | "Analytics" | "Psychology" | "Growth" | "Finance";
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  tags: string[];
  tableOfContents: HeadingItem[];
  relatedArticles?: string[]; // article slugs
  relatedProjects?: string[]; // portfolio slugs
  relatedCaseStudies?: string[]; // case study slugs
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: "AI Systems" | "Product Growth" | "Automation Operations" | "SEO & Content";
  client: string;
  summary: string;
  problem: string;
  goal: string;
  research: string;
  strategy: string;
  implementation: string;
  results: {
    metrics: { label: string; value: string }[];
    description: string;
  };
  lessonsLearned: string;
  nextSteps: string;
  coverImage: string;
  toolsUsed: string[];
  relatedProjectSlug?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: "AI Projects" | "Marketing Projects" | "SEO Projects" | "Automation" | "Analytics" | "Product Thinking" | "Business Strategy" | "Website Development";
  client: string;
  description: string;
  image: string;
  impact: string;
  tools: string[];
  // Deep dive fields
  overview: string;
  problem: string;
  objective: string;
  research: string;
  strategy: string;
  process: string;
  results: string;
  keyLearnings: string;
  relatedArticles?: string[]; // article slugs
  relatedCaseStudies?: string[]; // case study slugs
  relatedFrameworks?: string[]; // framework slugs
}

export interface Resource {
  id: string;
  title: string;
  category: "Templates" | "Checklists" | "Prompt Collections" | "Reading Lists";
  type: "prompt" | "template" | "checklist" | "list";
  description: string;
  downloadCount: number;
  content: string; // Copyable content
}

export interface AIExperiment {
  id: string;
  title: string;
  slug: string;
  objective: string;
  hypothesis: string;
  toolsUsed: string[];
  method: string;
  results: string;
  metrics: { label: string; value: string }[];
  whatWorked: string;
  whatFailed: string;
  futureImprovements: string;
  coverImage: string;
  date: string;
}

export interface MarketingFramework {
  id: string;
  title: string;
  slug: string;
  definition: string;
  businessExample: string;
  productExample: string;
  whenToUse: string;
  mistakes: string[];
  templateDownloadUrl: string;
  steps: { title: string; desc: string }[]; // Visual representation
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  slug: string;
  tools: string[];
  prompts: string[];
  automationLogic: string;
  businessUseCase: string;
  estimatedTimeSaved: string;
  steps: { title: string; action: string; tool: string }[]; // Workflow steps
}
