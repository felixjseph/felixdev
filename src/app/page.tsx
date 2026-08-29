import { AboutSection } from "@/components/about-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CredibilityBand } from "@/components/credibility-band";
import { FaqSection } from "@/components/faq-section";
import { FeaturedWork } from "@/components/featured-work";
import { HumanOrbit } from "@/components/human-orbit";
import { InquiryForm } from "@/components/inquiry-form";
import { OrbitAssembly } from "@/components/orbit-assembly";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { RevampMotion } from "@/components/revamp-motion";
import { siteConfig } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <OrbitAssembly />
      <SiteHeader />
      <RevampMotion />
      <main className="w-full max-w-full overflow-x-hidden">
        <HumanOrbit />
        <CredibilityBand />
        <FeaturedWork />
        <CapabilitiesSection />
        <AboutSection />
        <section aria-label="Testimonials" hidden id="testimonials">
          <TestimonialsSection />
        </section>
        <FaqSection />
        <section
          aria-labelledby="contact-heading"
          className="bg-[var(--color-accent)] px-4 py-32 text-[var(--color-accent-foreground)] md:py-48 lg:px-8"
          data-accent-surface="primary"
          id="contact"
        >
          <div className="mx-auto max-w-7xl">
            <div>
              <p className="system-label text-xs uppercase tracking-[0.16em]">Inquiry</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-[-0.06em] md:text-6xl" data-reveal id="contact-heading">
                Have a system worth improving?
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8" data-reveal>
                Share the workflow, product, or manual process you want to make clearer.
              </p>
            </div>
            <InquiryForm />
            {siteConfig.publicContact.email || siteConfig.publicContact.linkedIn ? (
              <nav aria-label="Public contact options" className="mt-6 flex flex-wrap gap-3">
                {siteConfig.publicContact.email ? (
                  <a
                    className="border-2 border-[var(--color-accent-foreground)] px-5 py-3 font-semibold"
                    href={`mailto:${siteConfig.publicContact.email}`}
                  >
                    Email Felix
                  </a>
                ) : null}
                {siteConfig.publicContact.linkedIn ? (
                  <a
                    className="border-2 border-[var(--color-accent-foreground)] px-5 py-3 font-semibold"
                    href={siteConfig.publicContact.linkedIn}
                  >
                    LinkedIn
                  </a>
                ) : null}
              </nav>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
