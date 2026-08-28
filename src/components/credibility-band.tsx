export function CredibilityBand() {
  return (
    <section
      aria-labelledby="credibility-heading"
      className="border-y-2 border-[var(--color-text)] bg-[var(--color-surface)]"
      id="credibility"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 lg:px-8">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Proof first
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]" id="credibility-heading">
            Built around practical outcomes.
          </h2>
        </div>
        <p className="border-l-2 border-[var(--color-text)] pl-4">
          Full-stack product thinking, workflow clarity, and useful AI applied where it earns its place.
        </p>
        <p className="border-l-2 border-[var(--color-text)] pl-4">
          Clear scope, visible progress, and systems that remain understandable after launch.
        </p>
      </div>
    </section>
  );
}
