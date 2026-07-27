import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 02 — Selected work
      </p>
      <h1 className="mt-4 font-display font-medium leading-display text-4xl text-ink sm:text-5xl">
        Selected Work
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
