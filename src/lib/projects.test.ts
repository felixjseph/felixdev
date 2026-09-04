import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { projects, requiredChapterTitles } from "@/content/projects";
import { getNextProject, getProjectBySlug, getProjectSlugs } from "./projects";

const approvedChapterTitles = {
  "softpoint-enterprise": ["A clearer customer experience", "Less repetition behind the scenes", "Built, connected, and deployed"],
  "sayu-cafe": [
    "Business context and operational friction",
    "Responsive product discovery",
    "Daily audit reporting",
    "Inventory monitoring and low-stock alerts",
    "Rule-based drink builder",
    "Future smart suggestions",
  ],
  solara: [
    "Client context and service discovery",
    "Residential and commercial solutions",
    "Reusable responsive architecture",
    "A clear path from interest to inquiry",
    "Production delivery on Vercel",
  ],
  "pach-drugmart": [
    "Operational context and inventory problems",
    "Information structure and core workflows",
    "Inventory analytics and operational dashboard",
    "Transaction handling and operational visibility",
  ],
} as const;

const approvedP2HexTokens = new Set([
  "#F7F7F2",
  "#FFFFFF",
  "#111316",
  "#2457FF",
  "#BCE7D0",
  "#0A0D14",
  "#121826",
  "#F2F4F8",
  "#6B8CFF",
  "#9FE0C0",
]);

describe("project content", () => {
  it("leads with Softpoint and retains the existing case studies", () => {
    expect(getProjectSlugs()).toEqual([
      "softpoint-enterprise",
      "sayu-cafe",
      "solara",
      "pach-drugmart",
    ]);
  });

  it("uses only approved proof states", () => {
    const states = projects.flatMap((project) =>
      project.sections.flatMap((section) => section.proofState ?? []),
    );

    expect(
      states.every((state) => ["shipped", "prototype", "planned"].includes(state)),
    ).toBe(true);
  });

  it("keeps corrected public claims", () => {
    const text = JSON.stringify(projects);

    expect(text).not.toMatch(/PD Pach Drugmart/i);
    expect(text).not.toMatch(/ordering/i);
    expect(text).not.toMatch(/record management/i);
    expect(text).not.toMatch(/40%/i);
    expect(text).toMatch(/residential and commercial solar/i);
    expect(text).not.toMatch(/document-first|Gemini quotation/i);
  });

  it("keeps every project chapter list exact and ordered", () => {
    expect(requiredChapterTitles).toEqual(approvedChapterTitles);

    for (const project of projects) {
      expect(project.sections.map((section) => section.title)).toEqual(
        approvedChapterTitles[project.slug],
      );
    }
  });

  it("preserves the approved proof states for Sayu and the shipped Solara project", () => {
    const sayu = getProjectBySlug("sayu-cafe");
    const solara = getProjectBySlug("solara");

    expect(sayu?.sections.find((section) => section.title === "Rule-based drink builder")?.proofState).toBe("prototype");
    expect(sayu?.sections.find((section) => section.title === "Future smart suggestions")?.proofState).toBe("planned");
    expect(solara?.sections.every((section) => section.proofState === "shipped")).toBe(true);
    expect(solara?.role).toBe("Web Developer");
    expect(solara?.website).toBe("https://solaraservices.vercel.app/");
  });

  it("uses informative development fallback media with reserved dimensions", () => {
    for (const project of projects) {
      for (const media of project.media) {
        expect(media.width).toBeGreaterThan(0);
        expect(media.height).toBeGreaterThan(0);
        expect(media.alt.trim().length).toBeGreaterThan(10);
        if (project.slug === "softpoint-enterprise") {
          expect(media.src).toMatch(/^\/images\/projects\/softpoint\/.+\.webp$/);
          expect(readFileSync(resolve(process.cwd(), "public", media.src.slice(1))).length).toBeGreaterThan(0);
        } else if (project.slug === "solara") {
          expect(media.src).toMatch(/^\/images\/projects\/solara\/.+\.png$/);
          expect(readFileSync(resolve(process.cwd(), "public", media.src.slice(1))).length).toBeGreaterThan(0);
        } else {
          expect(media.src).toMatch(/^\/images\/projects\/.*-fallback\.svg$/);
          expect(media.caption).toMatch(/development media fallback/i);
        }
      }
    }
  });

  it("keeps fallback SVGs visibly labelled and limited to the P2 palette", () => {
    const fallbackAssets = [
      ["sayu-fallback.svg", "Sayu Café"],
      ["pach-fallback.svg", "Pach Drugmart"],
    ] as const;

    for (const [filename, projectName] of fallbackAssets) {
      const asset = readFileSync(
        resolve(process.cwd(), "public", "images", "projects", filename),
        "utf8",
      );
      const hexTokens = asset.match(/#[0-9A-Fa-f]{6}/g) ?? [];

      expect(asset).toContain(projectName);
      expect(asset).toContain("DEVELOPMENT MEDIA FALLBACK");
      expect(hexTokens.length).toBeGreaterThan(0);
      expect(hexTokens.every((token) => approvedP2HexTokens.has(token.toUpperCase()))).toBe(true);
    }
  });

  it("cycles to the next project, resolves Solara, and deliberately falls back for an unknown slug", () => {
    expect(getNextProject("pach-drugmart")?.slug).toBe("softpoint-enterprise");
    expect(getProjectBySlug("solara")?.title).toBe("Solara");
    expect(getNextProject("unknown-project")?.slug).toBe("softpoint-enterprise");
  });
});
