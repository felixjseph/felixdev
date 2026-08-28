import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { sayuCatalog } from "@/content/sayu-builder-data";
import { SayuBuilder } from "@/features/sayu-builder/sayu-builder";
import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("sayu-cafe")!;

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: "/work/sayu-cafe" },
  openGraph: { url: "/work/sayu-cafe", title: `${project.title} — Felix Castañeda`, description: project.summary },
};

export default function SayuCafePage() {
  return (
    <CaseStudyPage project={project}>
      <SayuBuilder catalog={sayuCatalog} />
    </CaseStudyPage>
  );
}
