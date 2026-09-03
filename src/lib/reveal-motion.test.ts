import { describe, expect, it } from "vitest";
import { revealMotion } from "./reveal-motion";

describe("reveal motion presets", () => {
  it("composes distinct directional, rising, scaling, and still fades", () => {
    const starts = ["left", "right", "title", "rise", "card", "fade"].map((variant) =>
      revealMotion(variant, undefined, false).keyframes[0].transform,
    );
    expect(new Set(starts).size).toBe(6);
    expect(starts[0]).toContain("-30px, 0px");
    expect(starts[1]).toContain("30px, 0px");
  });

  it("reduces travel on small screens without changing the final layout", () => {
    const desktop = revealMotion("left", "70", false);
    const mobile = revealMotion("left", "70", true);
    expect(mobile.keyframes[0].transform).toContain("-19.5px");
    expect(mobile.keyframes[1]).toEqual(desktop.keyframes[1]);
    expect(mobile.options).toEqual(desktop.options);
  });

  it.each([undefined, "invalid", "Infinity", "-50"])("handles invalid or negative delay %s", (delay) => {
    expect(revealMotion("rise", delay, false).options.delay).toBe(0);
  });

  it("caps stagger and falls back to a small rise", () => {
    expect(revealMotion("missing", "9999", false)).toEqual(revealMotion("rise", "120", false));
  });

  it("only animates composited properties and releases its final styles", () => {
    for (const variant of ["left", "right", "title", "rise", "card", "fade"]) {
      const motion = revealMotion(variant, undefined, false);
      expect(Object.keys(motion.keyframes[0])).toEqual(["opacity", "transform"]);
      expect(motion.options.fill).toBe("backwards");
    }
  });
});
