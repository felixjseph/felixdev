export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="mx-auto max-w-[92rem] px-4 py-32 md:py-48 lg:px-10" id="about">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]" data-reveal>Approach</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em] md:text-6xl" data-reveal id="about-heading">
            Calm systems for complex work.
          </h2>
        </div>
        <div className="max-w-2xl text-lg leading-8" data-scrub-line>
          <p>
            <span data-scrub-word>I turn operational friction into focused software:</span>{" "}
            <span data-scrub-word>a clear user experience on the surface, and dependable workflows underneath.</span>
          </p>
          <p className="mt-5">
            The goal is not more technology. It is a useful system your team can understand, use, and keep improving.
          </p>
        </div>
      </div>
    </section>
  );
}
