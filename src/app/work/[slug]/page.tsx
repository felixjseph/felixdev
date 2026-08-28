import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudyNavigation } from "@/components/case-study/case-study-navigation";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ProjectGallery } from "@/components/case-study/project-gallery";
import { getNextProject, getProjectBySlug, getProjectSlugs } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return project ? { title: `${project.title} — Felix Castañeda`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <main>
      <CaseStudyHero project={project} />
      <CaseStudyNavigation nextProject={nextProject} sections={project.sections} />
      {project.sections.map((section) => <CaseStudySection key={section.id} section={section} />)}
      <ProjectGallery media={project.media} projectTitle={project.title} />
      {/* Project-specific proof modules are intentionally added by later tasks. */}
    </main>
  );
}
