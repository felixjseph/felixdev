import Image from "next/image";
import { FadeUp } from "@/components/ui/fade-up";
import { RotatingTagline } from "@/components/ui/rotating-tagline";
import { primaryContactLinks } from "@/lib/contact";

// Falls back to an abstract placeholder mark if unset.
const PORTRAIT_SRC = "/felix-portrait.png";

const TAGLINES = [
  "Hi! I'm Felix — a full-stack software engineer.",
  "Building the digital tools of tomorrow, today.",
  "Software that matters. Code that works. Systems that scale.",
];

export function Hero() {
  return (
    <section id="top" className="mx-auto w-[80%] py-20 md:py-28">
      <div className="border border-border">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-2 font-mono text-[11px] text-muted">
            ~/felix/hero.tsx
          </span>
        </div>

        <div className="p-6 md:p-10 lg:p-14">
          <FadeUp delay={0}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[13px] font-medium text-muted">
                felix@cebu:~$
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-add animate-pulse motion-reduce:animate-none"
                />
                available for work
              </span>
            </div>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-[1.6fr_1fr] md:items-center">
            <div>
              <FadeUp delay={125}>
                <p className="font-mono text-[13px] font-medium text-muted">
                  <span className="text-add">$</span> whoami
                </p>
              </FadeUp>

              <FadeUp delay={250}>
                <h1 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
                  <RotatingTagline taglines={TAGLINES} />
                </h1>
              </FadeUp>

              <FadeUp delay={375}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {primaryContactLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="group relative inline-flex w-fit items-center gap-1.5 font-mono text-[12px] uppercase tracking-wide text-ink"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      >
                        ↗
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                      />
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={500}>
              <div className="flex w-full flex-col md:ml-auto md:max-w-[280px]">
                <div className="border border-border p-3">
                  <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-wide text-muted">
                    felix.png
                  </p>
                  {/* bg-paper, not bg-bg: the ink drawing keeps its paper
                      ground in dark mode instead of being inverted. */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                    {PORTRAIT_SRC ? (
                      <Image
                        src={PORTRAIT_SRC}
                        alt="Felix Castañeda"
                        fill
                        sizes="(min-width: 768px) 33vw, 90vw"
                        // The source PNG has transparent padding baked around
                        // the figure, so it floats with a visible gutter at
                        // 1:1. Scaling from the top fills the frame edge to
                        // edge and crops the surplus off the shirt, not the head.
                        className="scale-[1.14] object-contain object-top"
                        priority
                      />
                    ) : (
                      <div className="relative h-full w-full" aria-hidden>
                        <div className="absolute left-1/2 top-[20%] h-[32%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
                        <div className="absolute bottom-[-8%] left-1/2 h-[48%] w-[80%] -translate-x-1/2 bg-ink [clip-path:polygon(28%_0%,72%_0%,100%_100%,0%_100%)]" />
                      </div>
                    )}
                  </div>

                  {/* File-inspector footer — real metadata for the asset above. */}
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                    <span>1080×1440</span>
                    <span>PNG</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
