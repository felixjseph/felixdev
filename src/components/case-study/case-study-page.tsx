import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getNextProject } from "@/lib/projects";
import type { CaseStudyProject } from "@/types/project";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyNavigation } from "./case-study-navigation";
import { CaseStudySection } from "./case-study-section";
import { ProjectGallery } from "./project-gallery";

type CaseStudyPageProps = {
  children?: ReactNode;
  project: CaseStudyProject;
};

export function CaseStudyPage({ children, project }: CaseStudyPageProps) {
  const nextProject = getNextProject(project.slug);

  return (
    <>
      <SiteHeader linkToHomepage />
      <main>
        <CaseStudyHero project={project} />
        <CaseStudyNavigation nextProject={nextProject} sections={project.sections} />
        {project.sections.map((section) => (
          <CaseStudySection key={section.id} section={section} />
        ))}
        <ProjectGallery media={project.media} projectTitle={project.title} />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
