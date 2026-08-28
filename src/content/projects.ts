import type { CaseStudyProject } from "@/types/project";

export const requiredChapterTitles = {
  "sayu-cafe": [
    "Business context and operational friction",
    "Responsive product discovery",
    "Daily audit reporting",
    "Inventory monitoring and low-stock alerts",
    "Rule-based drink builder",
    "Future smart suggestions",
  ],
  solara: [
    "Service context and quotation needs",
    "Application architecture",
    "Document-first answerability check",
    "Lightweight Gemini quotation assistance",
    "Deployment, domain, DNS, and analytics",
  ],
  "pach-drugmart": [
    "Operational context and inventory problems",
    "Information structure and core workflows",
    "Inventory analytics and operational dashboard",
    "Transaction handling and operational visibility",
  ],
} as const;

export const projects: CaseStudyProject[] = [
  {
    slug: "sayu-cafe",
    title: "Sayu Café",
    proofAngle:
      "Responsive product discovery, café operations, and rule-based product logic.",
    summary:
      "A café web presence that connects product discovery with practical daily operations.",
    technologies: ["Next.js", "TypeScript", "Responsive web"],
    sections: [
      {
        id: "business-context",
        title: "Business context and operational friction",
        body: [
          "Sayu Café needed a clearer public web presence while keeping everyday café operations visible to the team.",
          "The work focuses on helping visitors explore products and helping staff follow routine operational signals.",
        ],
        proofState: "shipped",
      },
      {
        id: "product-discovery",
        title: "Responsive product discovery",
        body: [
          "The responsive web experience makes it easier to explore café products across screen sizes.",
          "Its scope is product discovery, with content structured for an accessible browsing experience.",
        ],
        proofState: "shipped",
      },
      {
        id: "daily-audit",
        title: "Daily audit reporting",
        body: [
          "Daily audit reporting supports a repeatable view of routine café checks.",
          "The reporting workflow keeps operational review separate from the public product experience.",
        ],
        proofState: "shipped",
      },
      {
        id: "inventory-monitoring",
        title: "Inventory monitoring and low-stock alerts",
        body: [
          "Inventory monitoring gives the team a way to notice low-stock conditions during daily work.",
          "Alerts are framed as operational awareness, without claiming unverified outcomes.",
        ],
        proofState: "shipped",
      },
      {
        id: "drink-builder",
        title: "Rule-based drink builder",
        body: [
          "The proposed builder is a deterministic product-discovery tool that evaluates choices through explicit rules.",
          "This portfolio representation uses development menu data; production rules still require approval.",
        ],
        proofState: "prototype",
      },
      {
        id: "smart-suggestions",
        title: "Future smart suggestions",
        body: [
          "Future smart suggestions are planned and inactive in this release.",
          "They remain a future concept until they are implemented and evaluated against approved ingredients and rules.",
        ],
        proofState: "planned",
      },
    ],
    media: [
      {
        src: "/images/projects/sayu-fallback.svg",
        alt: "Development fallback artwork for the Sayu Café case study.",
        width: 1440,
        height: 900,
        caption: "Development media fallback — replace with approved Sayu Café project media before launch.",
      },
    ],
  },
  {
    slug: "solara",
    title: "Solara",
    proofAngle:
      "Full-stack SaaS delivery with grounded quotation assistance and applied AI.",
    summary:
      "A quotation workflow that prioritizes approved documents before lightweight AI assistance.",
    technologies: ["Next.js", "Supabase", "Vercel", "Gemini"],
    sections: [
      {
        id: "service-context",
        title: "Service context and quotation needs",
        body: [
          "Solara supports quotation and pricing questions where grounded answers and clear guardrails matter.",
          "The service is designed to reduce repetitive administrative work without making unsupported outcome claims.",
        ],
        proofState: "shipped",
      },
      {
        id: "application-architecture",
        title: "Application architecture",
        body: [
          "The deployed application uses Next.js, Supabase, and Vercel for the documented service workflow.",
          "Its architecture keeps approved quotation knowledge central to answering customer questions.",
        ],
        proofState: "shipped",
      },
      {
        id: "document-first",
        title: "Document-first answerability check",
        body: [
          "The document-first flow checks the approved quotation document or knowledge source before any model request.",
          "When that source can answer the question, the grounded result is returned and Gemini is not called.",
        ],
        proofState: "shipped",
      },
      {
        id: "gemini-assistance",
        title: "Lightweight Gemini quotation assistance",
        body: [
          "A lightweight Gemini path is available only when additional quotation assistance is genuinely needed.",
          "It operates within quotation and pricing guardrails rather than inventing, estimating, or overriding prices.",
        ],
        proofState: "shipped",
      },
      {
        id: "deployment",
        title: "Deployment, domain, DNS, and analytics",
        body: [
          "The deployed route includes custom domain and DNS configuration alongside analytics integration.",
          "These implementation details support a maintained production service.",
        ],
        proofState: "shipped",
      },
    ],
    media: [
      {
        src: "/images/projects/solara-fallback.svg",
        alt: "Development fallback artwork for the Solara quotation workflow case study.",
        width: 1440,
        height: 900,
        caption: "Development media fallback — replace with approved Solara project media before launch.",
      },
    ],
  },
  {
    slug: "pach-drugmart",
    title: "Pach Drugmart",
    proofAngle:
      "Inventory operations, analytics, dashboard design, and transaction visibility.",
    summary:
      "An operational system focused on inventory awareness, analytics, and day-to-day transaction visibility.",
    technologies: ["Next.js", "TypeScript", "Operational analytics"],
    sections: [
      {
        id: "operational-context",
        title: "Operational context and inventory problems",
        body: [
          "Pach Drugmart needed clearer visibility into recurring inventory conditions during everyday operations.",
          "The work centers on operational awareness rather than unsupported feature claims.",
        ],
        proofState: "shipped",
      },
      {
        id: "information-structure",
        title: "Information structure and core workflows",
        body: [
          "Information is organized around practical inventory and transaction workflows.",
          "The structure helps users move between operational tasks and the information needed to support them.",
        ],
        proofState: "shipped",
      },
      {
        id: "analytics-dashboard",
        title: "Inventory analytics and operational dashboard",
        body: [
          "Inventory analytics and an operational dashboard make operational signals easier to review.",
          "The dashboard presents a focused view of inventory activity for routine decision support.",
        ],
        proofState: "shipped",
      },
      {
        id: "transactions",
        title: "Transaction handling and operational visibility",
        body: [
          "Transaction handling is paired with operational visibility so routine activity can be reviewed in context.",
          "The case study describes the operational scope without inventing numerical results.",
        ],
        proofState: "shipped",
      },
    ],
    media: [
      {
        src: "/images/projects/pach-fallback.svg",
        alt: "Development fallback artwork for the Pach Drugmart operations case study.",
        width: 1440,
        height: 900,
        caption: "Development media fallback — replace with approved Pach Drugmart project media before launch.",
      },
    ],
  },
];
