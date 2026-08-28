import { render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("@/app/actions/submit-inquiry", () => ({
  submitInquiry: vi.fn(async () => ({ status: "idle", message: "" })),
}));

describe("HomePage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("states the approved role and headline", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: "Software that works. Automation that keeps working.",
      }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Software that works. Automation that keeps working." })).getByText(
        "Full-Stack & AI Automation Developer",
      ),
    ).toBeInTheDocument();
  });

  it("keeps the approved proof-first section order", () => {
    const { container } = render(<HomePage />);
    const ids = Array.from(container.querySelectorAll("main > section")).map(
      (section) => section.id,
    );

    expect(ids).toEqual([
      "hero",
      "credibility",
      "work",
      "capabilities",
      "about",
      "testimonials",
      "faq",
      "contact",
    ]);
  });

  it("keeps private repository identity out of public contact output", () => {
    const { container } = render(<HomePage />);
    const privateRepositoryEmail = ["felixjosephcastaneda", "gmail.com"].join("@");

    expect(container.innerHTML).not.toContain(privateRepositoryEmail);
    expect(container.querySelector("a[href^='mailto:']")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send project inquiry" })).toBeInTheDocument();
  });

  it("marks every primary cobalt surface for semantic contrast", () => {
    const { container } = render(<HomePage />);

    const surfaces = container.querySelectorAll("[data-accent-surface='primary']");
    expect(surfaces.length).toBeGreaterThanOrEqual(3);
  });
});
