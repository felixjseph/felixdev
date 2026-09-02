import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  beforeEach(() => {
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

  it("provides accessible navigation for the requested homepage sections", () => {
    const { container } = render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /Felix Castañeda/i })).toHaveAttribute("href", "#hero");
    expect(container.querySelector(".site-mark__symbol svg[viewBox='0 0 64 64']")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "#skills");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByLabelText(/Resume — download not yet available/i)).toHaveAttribute(
      "data-resume-state",
      "unavailable",
    );
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("labels the mobile disclosure as navigation and closes it on links and Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(menuButton);
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    await user.click(screen.getAllByRole("link", { name: "Projects" }).at(-1)!);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });
});
