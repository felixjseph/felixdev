import { GearCard } from "@/components/ui/gear-card";
import { gear } from "@/lib/gear";

export function GearSection() {
  return (
    <section id="gear" className="mx-auto w-[80%] py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        <span className="text-add">{"// "}</span>04 — Gear
      </p>
      <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
        What I build on
      </h2>

      {/* A grid, not the project fan-deck: six utilitarian items are meant to
          be scanned side by side, not clicked through one at a time. */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gear.map((item) => (
          <GearCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
