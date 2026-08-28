import { render, screen } from "@testing-library/react";
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
});
