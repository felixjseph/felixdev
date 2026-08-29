import { projectPreviews } from "@/content/homepage";
import { AnalyticsLink } from "./analytics-link";

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-heading" className="mx-auto max-w-[92rem] px-4 py-32 md:py-48 lg:px-10" id="work">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]" data-reveal>
            Selected systems
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em] md:text-6xl" data-reveal id="work-heading">
            Featured work
          </h2>
        </div>
        <a className="font-semibold underline decoration-2 underline-offset-4" href="#contact">
          Start a project
        </a>
      </div>

      <div className="work-stage mt-12" data-work-stage>
        <aside className="work-stage__rail" data-work-rail data-reveal>
          <p>Proof is the interface between a good idea and a system people can trust.</p>
          <span className="system-label mt-8 block text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Three documented builds
          </span>
        </aside>
        <div className="work-grid">
          {projectPreviews.map((project) => (
            <article
              className={`project-card border border-[color-mix(in_srgb,var(--color-text)_45%,transparent)] bg-[var(--color-surface)] p-6 shadow-[8px_8px_0_color-mix(in_srgb,var(--color-text)_88%,transparent)] ${
                project.tier === "flagship" ? "project-card--flagship" : ""
              }`}
              data-project-slug={project.slug}
              data-project-tier={project.tier}
              data-work-card
              key={project.slug}
            >
              <div className={project.tier === "flagship" ? "grid gap-7 md:grid-cols-[0.8fr_1.2fr]" : ""}>
                <div>
                  <p className="system-label text-xs tracking-[0.12em] text-[var(--color-accent)]">
                    {project.tier === "flagship" ? "Flagship build" : "Supporting build"}
                  </p>
                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em]">
                    <AnalyticsLink className="underline decoration-2 underline-offset-4" eventName="project_opened" href={`/work/${project.slug}`}>
                      {project.title}
                    </AnalyticsLink>
                  </h3>
                  <p className="mt-4 text-[color-mix(in_srgb,var(--color-text)_78%,transparent)]">
                    {project.summary}
                  </p>
                  <p className="mt-6 border-t border-[color-mix(in_srgb,var(--color-text)_35%,transparent)] pt-4 text-sm font-semibold">
                    {project.proof}
                  </p>
                </div>
                {project.tier === "flagship" ? (
                  <div aria-label="Sayu Café workflow preview" className="sayu-workflow-preview">
                    <p className="sayu-workflow-origin">Product discovery</p>
                    <ol>
                      <li>Rule-based builder</li>
                      <li>Daily audit reports</li>
                      <li>Low-stock alerts</li>
                    </ol>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
