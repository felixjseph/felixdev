import { ProofStateBadge } from "./proof-state-badge";

export function SolaraQuotationFlow() {
  return (
    <section aria-labelledby="solara-quotation-flow-heading" className="border-b-2 border-[var(--color-text)] bg-[var(--color-surface)] py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">Quotation routing</p>
          <ProofStateBadge state="shipped" />
        </div>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em]" id="solara-quotation-flow-heading">Grounded quotation assistance</h2>
        <p className="mt-4 max-w-3xl text-[color-mix(in_srgb,var(--color-text)_80%,transparent)]">
          Solara follows a document-first path so approved quotation information is checked before any additional assistance is considered.
        </p>

        <ol aria-label="Solara quotation routing" className="mt-8 grid gap-4 md:grid-cols-2">
          <li className="border-2 border-[var(--color-text)] p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">Step 1</p>
            <p className="mt-2 font-semibold">Receive a quotation or pricing question.</p>
          </li>
          <li className="border-2 border-[var(--color-text)] p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">Step 2</p>
            <p className="mt-2 font-semibold">Search the approved quotation document</p>
          </li>
          <li className="border-2 border-[var(--color-text)] p-5 md:col-span-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">Step 3 · Decision</p>
            <h3 className="mt-2 text-xl font-semibold">Can the approved document answer?</h3>
            <p className="mt-2 text-[color-mix(in_srgb,var(--color-text)_80%,transparent)]">The route stays grounded in the approved document whenever it provides the needed answer.</p>
          </li>
          <li className="border-2 border-[var(--color-text)] bg-[var(--color-support)] p-5 text-[var(--color-support-foreground)]">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em]">Step 4</p>
            <h3 className="mt-2 text-xl font-semibold">Document answer</h3>
            <p className="mt-2 font-semibold">Answer from the document without calling Gemini</p>
          </li>
          <li className="border-2 border-[var(--color-text)] p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">Step 5</p>
            <h3 className="mt-2 text-xl font-semibold">Use lightweight Gemini quotation assistance</h3>
            <p className="mt-2 font-semibold">Gemini assistance stays within pricing guardrails</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
