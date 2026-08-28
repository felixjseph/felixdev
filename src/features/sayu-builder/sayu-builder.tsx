"use client";

import { useState } from "react";
import { createDrinkSummary, getDisabledOptions, normalizeSelection } from "./drink-rules";
import type { DrinkCatalog, DrinkField, DrinkSelection } from "./types";

const fields: { field: DrinkField; legend: string }[] = [
  { field: "base", legend: "Choose your base" },
  { field: "sweetness", legend: "Choose your sweetness" },
  { field: "milk", legend: "Choose your milk" },
  { field: "temperature", legend: "Choose your temperature" },
  { field: "texture", legend: "Choose your texture" },
];

function initialSelection(catalog: DrinkCatalog): DrinkSelection {
  return fields.reduce((selection, { field }) => {
    selection[field] = catalog.options[field][0]?.id ?? "";
    return selection;
  }, {} as DrinkSelection);
}

function inputId(field: DrinkField, optionId: string) {
  return `sayu-${field}-${optionId.replaceAll(/[^a-z0-9]+/gi, "-")}`;
}

export function SayuBuilder({ catalog }: { catalog: DrinkCatalog }) {
  const [selection, setSelection] = useState(() =>
    normalizeSelection(initialSelection(catalog), catalog),
  );
  const disabledOptions = getDisabledOptions(selection, catalog);
  const dataLabel =
    catalog.verification === "approved"
      ? "Shipped · Approved menu rules"
      : "Prototype · Menu rules awaiting approval";

  function choose(field: DrinkField, optionId: string) {
    setSelection((current) => normalizeSelection({ ...current, [field]: optionId }, catalog));
  }

  return (
    <section aria-labelledby="sayu-builder-title" className="mx-auto max-w-5xl px-4 py-12">
      <div className="border-2 border-(--color-text) bg-(--color-surface) p-5 shadow-[6px_6px_0_var(--color-text)] sm:p-8">
        <p className="system-label text-sm font-bold uppercase tracking-widest">{dataLabel}</p>
        <h2 id="sayu-builder-title" className="mt-3 text-3xl font-bold">Build a Sayu drink</h2>
        <p className="mt-2 max-w-2xl">Explore a prototype of the product-discovery experience. It does not place orders or collect customer data.</p>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {fields.map(({ field, legend }) => {
            const disabledForField = disabledOptions.filter((option) => option.field === field);

            return (
              <fieldset key={field} className="min-w-0 border-2 border-(--color-text) p-4">
                <legend className="px-1 font-bold">{legend}</legend>
                <div className="grid gap-2">
                  {catalog.options[field].map((option) => {
                    const disabled = disabledForField.find((item) => item.optionId === option.id);
                    const id = inputId(field, option.id);
                    const reasonId = `${id}-reason`;

                    return (
                      <div key={option.id}>
                        <label className="flex min-h-11 items-center gap-3 border border-(--color-text) px-3 py-2 has-[:checked]:bg-(--color-support) has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60" htmlFor={id}>
                          <input
                            aria-describedby={disabled ? reasonId : undefined}
                            checked={selection[field] === option.id}
                            disabled={Boolean(disabled)}
                            id={id}
                            name={`sayu-${field}`}
                            onChange={() => choose(field, option.id)}
                            type="radio"
                            value={option.id}
                          />
                          {option.label}
                        </label>
                        {disabled ? <p id={reasonId} className="mt-1 text-sm">{disabled.reason}</p> : null}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-7 border-2 border-(--color-accent) bg-(--color-bg) p-4 font-semibold" role="status">
          {createDrinkSummary(selection, catalog)}
        </p>

        <div className="mt-7 border-t-2 border-(--color-text) pt-5">
          <h3 className="text-xl font-bold">Planned · Smart suggestions</h3>
          <p className="mt-2">AI recommendations are not active. This planned concept will only be considered after menu rules are approved.</p>
        </div>
      </div>
    </section>
  );
}
