import { describe, expect, it } from "vitest";
import { shouldPlayIntro } from "./intro-preference";

describe("shouldPlayIntro", () => {
  it("plays only for a first visit without reduced motion", () => {
    expect(shouldPlayIntro(null, false)).toBe(true);
    expect(shouldPlayIntro("1", false)).toBe(false);
    expect(shouldPlayIntro(null, true)).toBe(false);
  });
});
