export type SkillLogo =
  | "typescript"
  | "javascript"
  | "kotlin"
  | "python"
  | "c"
  | "php"
  | "html5"
  | "css"
  | "nextdotjs"
  | "react"
  | "springboot"
  | "django"
  | "tailwindcss"
  | "android"
  | "supabase"
  | "docker"
  | "git"
  | "googlegemini"
  | "anthropic"
  | "zapier";

export type SkillItem = {
  name: string;
  logo: SkillLogo;
};

export type SkillLane = {
  label: string;
  direction: "left" | "right";
  items: SkillItem[];
};

export const skillLanes: SkillLane[] = [
  {
    label: "Languages",
    direction: "left",
    items: [
      { name: "TypeScript", logo: "typescript" },
      { name: "JavaScript", logo: "javascript" },
      { name: "Kotlin", logo: "kotlin" },
      { name: "Python", logo: "python" },
      { name: "C", logo: "c" },
      { name: "PHP", logo: "php" },
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css" },
    ],
  },
  {
    label: "Frameworks & platforms",
    direction: "right",
    items: [
      { name: "Next.js", logo: "nextdotjs" },
      { name: "React", logo: "react" },
      { name: "Spring Boot", logo: "springboot" },
      { name: "Django", logo: "django" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Android", logo: "android" },
      { name: "Supabase", logo: "supabase" },
    ],
  },
  {
    label: "Cloud, AI & tools",
    direction: "left",
    items: [
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
      { name: "Google Gemini", logo: "googlegemini" },
      { name: "Anthropic", logo: "anthropic" },
      { name: "Zapier", logo: "zapier" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Python", logo: "python" },
    ],
  },
];

export const textOnlyTechnologies = ["Java", "AWS", "ServiceNow", "OpenAI"];

export const engineeringPractices = [
  {
    index: "01",
    title: "Agile / Scrum",
    description: "Short feedback loops, visible decisions, and steady delivery.",
  },
  {
    index: "02",
    title: "Full-Stack SDLC",
    description: "Research, architecture, implementation, release, and improvement.",
  },
  {
    index: "03",
    title: "DevOps & CI/CD",
    description: "Repeatable checks and deployment paths that keep changes safe.",
  },
  {
    index: "04",
    title: "Responsible AI",
    description: "Grounding, guardrails, observability, and honest failure handling.",
  },
];

export type PortfolioProject = {
  number: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  target: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    number: "02",
    title: "AI Document Intelligence",
    category: "AI Automation / Full-Stack",
    problem:
      "Important information stays trapped in uploaded documents and has to be copied, checked, and normalized by hand.",
    solution:
      "An auditable processing pipeline that extracts structured data, validates it against business rules, and routes exceptions to a human reviewer.",
    technologies: ["React", "Python", "FastAPI", "AI / LLM", "Docker"],
    target: "Placeholder target · minutes instead of repetitive data entry",
  },
  {
    number: "03",
    title: "Agentic Workflow Command Center",
    category: "Agentic AI / Operations",
    problem:
      "Automations become difficult to trust when teams cannot see what an agent is doing, why it acted, or when it needs help.",
    solution:
      "A supervision layer for AI agents with live run states, approval gates, traceable decisions, and clear human handoffs.",
    technologies: ["Next.js", "Python", "OpenAI", "Event Streams", "PostgreSQL"],
    target: "Placeholder target · faster resolution with human control intact",
  },
];
