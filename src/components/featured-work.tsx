import { projectPreviews } from "@/content/homepage";
import { AnalyticsLink } from "./analytics-link";

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-heading" className="mx-auto max-w-7xl px-4 py-20 lg:px-8" id="work">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Selected systems
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em]" id="work-heading">
            Featured work
          </h2>
        </div>
        <a className="font-semibold underline decoration-2 underline-offset-4" href="#contact">
          Start a project
        </a>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {projectPreviews.map((project, index) => (
          <article
            className={`project-card border-2 border-[var(--color-text)] bg-[var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-text)] ${
              project.tier === "flagship" ? "project-card--flagship lg:col-span-2 lg:row-span-2" : ""
            }`}
            data-project-slug={project.slug}
            data-project-tier={project.tier}
            key={project.slug}
          >
            <div className={project.tier === "flagship" ? "grid gap-7 md:grid-cols-[0.8fr_1.2fr]" : ""}>
              <div>
                <p className="system-label text-xs tracking-[0.12em] text-[var(--color-accent)]">
                  0{index + 1} {project.tier === "flagship" ? "· Flagship" : ""}
                </p>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em]">
                  <AnalyticsLink className="underline decoration-2 underline-offset-4" eventName="project_opened" href={`/work/${project.slug}`}>
                    {project.title}
                  </AnalyticsLink>
                </h3>
                <p className="mt-4 text-[color-mix(in_srgb,var(--color-text)_78%,transparent)]">
                  {project.summary}
                </p>
                <p className="mt-6 border-t-2 border-[var(--color-text)] pt-4 text-sm font-semibold">
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
    </section>
  );
}
