import type {
  DisabledOption,
  DrinkCatalog,
  DrinkField,
  DrinkSelection,
  SelectionNormalizationIssue,
  SelectionNormalizationResult,
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

function getUnknownOptionIssues(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
): SelectionNormalizationIssue[] {
  return summaryFields.flatMap((field) =>
    catalog.options[field].some((option) => option.id === selection[field])
      ? []
      : [{ code: "unknown-option" as const, field, optionId: selection[field] }],
  );
}

function getInvalidSelectedFields(
  selection: DrinkSelection,
  disabled: DisabledOption[],
) {
  return summaryFields.filter((field) =>
    disabled.some(
      (option) => option.field === field && option.optionId === selection[field],
    ),
  );
}

export function normalizeSelectionResult(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
): SelectionNormalizationResult {
  const normalized = { ...selection };
  const visited = new Set<string>();

  while (true) {
    const stateKey = JSON.stringify(
      summaryFields.map((field) => normalized[field]),
    );
    if (visited.has(stateKey)) {
      const disabled = getDisabledOptions(normalized, catalog);
      return {
        status: "invalid",
        selection: normalized,
        issues: [
          {
            code: "normalization-cycle",
            fields: getInvalidSelectedFields(normalized, disabled),
          },
        ],
      };
    }
    visited.add(stateKey);

    const disabled = getDisabledOptions(normalized, catalog);
    const invalidFields = getInvalidSelectedFields(normalized, disabled);

    if (invalidFields.length === 0) {
      const issues = getUnknownOptionIssues(normalized, catalog);
      return issues.length === 0
        ? { status: "valid", selection: normalized, issues: [] }
        : { status: "invalid", selection: normalized, issues };
    }

    let replaced = false;

    for (const field of invalidFields) {
      const replacement = catalog.options[field].find(
        (option) =>
          !disabled.some(
            (disabledOption) =>
              disabledOption.field === field && disabledOption.optionId === option.id,
          ),
      );

      if (!replacement) continue;

      normalized[field] = replacement.id;
      replaced = true;
      break;
    }

    if (!replaced) {
      return {
        status: "invalid",
        selection: normalized,
        issues: invalidFields.map((field) => ({
          code: "unsatisfiable-field",
          field,
          selectedOptionId: normalized[field],
          disabledOptionIds: catalog.options[field]
            .filter((option) =>
              disabled.some(
                (disabledOption) =>
                  disabledOption.field === field &&
                  disabledOption.optionId === option.id,
              ),
            )
            .map((option) => option.id),
        })),
      };
    }
  }
}

export function normalizeSelection(
  selection: DrinkSelection,
  catalog: DrinkCatalog,
): DrinkSelection {
  return normalizeSelectionResult(selection, catalog).selection;
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
