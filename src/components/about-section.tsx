export function AboutSection() {
  return (
    <>
      <section aria-labelledby="about-heading" className="mx-auto max-w-7xl px-4 py-20 lg:px-8" id="about">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Approach</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em]" id="about-heading">
              Calm systems for complex work.
            </h2>
          </div>
          <div className="max-w-2xl text-lg leading-8">
            <p>
              I turn operational friction into focused software: a clear user experience on the surface, and dependable workflows underneath.
            </p>
            <p className="mt-5">
              The goal is not more technology. It is a useful system your team can understand, use, and keep improving.
            </p>
          </div>
        </div>
      </section>
      <section aria-labelledby="contact-heading" className="bg-[var(--color-accent)] px-4 py-16 text-white lg:px-8" id="contact">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
          <div>
            <p className="system-label text-xs uppercase tracking-[0.16em] text-white/80">Inquiry</p>
            <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.05em]" id="contact-heading">
              Have a system worth improving?
            </h2>
          </div>
          <a className="border-2 border-white bg-[var(--color-surface)] px-5 py-3 font-semibold text-[var(--color-text)] shadow-[4px_4px_0_var(--color-text)]" href="mailto:felixjosephcastaneda@gmail.com">
            Start a conversation
          </a>
        </div>
      </section>
    </>
  );
}
