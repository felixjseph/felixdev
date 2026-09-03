// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { validateLockfile } from "./check-lockfile.mjs";

const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));

describe("deployment lockfile guard", () => {
  it("accepts the committed cross-platform dependency graph", () => {
    expect(validateLockfile(manifest, lock)).toEqual([]);
    expect(manifest.engines.node).toBe("24.x");
  });

  it("catches the exact optional-runtime stub that broke Vercel", () => {
    const broken = structuredClone(lock);
    broken.packages["node_modules/@img/sharp-wasm32/node_modules/@emnapi/runtime"] = { optional: true };
    expect(validateLockfile(manifest, broken).join("\n")).toContain('missing or invalid version (npm can fail with "Invalid Version")');
  });

  it("catches incomplete tarball metadata", () => {
    const broken = structuredClone(lock);
    delete broken.packages["node_modules/next"].integrity;
    expect(validateLockfile(manifest, broken)).toContain("node_modules/next: missing tarball integrity hash.");
  });

  it("catches manifest drift before installation", () => {
    const changed = structuredClone(manifest);
    changed.dependencies.next = "0.0.0";
    expect(validateLockfile(changed, lock)).toContain("package.json and lockfile disagree on dependencies.");
  });
});
