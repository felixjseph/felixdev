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
import { siteConfig } from "@/content/site";

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
        <section
          aria-labelledby="contact-heading"
          className="bg-[var(--color-accent)] px-4 py-16 text-[var(--color-accent-foreground)] lg:px-8"
          data-accent-surface="primary"
          id="contact"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
            <div>
              <p className="system-label text-xs uppercase tracking-[0.16em]">Inquiry</p>
              <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.05em]" id="contact-heading">
                Have a system worth improving?
              </h2>
              <p className="mt-4 max-w-xl">
                Share the workflow, product, or manual process you want to make clearer.
              </p>
            </div>
            {siteConfig.publicContact.email || siteConfig.publicContact.linkedIn ? (
              <nav aria-label="Public contact options" className="flex flex-wrap gap-3">
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
            ) : (
              <div className="max-w-sm border-2 border-[var(--color-accent-foreground)] p-5">
                <p className="font-semibold">Start a project</p>
                <p className="mt-2 text-sm">The project inquiry form is coming in the launch build.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
