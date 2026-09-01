import { render, screen } from "@testing-library/react";
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

  it("states Felix's role and value proposition", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: /I build systems that turn busywork into forward motion/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Full-Stack Web & AI Developer/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /View my work/i })).toHaveAttribute("href", "#projects");
  });

  it("keeps the requested portfolio section order", () => {
    const { container } = render(<HomePage />);
    const ids = Array.from(container.querySelectorAll("main > section")).map(
      (section) => section.id,
    );

    expect(ids).toEqual([
      "hero",
      "about",
      "skills",
      "projects",
      "testimonial",
      "experience",
      "contact",
    ]);
  });

  it("keeps unapproved contact channels and GitHub out of public output", () => {
    const { container } = render(<HomePage />);
    const privateRepositoryEmail = ["felixjosephcastaneda", "gmail.com"].join("@");

    expect(container.innerHTML).not.toContain(privateRepositoryEmail);
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
    expect(container.querySelector("a[href^='mailto:']")).not.toBeInTheDocument();
    expect(screen.getAllByText("Contact detail pending")).toHaveLength(3);
  });

  it("renders the three placeholder project concepts", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Business Operations Platform" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI Document Intelligence" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agentic Workflow Command Center" })).toBeInTheDocument();
  });
});
