import { describe, expect, it } from "vitest";
import type { DrinkCatalog, DrinkSelection } from "./types";
import {
  createDrinkSummary,
  getDisabledOptions,
  normalizeSelection,
  normalizeSelectionResult,
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
    const disabled = getDisabledOptions(hotSeasonal, fixtureCatalog);

    expect(disabled).toEqual([
      {
        field: "texture",
        optionId: "foamy",
        reason: "The test seasonal recipe is served without foam.",
      },
      {
        field: "texture",
        optionId: "creamy",
        reason: "Seasonal test drinks use a clean texture.",
      },
    ]);

    expect(disabled.filter((option) => option.optionId === "foamy")).toEqual([
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

  it("recomputes disabled choices after each cascading replacement", () => {
    const cascadingCatalog: DrinkCatalog = {
      ...fixtureCatalog,
      constraints: [
        {
          when: { temperature: "hot" },
          disallow: { field: "texture", optionIds: ["foamy"] },
          reason: "Hot test drinks cannot use foam.",
        },
        {
          when: { texture: "clean" },
          disallow: { field: "milk", optionIds: ["whole"] },
          reason: "Clean test drinks cannot use whole milk.",
        },
      ],
    };

    const normalized = normalizeSelection(
      { ...hotSeasonal, milk: "whole", texture: "foamy" },
      cascadingCatalog,
    );
    const disabled = getDisabledOptions(normalized, cascadingCatalog);

    expect(normalized).toMatchObject({ milk: "oat", texture: "clean" });
    expect(
      disabled.some(
        ({ field, optionId }) => normalized[field] === optionId,
      ),
    ).toBe(false);
  });

  it("leaves valid selections unchanged", () => {
    expect(normalizeSelection(hotSeasonal, fixtureCatalog)).toEqual(hotSeasonal);
  });

  it("reports an unsatisfiable field when every catalog option is disabled", () => {
    const catalog: DrinkCatalog = {
      ...fixtureCatalog,
      constraints: [
        {
          when: { base: "seasonal", temperature: "hot" },
          disallow: { field: "texture", optionIds: ["clean", "creamy", "foamy"] },
          reason: "No test texture is available.",
        },
      ],
    };
    const selection = { ...hotSeasonal, texture: "foamy" };

    expect(normalizeSelection(selection, catalog)).toEqual(selection);
    expect(normalizeSelectionResult(selection, catalog)).toEqual({
      status: "invalid",
      selection,
      issues: [
        {
          code: "unsatisfiable-field",
          field: "texture",
          selectedOptionId: "foamy",
          disabledOptionIds: ["clean", "creamy", "foamy"],
        },
      ],
    });
  });

  it("preserves and reports an unknown selected option without throwing", () => {
    const selection = { ...hotSeasonal, texture: "unknown-texture" };

    expect(() => normalizeSelection(selection, fixtureCatalog)).not.toThrow();
    expect(normalizeSelection(selection, fixtureCatalog)).toEqual(selection);
    expect(normalizeSelectionResult(selection, fixtureCatalog)).toEqual({
      status: "invalid",
      selection,
      issues: [
        {
          code: "unknown-option",
          field: "texture",
          optionId: "unknown-texture",
        },
      ],
    });
  });

  it("stops and reports a normalization cycle", () => {
    const cyclingCatalog: DrinkCatalog = {
      ...fixtureCatalog,
      constraints: [
        {
          when: { milk: "whole" },
          disallow: { field: "texture", optionIds: ["foamy"] },
          reason: "Whole milk rejects foam in the cycle fixture.",
        },
        {
          when: { texture: "clean" },
          disallow: { field: "milk", optionIds: ["whole"] },
          reason: "Clean texture rejects whole milk in the cycle fixture.",
        },
        {
          when: { milk: "oat" },
          disallow: { field: "texture", optionIds: ["clean", "creamy"] },
          reason: "Oat milk rejects non-foamy texture in the cycle fixture.",
        },
        {
          when: { texture: "foamy" },
          disallow: { field: "milk", optionIds: ["oat"] },
          reason: "Foam rejects oat milk in the cycle fixture.",
        },
      ],
    };
    const selection = { ...hotSeasonal, milk: "whole", texture: "foamy" };

    expect(() => normalizeSelection(selection, cyclingCatalog)).not.toThrow();
    expect(normalizeSelectionResult(selection, cyclingCatalog)).toMatchObject({
      status: "invalid",
      issues: [{ code: "normalization-cycle" }],
    });
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
