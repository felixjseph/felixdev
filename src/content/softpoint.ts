import type { CaseStudyProject } from "@/types/project";

// Project facts, outcome, and original screenshots supplied by Felix for publication.
export const softpointProject = {
  slug: "softpoint-enterprise",
  title: "Softpoint Enterprise",
  date: "2026-02",
  dateLabel: "Feb 2026",
  role: "Full Stack Developer",
  website: "https://www.softpointenterprise.com/",
  proofAngle: "A better front door. A simpler working day.",
  summary: "A full-stack SaaS platform connecting a professional web presence, customer access, and everyday business operations.",
  homepageDescription:
    "Designed and deployed a full-stack SaaS platform that unifies Softpoint’s public web presence, customer access, and repair administration, using workflow automation to reduce administrative workload by 30% while delivering the custom domain, DNS, analytics, and Gemini API integration.",
  outcome: { value: "30%", label: "less administrative work" },
  technologies: ["Next.js", "Supabase", "Vercel", "Gemini API"],
  sections: [
    {
      id: "customer-experience",
      title: "A clearer customer experience",
      body: [
        "I brought Softpoint’s services into a responsive website, giving customers a clear place to explore the business and take the next step.",
        "The customer sign-in experience extends that presence into the service platform.",
      ],
      proofState: "shipped",
    },
    {
      id: "operations",
      title: "Less repetition behind the scenes",
      body: [
        "I engineered the platform with Next.js and Supabase, bringing administrative workflows into a shared workspace. The repair dashboard makes ticket status and service activity easier to follow.",
        "Workflow automation reduced administrative workload by 30%.",
      ],
      proofState: "shipped",
    },
    {
      id: "delivery",
      title: "Built, connected, and deployed",
      body: [
        "I deployed the platform on Vercel and configured its custom domain, DNS, and analytics integration.",
        "Gemini API integration adds AI features to the platform, alongside the practical workflows that support the business day to day.",
      ],
      proofState: "shipped",
    },
  ],
  media: [
    {
      src: "/images/projects/softpoint/website.webp",
      alt: "Softpoint Enterprise website introducing its printer services with a customer event photograph.",
      width: 1080,
      height: 530,
      caption: "Website",
    },
    {
      src: "/images/projects/softpoint/client-portal.webp",
      alt: "Softpoint Enterprise client portal sign-in screen with customer number and password fields.",
      width: 862,
      height: 536,
      caption: "Client portal",
    },
    {
      src: "/images/projects/softpoint/repair-dashboard.webp",
      alt: "Softpoint Enterprise operations dashboard showing repair tickets, statuses, and service history.",
      width: 1080,
      height: 465,
      caption: "Operations",
    },
  ],
} satisfies CaseStudyProject & {
  date: string;
  dateLabel: string;
  role: string;
  website: string;
  outcome: { value: string; label: string };
};
