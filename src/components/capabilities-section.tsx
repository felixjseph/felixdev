import { capabilities } from "@/content/homepage";

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-heading" className="bg-[var(--color-surface)] px-4 py-20 lg:px-8" id="capabilities">
      <div className="mx-auto max-w-7xl">
        <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Capabilities</p>
        <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.05em]" id="capabilities-heading">
          Build the product. Improve the operation.
        </h2>
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <li className="border-2 border-[var(--color-text)] p-6" key={capability.title}>
              <p className="system-label text-xs text-[var(--color-accent)]">0{index + 1}</p>
              <h3 className="mt-6 text-xl font-semibold">{capability.title}</h3>
              <p className="mt-3">{capability.description}</p>
              <p className="mt-5 text-sm font-semibold">{capability.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
