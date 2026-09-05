import type { Metadata } from "next";
import { FeaturedCaseStudyPage } from "@/components/featured-case-study-page";
import { solaraProject as project } from "@/content/solara";

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: "/work/solara" },
  openGraph: {
    url: "/work/solara",
    title: `${project.title} — Felix Castañeda`,
    description: project.summary,
    images: [{ url: project.media[0].src, width: project.media[0].width, height: project.media[0].height, alt: project.media[0].alt }],
  },
};

export default function SolaraPage() {
  return <FeaturedCaseStudyPage background="#fff7ec" project={project} />;
}
