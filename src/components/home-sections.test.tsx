import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
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

    expect(screen.getByRole("heading", { name: /Where work slows down/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From scattered steps to one working system/i })).toBeInTheDocument();
    expect(screen.getByText("Workflows that keep moving while you sleep.")).toBeInTheDocument();
    expect(screen.queryByText("AI Document Intelligence")).not.toBeInTheDocument();
    expect(screen.queryByText("Agentic Workflow Command Center")).not.toBeInTheDocument();
    const softpointProject = screen.getByRole("heading", { name: "Softpoint Enterprise" }).closest("article")!;
    expect(within(softpointProject).getByRole("link", { name: "Visit website" })).toHaveAttribute("href", "https://www.softpointenterprise.com/");
    expect(within(softpointProject).queryByRole("button", { name: "Website" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("#projects figcaption")).toHaveLength(0);
    expect(screen.getByText(/reduce administrative workload by 30%/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Softpoint Enterprise logo" })).toBeInTheDocument();
    expect(screen.getAllByAltText("Sayu Café logo").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/Project screenshots to follow/i)).not.toBeInTheDocument();
    const solaraProject = screen.getByRole("heading", { name: "Solara" }).closest("article")!;
    expect(within(solaraProject).getByText("Web Developer")).toBeInTheDocument();
    expect(within(solaraProject).getByRole("link", { name: "Visit website" })).toHaveAttribute("href", "https://solaraservices.vercel.app/");
    expect(within(solaraProject).queryByRole("button", { name: "Service discovery" })).not.toBeInTheDocument();
    expect(screen.getAllByAltText(/Solara (homepage|system starting points|solar assessment)/i)).toHaveLength(3);
    expect(container.querySelectorAll("#projects article [class*='featured-work__description'] > p")).toHaveLength(3);
    expect(screen.queryByText(/Attribution pending approval/i)).not.toBeInTheDocument();
    expect(screen.getAllByLabelText("5 out of 5 stars")).toHaveLength(2);
    expect(screen.getAllByText("Client testimonial")).toHaveLength(2);
    expect(screen.queryByText(/not client-submitted/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".contact-detail-icon")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Let’s build something useful." })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-contact-type-char]").length).toBeGreaterThan(20);
    expect(container.querySelector(".contact-intro p")?.children).toHaveLength(2);
    expect(screen.getByText("felixjosephcastaneda@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("San Fernando, Cebu, PH")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-Stack Web & AI Developer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Web Development Intern" })).toBeInTheDocument();
    expect(screen.getByText("Softpoint Solutions")).toBeInTheDocument();
    expect(screen.getByText("Knowles Corporation")).toBeInTheDocument();
    expect(screen.getByText(/more than 500 WordPress training-course sites/i)).toBeInTheDocument();
    expect(screen.getAllByText(/development responsibilities/i)).toHaveLength(1);
    expect(screen.getByLabelText("Core competencies")).toBeInTheDocument();
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
  });

  it("renders curated technology evidence without the old marquee", () => {
    const { container } = render(<SkillsSection />);

    expect(container.querySelectorAll(".signal-map__stages > li")).toHaveLength(4);
    expect(screen.getByText("Understand")).toBeInTheDocument();
    expect(screen.getByText("Shape")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
    expect(screen.getByText("Deliver")).toBeInTheDocument();
    expect(container.querySelector(".skill-track")).not.toBeInTheDocument();
  });

  it("provides a reduced-motion alternative for signal and project effects", () => {
    const styles = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const reducedMotion = styles.lastIndexOf("@media (prefers-reduced-motion: reduce), print");

    expect(reducedMotion).toBeGreaterThanOrEqual(0);
    expect(styles.indexOf(".signal-map__route-line", reducedMotion)).toBeGreaterThan(reducedMotion);
    expect(styles.indexOf("animation: none !important", reducedMotion)).toBeGreaterThan(reducedMotion);
  });
});
