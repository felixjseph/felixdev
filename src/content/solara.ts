import type { CaseStudyProject } from "@/types/project";

// Project role, scope, stack, live URL, and screenshots supplied by Felix for publication.
export const solaraProject = {
  slug: "solara",
  title: "Solara",
  date: "2026-06",
  dateLabel: "Jun 2026",
  role: "Web Developer",
  website: "https://solaraservices.vercel.app/",
  proofAngle: "Responsive solar service discovery with a clear path to inquiry.",
  summary:
    "A responsive solar energy platform presenting residential and commercial solutions through a clear journey from service discovery to customer inquiry.",
  technologies: ["Next.js", "React", "TypeScript", "Vercel"],
  sections: [
    {
      id: "client-context",
      title: "Client context and service discovery",
      body: [
        "Solara needed a clear web presence for customers exploring residential and commercial solar energy solutions.",
        "The experience introduces the service offer in straightforward language and guides prospective customers toward an informed next step.",
      ],
      proofState: "shipped",
    },
    {
      id: "solution-presentation",
      title: "Residential and commercial solutions",
      body: [
        "The interface organizes solar services, system types, and practical starting points into a focused discovery journey.",
        "Responsive layouts keep the hierarchy readable across desktop and mobile devices without losing the detail customers need.",
      ],
      proofState: "shipped",
    },
    {
      id: "component-architecture",
      title: "Reusable responsive architecture",
      body: [
        "I developed the platform with Next.js, React, and TypeScript using reusable components for repeated service, package, navigation, and action patterns.",
        "That structure keeps presentation consistent while making future content and interface updates easier to manage.",
      ],
      proofState: "shipped",
    },
    {
      id: "inquiry-path",
      title: "A clear path from interest to inquiry",
      body: [
        "Calls to action connect service discovery to a dedicated assessment form designed around the information needed for an initial conversation.",
        "The flow gives prospective customers a direct route from understanding the offer to requesting a solar assessment.",
      ],
      proofState: "shipped",
    },
    {
      id: "delivery",
      title: "Production delivery on Vercel",
      body: [
        "The responsive application is deployed on Vercel and available through Solara’s live service website.",
        "The delivered platform provides a production-ready foundation for presenting services and receiving customer inquiries.",
      ],
      proofState: "shipped",
    },
  ],
  media: [
    {
      src: "/images/projects/solara/discovery.png",
      alt: "Solara homepage presenting reliable solar solutions for homes and businesses in Cebu.",
      width: 1900,
      height: 947,
      caption: "Service discovery",
    },
    {
      src: "/images/projects/solara/systems.png",
      alt: "Solara system starting points showing three, five, and ten kilowatt solar configurations.",
      width: 1901,
      height: 948,
      caption: "System starting points",
    },
    {
      src: "/images/projects/solara/inquiry.png",
      alt: "Solara solar assessment inquiry form for prospective customers.",
      width: 1896,
      height: 946,
      caption: "Assessment inquiry",
    },
  ],
} satisfies CaseStudyProject & { date: string; dateLabel: string };
