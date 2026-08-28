import Link from "next/link";
import type { CaseStudyProject } from "@/types/project";
import { ProofStateBadge } from "./proof-state-badge";

export function CaseStudyHero({ project }: { project: CaseStudyProject }) {
  const primaryProofState = project.sections.find((section) => section.proofState === "shipped")?.proofState;

  return (
    <header className="border-b-2 border-[var(--color-text)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 lg:px-8">
        <Link className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] underline decoration-2 underline-offset-4" href="/#work">
          Back to portfolio
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">Case study</p>
          {primaryProofState ? <ProofStateBadge state={primaryProofState} /> : null}
        </div>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-xl font-medium">{project.proofAngle}</p>
        <p className="mt-4 max-w-3xl text-[color-mix(in_srgb,var(--color-text)_78%,transparent)]">{project.summary}</p>
        <ul aria-label={`${project.title} technologies`} className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li className="border-2 border-[var(--color-text)] px-3 py-1 font-mono text-xs" key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
