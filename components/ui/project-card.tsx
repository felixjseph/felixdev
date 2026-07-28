import type { Project } from "@/lib/projects";

function initials(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col justify-between border border-border bg-bg p-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-bg">
          <span aria-hidden>‹</span>
          {project.category}
          <span aria-hidden>›</span>
        </span>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border font-display text-base text-ink">
            {initials(project.title)}
          </div>
          <h2 className="font-display text-xl font-medium text-ink">
            {project.title}
          </h2>
        </div>

        <p className="mt-4 line-clamp-3 font-body text-ink">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-4 inline-flex w-fit font-mono text-[11px] uppercase tracking-wide text-ink"
          >
            View project →
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </a>
        )}
      </div>
    </div>
  );
}
