import type { Metadata } from "next";
import { FeaturedCaseStudyPage } from "@/components/featured-case-study-page";
import { softpointProject as project } from "@/content/softpoint";

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: `/work/${project.slug}` },
  openGraph: {
    url: `/work/${project.slug}`,
    title: `${project.title} — Felix Castañeda`,
    description: project.summary,
    images: [{ url: project.media[0].src, width: 1080, height: 530, alt: project.media[0].alt }],
  },
};

export default function SoftpointEnterprisePage() {
  return <FeaturedCaseStudyPage project={project} />;
}
