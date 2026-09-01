import { describe, expect, it } from "vitest";
import { resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses a stored manual choice before system preference", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("uses the system preference without a stored choice", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });
});
