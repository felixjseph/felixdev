import { describe, expect, it } from "vitest";
import { projects, requiredChapterTitles } from "@/content/projects";
import { getNextProject, getProjectBySlug, getProjectSlugs } from "./projects";

describe("project content", () => {
  it("exposes the three approved slugs in order", () => {
    expect(getProjectSlugs()).toEqual([
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
    expect(text).toMatch(/document-first/i);
  });

  it("keeps every project chapter list exact and ordered", () => {
    for (const project of projects) {
      expect(project.sections.map((section) => section.title)).toEqual(
        requiredChapterTitles[project.slug],
      );
    }
  });

  it("uses informative development fallback media with reserved dimensions", () => {
    for (const project of projects) {
      for (const media of project.media) {
        expect(media.width).toBeGreaterThan(0);
        expect(media.height).toBeGreaterThan(0);
        expect(media.alt.trim().length).toBeGreaterThan(10);
        expect(media.src).toMatch(/^\/images\/projects\/.*-fallback\.svg$/);
        expect(media.caption).toMatch(/development media fallback/i);
      }
    }
  });

  it("cycles to the next project and resolves Solara", () => {
    expect(getNextProject("pach-drugmart")?.slug).toBe("sayu-cafe");
    expect(getProjectBySlug("solara")?.title).toBe("Solara");
  });
});
