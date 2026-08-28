import type {
  DisabledOption,
  DrinkCatalog,
  DrinkField,
  DrinkSelection,
} from "./types";

const summaryFields: DrinkField[] = [
  "temperature",
  "base",
  "sweetness",
  "milk",
  "texture",
];

function matchesSelection(
  selection: DrinkSelection,
  conditions: Partial<DrinkSelection>,
) {
  return Object.entries(conditions).every(
    ([field, optionId]) => selection[field as DrinkField] === optionId,
  );
}

function getOptionLabel(field: DrinkField, optionId: string, catalog: DrinkCatalog) {
  return catalog.options[field].find((option) => option.id === optionId)?.label ?? optionId;
}

function sentenceCase(value: string) {
  return value.length === 0 ? value : `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
}

export function getDisabledOptions(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
): DisabledOption[] {
  const disabled = new Map<string, DisabledOption>();

  for (const constraint of catalog.constraints) {
    if (!matchesSelection(selection, constraint.when)) continue;

    for (const optionId of constraint.disallow.optionIds) {
      const key = `${constraint.disallow.field}:${optionId}`;
      if (!disabled.has(key)) {
        disabled.set(key, {
          field: constraint.disallow.field,
          optionId,
          reason: constraint.reason,
        });
      }
    }
  }

  return [...disabled.values()];
}

export function normalizeSelection(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
): DrinkSelection {
  const normalized = { ...selection };
  const disabled = getDisabledOptions(selection, catalog);

  for (const field of summaryFields) {
    if (!disabled.some((option) => option.field === field && option.optionId === selection[field])) {
      continue;
    }

    const replacement = catalog.options[field].find(
      (option) => !disabled.some((disabledOption) => disabledOption.field === field && disabledOption.optionId === option.id),
    );

    if (replacement) normalized[field] = replacement.id;
  }

  return normalized;
}

export function createDrinkSummary(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
) {
  const [temperature, base, sweetness, milk, texture] = summaryFields.map((field) =>
    getOptionLabel(field, selection[field], catalog).toLowerCase(),
  );

  return sentenceCase(
    `${temperature} ${base} · ${sweetness} sweetness · ${milk} · ${texture} texture`,
  );
}
