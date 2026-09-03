import type { ProjectSection } from "@/types/project";
import { ProofStateBadge } from "./proof-state-badge";

export function CaseStudySection({ section }: { section: ProjectSection }) {
  const headingId = `${section.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="border-b-2 border-[var(--color-text)] py-10 sm:py-14" id={section.id}>
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em]" data-reveal="left" id={headingId}>{section.title}</h2>
          {section.proofState ? <ProofStateBadge state={section.proofState} /> : null}
        </div>
        <div className="mt-5 max-w-3xl space-y-4 text-[color-mix(in_srgb,var(--color-text)_80%,transparent)]">
          {section.body.map((paragraph) => <p data-reveal data-reveal-delay="60" key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
