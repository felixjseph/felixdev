import type { ExperienceEntry } from "@/lib/experience";

export function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  const { role, company, year } = entry;

  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-5 first:border-t">
      <div className="flex items-center gap-6">
        <span className="w-12 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {year}
        </span>
        <p className="font-display text-lg font-medium text-ink">{role}</p>
      </div>
      <p className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
        {company}
      </p>
    </div>
  );
}
