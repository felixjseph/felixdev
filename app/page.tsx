import { Hero } from "@/components/sections/hero";
import { BlogSection } from "@/components/sections/blog-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificationsSection } from "@/components/sections/certifications-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <BlogSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
    </main>
  );
}
