import { describe, expect, it } from "vitest";
import type { DrinkCatalog, DrinkSelection } from "./types";
import {
  createDrinkSummary,
  getDisabledOptions,
  normalizeSelection,
} from "./drink-rules";

const fixtureCatalog: DrinkCatalog = {
  verification: "approved",
  options: {
    base: [
      { id: "coffee", label: "Coffee" },
      { id: "seasonal", label: "Seasonal" },
    ],
    sweetness: [
      { id: "balanced", label: "Balanced" },
      { id: "sweet", label: "Sweet" },
    ],
    milk: [
      { id: "oat", label: "Oat milk" },
      { id: "whole", label: "Whole milk" },
    ],
    temperature: [
      { id: "iced", label: "Iced" },
      { id: "hot", label: "Hot" },
    ],
    texture: [
      { id: "clean", label: "Clean" },
      { id: "creamy", label: "Creamy" },
      { id: "foamy", label: "Foamy" },
    ],
  },
  constraints: [
    {
      when: { base: "seasonal", temperature: "hot" },
      disallow: { field: "texture", optionIds: ["foamy"] },
      reason: "The test seasonal recipe is served without foam.",
    },
    {
      when: { base: "seasonal" },
      disallow: { field: "texture", optionIds: ["foamy", "creamy"] },
      reason: "Seasonal test drinks use a clean texture.",
    },
  ],
};

const hotSeasonal: DrinkSelection = {
  base: "seasonal",
  sweetness: "balanced",
  milk: "oat",
  temperature: "hot",
  texture: "clean",
};

describe("drink rules", () => {
  it("matches every specified partial condition exactly", () => {
    expect(getDisabledOptions(hotSeasonal, fixtureCatalog)).toContainEqual({
      field: "texture",
      optionId: "foamy",
      reason: "The test seasonal recipe is served without foam.",
    });
  });

  it("does not apply a constraint when one of its conditions differs", () => {
    expect(
      getDisabledOptions(
        { ...hotSeasonal, base: "coffee" },
        fixtureCatalog,
      ),
    ).toEqual([]);
  });

  it("de-duplicates matching disabled options and keeps the first reason", () => {
    const disabled = getDisabledOptions(hotSeasonal, fixtureCatalog).filter(
      (option) => option.field === "texture" && option.optionId === "foamy",
    );

    expect(disabled).toEqual([
      {
        field: "texture",
        optionId: "foamy",
        reason: "The test seasonal recipe is served without foam.",
      },
    ]);
  });

  it("replaces a disabled selection with the first enabled catalog option", () => {
    expect(
      normalizeSelection({ ...hotSeasonal, texture: "foamy" }, fixtureCatalog),
    ).toMatchObject({ texture: "clean" });
  });

  it("leaves valid selections unchanged", () => {
    expect(normalizeSelection(hotSeasonal, fixtureCatalog)).toEqual(hotSeasonal);
  });

  it("resolves labels into the prescribed summary order", () => {
    expect(createDrinkSummary(hotSeasonal, fixtureCatalog)).toBe(
      "Hot seasonal · balanced sweetness · oat milk · clean texture",
    );
  });

  it("falls back safely to unknown option ids", () => {
    expect(
      createDrinkSummary({ ...hotSeasonal, milk: "mystery milk" }, fixtureCatalog),
    ).toBe("Hot seasonal · balanced sweetness · mystery milk · clean texture");
  });

  it("does not mutate selection or catalog inputs", () => {
    const selection = { ...hotSeasonal, texture: "foamy" };
    const catalog = structuredClone(fixtureCatalog);

    normalizeSelection(selection, catalog);
    getDisabledOptions(selection, catalog);
    createDrinkSummary(selection, catalog);

    expect(selection).toEqual({ ...hotSeasonal, texture: "foamy" });
    expect(catalog).toEqual(fixtureCatalog);
  });
});
