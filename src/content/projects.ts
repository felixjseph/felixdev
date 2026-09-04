import type { CaseStudyProject } from "@/types/project";
import { softpointProject } from "./softpoint";
import { solaraProject } from "./solara";

export const requiredChapterTitles = {
  "softpoint-enterprise": softpointProject.sections.map((section) => section.title),
  "sayu-cafe": [
    "Business context and operational friction",
    "Responsive product discovery",
    "Daily audit reporting",
    "Inventory monitoring and low-stock alerts",
    "Rule-based drink builder",
    "Future smart suggestions",
  ],
  solara: solaraProject.sections.map((section) => section.title),
  "pach-drugmart": [
    "Operational context and inventory problems",
    "Information structure and core workflows",
    "Inventory analytics and operational dashboard",
    "Transaction handling and operational visibility",
  ],
} as const;

export const projects: CaseStudyProject[] = [
  softpointProject,
  {
    slug: "sayu-cafe",
    title: "Sayu Café",
    proofAngle:
      "Responsive product discovery, café operations, and rule-based product logic.",
    summary:
      "A café web presence that connects product discovery with practical daily operations.",
    homepageDescription: [
      "A café web presence that connects clear product discovery with practical daily operations.",
      "The responsive experience supports accessible product browsing, while the broader project covers daily audit reporting, inventory awareness, and an explicit rule-based drink builder.",
    ],
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
  solaraProject,
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
