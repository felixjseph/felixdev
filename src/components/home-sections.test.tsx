import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./about-section";
import { AboutMeSection } from "./about-me-section";
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
        <AboutMeSection />
        <ContactSection />
      </>,
    );

    expect(screen.getByRole("heading", { name: /Where work slows down/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Daily drivers. Built for the work./i })).toBeInTheDocument();
    expect(screen.getByText(/AI-native tools for building and automating useful systems/i)).toBeInTheDocument();
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
    expect(screen.getByText("Useful by design.")).toBeInTheDocument();
    expect(screen.queryByText(/not client-submitted/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".contact-detail-icon")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Let’s build something useful." })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-contact-type-char]").length).toBeGreaterThan(20);
    expect(container.querySelector(".contact-intro p")?.children).toHaveLength(2);
    expect(screen.getByText("felixjosephcastaneda@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("San Fernando, Cebu, PH")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How I can help/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Five-step delivery process").children).toHaveLength(5);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Launch & support")).toBeInTheDocument();
    expect(screen.getByLabelText("Services")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hi, I’m Felix." })).toBeInTheDocument();
    expect(screen.getByText(/Is there a more efficient way to do this/i)).toBeInTheDocument();
    expect(screen.getByText("Open to work")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Felix Joseph Castañeda standing beside/i })).toHaveAttribute("src", expect.stringContaining("felix-portrait.jpg"));
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
  });

  it("restores the single-line monochrome skills carousel", () => {
    const { container } = render(
      <>
        <AboutSection />
        <SkillsSection />
      </>,
    );

    expect(screen.getByRole("heading", { name: /Daily drivers. Built for the work./i })).toBeInTheDocument();
    expect(screen.queryByText(/Technology I work with/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/I design useful software and AI-assisted workflows/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll("#about .skill-track")).toHaveLength(0);
    expect(container.querySelectorAll("#skills .skill-lane")).toHaveLength(1);
    expect(container.querySelectorAll("#skills .skill-track")).toHaveLength(1);
    expect(screen.getAllByLabelText("Claude Code").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Codex").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Cursor").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Visual Studio Code").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Zapier").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Make.com").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Activepieces").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Vercel").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Docker").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Google Gemini").length).toBeGreaterThanOrEqual(1);
    expect(container.querySelectorAll("#skills .skill-set")).toHaveLength(5);
    expect(container.querySelectorAll("#skills .skill-name")).toHaveLength(0);
  });

  it("provides a reduced-motion alternative for the skills carousel", () => {
    const styles = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const reducedMotion = styles.indexOf("@media (prefers-reduced-motion: reduce)");
    const staticTrack = styles.indexOf(".skill-track { transform:none !important; animation:none !important; }", reducedMotion);

    expect(reducedMotion).toBeGreaterThanOrEqual(0);
    expect(staticTrack).toBeGreaterThan(reducedMotion);
  });
});
