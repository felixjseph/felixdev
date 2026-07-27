import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      <div className="flex aspect-video items-center justify-center border border-border bg-bg">
        <span className="font-display text-2xl text-muted">
          {project.title}
        </span>
      </div>
      <h2 className="mt-4 font-display text-xl font-medium text-ink">
        {project.title}
      </h2>
      <p className="mt-2 font-body text-ink">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
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
            className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </a>
      )}
    </div>
  );
}
