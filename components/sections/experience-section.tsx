import { ExperienceRow } from "@/components/ui/experience-row";
import { experience } from "@/lib/experience";
import { techStack } from "@/lib/tech-stack";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto w-[80%] py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 03 — Experience
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium leading-display text-ink sm:text-4xl">
        Where I&apos;ve worked
      </h2>

      <div className="mt-12">
        {experience.map((entry, index) => (
          <ExperienceRow key={`${entry.company}-${entry.year}-${index}`} entry={entry} />
        ))}
      </div>

      <div className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          Tech stack
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {techStack.map((group) => (
            <div key={group.category}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                {group.category}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="font-body text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
