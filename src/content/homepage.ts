export type Capability = {
  title: string;
  description: string;
  proof: string;
};

export type FaqItem = { question: string; answer: string };

export const homepageContent = {
  role: "Full-Stack & AI Automation Developer",
  headline: "Software that works. Automation that keeps working.",
  primaryCta: "Explore my work",
  secondaryCta: "Download résumé",
} as const;

export const capabilities: Capability[] = [
  {
    title: "Full-stack products",
    description: "Useful web experiences shaped around the work people need to do.",
    proof: "From customer-facing pages to operational product workflows.",
  },
  {
    title: "Workflow automation",
    description: "Reliable systems that reduce repeated manual steps.",
    proof: "Designed around clear inputs, handoffs, and operational visibility.",
  },
  {
    title: "AI-enabled tools",
    description: "Practical AI features grounded in the information a business trusts.",
    proof: "Applied with defined guardrails and a clear purpose.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What kinds of projects do you take on?",
    answer:
      "I work on full-stack products, workflow automation, and practical AI tools that help a team improve a real business process.",
  },
  {
    question: "How does a project begin?",
    answer:
      "We start with the problem, the people using the system, and the outcome that would make the work meaningfully better.",
  },
  {
    question: "What does collaboration look like?",
    answer:
      "The work moves from a clear scope into focused builds, review points, and a handoff that keeps the system understandable.",
  },
  {
    question: "How do you approach automation and AI?",
    answer:
      "I use automation and AI where they make a process more dependable, with guardrails and trusted information guiding the result.",
  },
];
