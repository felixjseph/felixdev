import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { SolaraQuotationFlow } from "@/components/case-study/solara-quotation-flow";
import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("solara")!;

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
};

export default function SolaraPage() {
  return (
    <CaseStudyPage project={project}>
      <SolaraQuotationFlow />
    </CaseStudyPage>
  );
}
