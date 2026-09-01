const dashboardViews = [
  {
    title: "Inventory analytics",
    label: "Low",
    detail: "A qualitative lane for reviewing inventory conditions.",
  },
  {
    title: "Operational dashboard",
    label: "Stable",
    detail: "A shared view for keeping operational activity visible.",
  },
  {
    title: "Transaction visibility",
    label: "Review",
    detail: "A focused lane for reviewing transaction activity.",
  },
] as const;

export function PachDashboardPreview() {
  return (
    <section aria-labelledby="pach-dashboard-preview-heading" className="border-b-2 border-[var(--color-text)] bg-[var(--color-surface)] py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">Operational views</p>
        <h2 id="pach-dashboard-preview-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em]">Inventory and operations visibility</h2>
        <figure aria-label="Pach Drugmart operational dashboard preview" className="mt-8 border-2 border-[var(--color-text)] bg-[var(--color-bg)] p-4 shadow-[6px_6px_0_var(--color-text)] sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {dashboardViews.map((view) => (
              <article key={view.title} className="border-2 border-[var(--color-text)] bg-[var(--color-surface)] p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">Operational lane</p>
                <h3 className="mt-3 text-xl font-semibold">{view.title}</h3>
                <div aria-label={`${view.title} qualitative status`} className="mt-6 border-y-2 border-[var(--color-text)] py-3">
                  <span className="font-mono text-sm font-bold uppercase tracking-[0.1em]">{view.label}</span>
                </div>
                <p className="mt-4 text-[color-mix(in_srgb,var(--color-text)_80%,transparent)]">{view.detail}</p>
              </article>
            ))}
          </div>
          <figcaption className="mt-5 font-mono text-sm font-semibold">
            This visualization represents the operational views described in the case study.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
