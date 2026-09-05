import type { Metadata } from "next";
import { FeaturedCaseStudyPage } from "@/components/featured-case-study-page";
import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("sayu-cafe")!;

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: "/work/sayu-cafe" },
  openGraph: {
    url: "/work/sayu-cafe",
    title: `${project.title} — Felix Castañeda`,
    description: project.summary,
    images: [{ url: project.media[0].src, width: project.media[0].width, height: project.media[0].height, alt: project.media[0].alt }],
  },
};

export default function SayuCafePage() {
  return <FeaturedCaseStudyPage project={project} />;
}
