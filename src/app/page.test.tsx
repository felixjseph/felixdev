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

  it("states Felix's role and value proposition", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: /I build systems that turn busywork into forward motion/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Full-Stack Web & AI Developer/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /View my work/i })).toHaveAttribute("href", "#projects");
    expect(screen.queryByText("Full-stack systems")).not.toBeInTheDocument();
    expect(screen.queryByText("Workflow automation")).not.toBeInTheDocument();
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

  it("publishes approved contact channels while keeping GitHub and LinkedIn out", () => {
    const { container } = render(<HomePage />);
    expect(container.innerHTML.toLowerCase()).not.toContain("github");
    expect(container.innerHTML.toLowerCase()).not.toContain("linkedin");
    expect(container.querySelector("a[href='mailto:felixjosephcastaneda@gmail.com']")).toBeInTheDocument();
    expect(container.querySelector("a[href='tel:09432469897']")).toBeInTheDocument();
    expect(screen.getByText("San Fernando, Cebu, PH")).toBeInTheDocument();
  });

  it("features the three approved projects without unfinished concept rows", () => {
    render(<HomePage />);
    const softpoint = screen.getByRole("heading", { name: "Softpoint Enterprise" }).closest("article")!;
    const solara = screen.getByRole("heading", { name: "Solara" }).closest("article")!;
    expect(screen.queryByText("AI Document Intelligence")).not.toBeInTheDocument();
    expect(screen.queryByText("Agentic Workflow Command Center")).not.toBeInTheDocument();
    expect(within(softpoint).getByRole("link", { name: "View case study" })).toHaveAttribute("href", "/work/softpoint-enterprise");
    expect(within(solara).getByRole("link", { name: "View case study" })).toHaveAttribute("href", "/work/solara");
  });
});
