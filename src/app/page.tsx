import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SignalHero } from "@/components/signal-hero";
import { SkillsSection } from "@/components/skills-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <SignalHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
