import { faqItems } from "@/content/homepage";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-7xl px-4 py-20 lg:px-8" id="faq">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Common questions</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em]" id="faq-heading">
            Before we build.
          </h2>
        </div>
        <div className="border-t-2 border-[var(--color-text)]">
          {faqItems.map((item) => (
            <details className="border-b-2 border-[var(--color-text)] py-5" key={item.question}>
              <summary className="cursor-pointer pr-8 font-semibold">{item.question}</summary>
              <p className="mt-4 max-w-2xl">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
