import { capabilities } from "@/content/homepage";

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-heading" className="bg-[var(--color-surface)] px-4 py-32 md:py-48 lg:px-10" id="capabilities">
      <div className="mx-auto max-w-[92rem]">
        <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]" data-reveal>Capabilities</p>
        <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-[-0.06em] md:text-6xl" data-reveal id="capabilities-heading">
          Build the product. Improve the operation.
        </h2>
        <ol className="capability-grid mt-12">
          {capabilities.map((capability, index) => (
            <li className={`capability-card ${index === 0 || index === 5 ? "capability-card--wide" : ""}`} data-reveal key={capability.title}>
              <div>
                <p className="system-label text-xs text-[var(--color-accent)]">{capability.title}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{capability.description}</h3>
              </div>
              <p className="mt-5 text-sm font-semibold text-[color-mix(in_srgb,var(--color-text)_72%,transparent)]">{capability.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
