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

    expect(card).toHaveClass("[@media(hover:hover)_and_(pointer:fine)]:hover:[transform:rotateX(2deg)_rotateY(-2deg)_translateY(-4px)]");
    expect(card).toHaveClass("motion-reduce:hover:transform-none");
  });
});
