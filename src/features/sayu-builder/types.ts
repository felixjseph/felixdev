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
