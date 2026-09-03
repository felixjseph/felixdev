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
  document.body.classList.remove("is-loading");
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("SiteLoader", () => {
  it("releases the page scroll lock after the startup sequence", async () => {
    vi.useFakeTimers();
    stubMatchMedia();
    render(<SiteLoader />);

    expect(document.body).toHaveClass("is-loading");

    await act(async () => {
      vi.advanceTimersByTime(1_600);
    });

    expect(document.body).not.toHaveClass("is-loading");
    expect(document.querySelector(".site-loader")).not.toBeInTheDocument();
  });
});
