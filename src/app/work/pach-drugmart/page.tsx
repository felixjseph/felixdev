import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { PachDashboardPreview } from "@/components/case-study/pach-dashboard-preview";
import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("pach-drugmart")!;

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: "/work/pach-drugmart" },
  openGraph: { url: "/work/pach-drugmart", title: `${project.title} — Felix Castañeda`, description: project.summary },
};

export default function PachDrugmartPage() {
  return (
    <CaseStudyPage project={project}>
      <PachDashboardPreview />
    </CaseStudyPage>
  );
}
