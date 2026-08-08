import Image from "next/image";
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

      {/* 4:3, not ProjectCard's 16:9 — the product shots are exported 4:3, so
          matching the well to them means they fill it edge to edge with no
          letterbox and no crop. object-contain (not cover) because each shot is
          centered with deliberate padding; cropping to a wider box would clip
          the square mouse shot badly. */}
      <div className="relative mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden border border-border bg-paper">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain [filter:var(--gear-shot-filter)]"
          />
        ) : (
          <span className="font-display text-sm text-muted">{item.name}</span>
        )}
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
