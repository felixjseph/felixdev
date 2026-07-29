import type { Gear } from "@/lib/gear";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Deliberately mirrors ProjectCard's visual language — category pill, bordered
 * monogram, image well, description, rounded spec tags — so gear reads as the
 * same family of object. Kept as its own component rather than reusing
 * ProjectCard because the data shapes differ and ProjectCard is settled.
 */
export function GearCard({ item }: { item: Gear }) {
  return (
    <div className="flex h-full flex-col border border-border bg-bg p-6">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-bg">
        <span aria-hidden>‹</span>
        {item.category}
        <span aria-hidden>›</span>
      </span>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border font-display text-base text-ink">
          {initials(item.name)}
        </div>
        <h3 className="font-display text-base font-bold tracking-tight text-ink">
          {item.name}
        </h3>
      </div>

      <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden border border-border bg-paper">
        <span className="font-display text-sm text-muted">{item.name}</span>
      </div>

      <p className="mt-4 line-clamp-2 font-body text-sm text-ink">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.specs.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
          >
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
}
