import type { CaseStudyProject, ProjectSection } from "@/types/project";

type CaseStudyNavigationProps = {
  sections: ProjectSection[];
  nextProject: CaseStudyProject;
};

export function CaseStudyNavigation({ sections, nextProject }: CaseStudyNavigationProps) {
  return (
    <nav aria-label="Case study chapters" className="border-b-2 border-[var(--color-text)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Chapters</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a className="font-semibold underline decoration-2 underline-offset-4" href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
        <a className="mt-6 inline-block border-2 border-[var(--color-text)] bg-[var(--color-accent)] px-4 py-2 font-semibold text-[var(--color-accent-foreground)] shadow-[4px_4px_0_var(--color-text)]" data-accent-surface="primary" href={`/work/${nextProject.slug}`}>
          Next project: {nextProject.title}
        </a>
      </div>
    </nav>
  );
}
