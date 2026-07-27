import { GearItem } from "@/components/ui/gear-item";
import { gear, type Gear } from "@/lib/gear";

function groupByCategory(items: Gear[]) {
  return items.reduce<Record<string, Gear[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}

export default function GearPage() {
  const grouped = groupByCategory(gear);

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 04 — Gear
      </p>
      <h1 className="mt-4 font-display font-medium leading-display text-4xl text-ink sm:text-5xl">
        Gear
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
              {category}
            </p>
            <ul className="mt-3">
              {items.map((item) => (
                <GearItem key={item.name} name={item.name} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
