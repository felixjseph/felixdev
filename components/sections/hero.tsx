import { FadeUp } from "@/components/ui/fade-up";

export function Hero() {
  return (
    <section className="mx-auto w-[80%] py-20 md:py-28">
      <FadeUp delay={250}>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-muted animate-pulse motion-reduce:animate-none"
          />
          N° 01 — Available for work
        </p>
      </FadeUp>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr] md:items-end">
        <FadeUp delay={375}>
          <h1 className="font-display font-medium leading-display text-4xl text-ink sm:text-5xl md:text-6xl">
            I build full stack products and generative AI tools for
            MSMEs — software that ships, not slideware.
          </h1>
        </FadeUp>

        <FadeUp delay={500}>
          <div className="md:text-right">
            <p className="font-display text-4xl font-medium text-ink">10+</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
              Projects shipped
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
