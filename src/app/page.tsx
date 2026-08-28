import { AboutSection } from "@/components/about-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CredibilityBand } from "@/components/credibility-band";
import { FaqSection } from "@/components/faq-section";
import { FeaturedWork } from "@/components/featured-work";
import { HumanOrbit } from "@/components/human-orbit";
import { OrbitAssembly } from "@/components/orbit-assembly";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <OrbitAssembly />
      <SiteHeader />
      <main>
        <HumanOrbit />
        <CredibilityBand />
        <FeaturedWork />
        <CapabilitiesSection />
        <AboutSection />
        <section aria-label="Testimonials" hidden id="testimonials">
          <TestimonialsSection />
        </section>
        <FaqSection />
        <section aria-labelledby="contact-heading" className="bg-[var(--color-accent)] px-4 py-16 text-white lg:px-8" id="contact">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
            <div>
              <p className="system-label text-xs uppercase tracking-[0.16em] text-white/80">Inquiry</p>
              <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.05em]" id="contact-heading">
                Have a system worth improving?
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                Share the workflow, product, or manual process you want to make clearer.
              </p>
            </div>
            <a className="border-2 border-white bg-[var(--color-surface)] px-5 py-3 font-semibold text-[var(--color-text)] shadow-[4px_4px_0_var(--color-text)]" href="mailto:felixjosephcastaneda@gmail.com">
              Start a conversation
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
