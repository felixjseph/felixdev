import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OrbitAssembly } from "./orbit-assembly";

function stubMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("OrbitAssembly", () => {
  it("lets a first-time visitor skip the intro", async () => {
    stubMatchMedia(false);
    const user = userEvent.setup();

    render(<OrbitAssembly />);

    await user.click(screen.getByRole("button", { name: "Skip intro" }));

    expect(screen.queryByRole("button", { name: "Skip intro" })).not.toBeInTheDocument();
    expect(localStorage.getItem("felixdev-intro-v1")).toBe("1");
  });

  it("does not render an intro overlay for visitors who prefer reduced motion", () => {
    stubMatchMedia(true);

    render(<OrbitAssembly />);

    expect(screen.queryByRole("button", { name: "Skip intro" })).not.toBeInTheDocument();
  });
});
