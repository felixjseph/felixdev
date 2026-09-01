export type DrinkField = "base" | "sweetness" | "milk" | "temperature" | "texture";

export type DrinkSelection = Record<DrinkField, string>;

export type DrinkOption = {
  id: string;
  label: string;
};

export type Constraint = {
  when: Partial<DrinkSelection>;
  disallow: { field: DrinkField; optionIds: string[] };
  reason: string;
};

export type DrinkCatalog = {
  options: Record<DrinkField, DrinkOption[]>;
  constraints: Constraint[];
  verification: "development" | "approved";
};

export type DisabledOption = {
  field: DrinkField;
  optionId: string;
  reason: string;
};

export type SelectionNormalizationIssue =
  | {
      code: "unsatisfiable-field";
      field: DrinkField;
      selectedOptionId: string;
      disabledOptionIds: string[];
    }
  | {
      code: "unknown-option";
      field: DrinkField;
      optionId: string;
    }
  | {
      code: "normalization-cycle";
      fields: DrinkField[];
    };

export type SelectionNormalizationResult =
  | {
      status: "valid";
      selection: DrinkSelection;
      issues: [];
    }
  | {
      status: "invalid";
      selection: DrinkSelection;
      issues: SelectionNormalizationIssue[];
    };
