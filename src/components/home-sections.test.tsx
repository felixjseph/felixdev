import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./about-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CredibilityBand } from "./credibility-band";
import { FaqSection } from "./faq-section";
import { FeaturedWork } from "./featured-work";
import { TestimonialsSection } from "./testimonials-section";

describe("homepage proof-first sections", () => {
  it("renders the approved project routes without unsupported claims", () => {
    render(
      <>
        <CredibilityBand />
        <FeaturedWork />
        <CapabilitiesSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Featured work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sayu Café/i })).toHaveAttribute(
      "href",
      "/work/sayu-cafe",
    );
    expect(screen.getByRole("link", { name: /Solara/i })).toHaveAttribute(
      "href",
      "/work/solara",
    );
    expect(screen.getByRole("link", { name: /Pach Drugmart/i })).toHaveAttribute(
      "href",
      "/work/pach-drugmart",
    );
    expect(screen.queryByText(/virtual assistant/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/40%/i)).not.toBeInTheDocument();
  });

  it("keeps fine-pointer card tilt disabled when reduced motion is requested", () => {
    const { container } = render(<FeaturedWork />);

    const card = within(container).getByRole("link", { name: /Sayu Café/i }).closest("article");
    const styles = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const tiltRule = styles.indexOf(".project-card:hover {\n    transform: rotateX(2deg)");
    const reducedMotionOverride = styles.indexOf(".project-card:hover {\n    transform: none !important;");

    expect(card).toHaveClass("project-card");
    expect(tiltRule).toBeGreaterThanOrEqual(0);
    expect(reducedMotionOverride).toBeGreaterThan(tiltRule);
  });
});
