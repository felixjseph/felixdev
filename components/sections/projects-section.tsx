import { AnimatedProjectStack } from "@/components/ui/animated-project-stack";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="work" className="mx-auto w-[80%] py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 02 — Projects
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium leading-display text-ink sm:text-4xl">
        Selected work
      </h2>

      <div className="mt-12">
        <AnimatedProjectStack projects={projects} />
      </div>
    </section>
  );
}
