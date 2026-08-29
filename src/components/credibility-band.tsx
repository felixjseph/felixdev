export function CredibilityBand() {
  return (
    <section
      aria-labelledby="credibility-heading"
      className="border-y border-[color-mix(in_srgb,var(--color-text)_35%,transparent)] bg-[var(--color-surface)]"
      id="credibility"
    >
      <div className="mx-auto grid max-w-[92rem] gap-8 px-4 py-10 md:py-14 sm:grid-cols-3 lg:px-10">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Proof first
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]" data-reveal id="credibility-heading">
            Built around practical outcomes.
          </h2>
        </div>
        <p className="border-l border-[color-mix(in_srgb,var(--color-text)_38%,transparent)] pl-4" data-reveal>
          Full-stack product thinking, workflow clarity, and useful AI applied where it earns its place.
        </p>
        <p className="border-l border-[color-mix(in_srgb,var(--color-text)_38%,transparent)] pl-4" data-reveal>
          Clear scope, visible progress, and systems that remain understandable after launch.
        </p>
      </div>
    </section>
  );
}
