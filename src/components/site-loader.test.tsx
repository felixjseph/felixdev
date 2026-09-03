import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteLoader } from "./site-loader";

function stubMatchMedia(matches = false) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
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
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("SiteLoader", () => {
  it.each([false, true])("keeps scrolling available throughout startup (reduced motion: %s)", async (reducedMotion) => {
    vi.useFakeTimers();
    stubMatchMedia(reducedMotion);
    render(<SiteLoader />);

    expect(document.querySelector(".site-loader")).toBeInTheDocument();
    expect(document.body).not.toHaveClass("is-loading");
    expect(document.body.style.overflow).not.toBe("hidden");

    await act(async () => {
      vi.advanceTimersByTime(1_600);
    });

    expect(document.body).not.toHaveClass("is-loading");
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(document.querySelector(".site-loader")).not.toBeInTheDocument();
  });
});
