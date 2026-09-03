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

    expect(screen.getByRole("heading", { name: /Technology should move work forward/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A broad stack/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Placeholder target/i)).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Softpoint Enterprise" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Visit website" })).toHaveAttribute("href", "https://www.softpointenterprise.com/");
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText(/Business name pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Attribution pending approval/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/5 out of 5 stars, draft rating/i)).toBeInTheDocument();
    expect(container.querySelectorAll(".contact-detail-icon")).toHaveLength(3);
    expect(screen.getByText("felixjosephcastaneda@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("San Fernando, Cebu, PH")).toBeInTheDocument();
    expect(screen.getByText(/Verified employers and role dates/i)).toBeInTheDocument();
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
  });

  it("renders official technology marks in one continuous duplicated lane", () => {
    const { container } = render(<SkillsSection />);

    expect(container.querySelectorAll(".skill-lane")).toHaveLength(1);
    expect(container.querySelectorAll(".skill-set")).toHaveLength(2);
    expect(screen.getAllByLabelText("TypeScript").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByLabelText("Google Gemini").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByLabelText("Zapier").length).toBeGreaterThanOrEqual(2);
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
