import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";
import { TestimonialsSection } from "./testimonials-section";

describe("endgame portfolio sections", () => {
  it("renders the requested section narratives without inventing private facts", () => {
    const { container } = render(
      <>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ExperienceSection />
        <ContactSection />
      </>,
    );

    expect(screen.getByRole("heading", { name: /Technology matters/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A broad stack/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Placeholder target/i)).toHaveLength(3);
    expect(screen.getByText(/publication approval pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified employers, role dates/i)).toBeInTheDocument();
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
  });

  it("renders official technology marks only inside continuous duplicated lanes", () => {
    const { container } = render(<SkillsSection />);

    expect(container.querySelectorAll(".skill-lane")).toHaveLength(3);
    expect(container.querySelectorAll(".skill-set")).toHaveLength(6);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Google Gemini").length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll(".skill-logo").length).toBeGreaterThan(20);
  });

  it("provides a reduced-motion alternative for marquee and project effects", () => {
    const styles = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const reducedMotion = styles.indexOf("@media (prefers-reduced-motion: reduce)");

    expect(reducedMotion).toBeGreaterThanOrEqual(0);
    expect(styles.indexOf(".skill-track,.skill-lane[data-direction=\"right\"] .skill-track", reducedMotion)).toBeGreaterThan(reducedMotion);
    expect(styles.indexOf(".project-ui,.project-feature:hover .project-ui", reducedMotion)).toBeGreaterThan(reducedMotion);
  });
});
