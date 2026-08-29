import { faqItems } from "@/content/homepage";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-[92rem] px-4 py-32 md:py-48 lg:px-10" id="faq">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]" data-reveal>Common questions</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.06em] md:text-6xl" data-reveal id="faq-heading">
            Before we build.
          </h2>
        </div>
        <div className="border-t-2 border-[var(--color-text)]">
          {faqItems.map((item) => (
            <details className="accordion-row" key={item.question}>
              <summary className="cursor-pointer pr-8 font-semibold">{item.question}</summary>
              <p className="mt-4 max-w-2xl">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
