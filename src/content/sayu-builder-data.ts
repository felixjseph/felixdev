import type { DrinkCatalog, DrinkOption } from "@/features/sayu-builder/types";

function option(id: string): DrinkOption {
  return {
    id,
    label: id.replace(/\b\w/g, (letter) => letter.toUpperCase()),
  };
}

export const sayuCatalog: DrinkCatalog = {
  verification: "development",
  options: {
    base: ["coffee", "matcha", "hojicha", "seasonal"].map(option),
    sweetness: ["unsweetened", "light", "balanced", "sweet"].map(option),
    milk: ["whole milk", "oat milk", "almond milk", "no milk"].map(option),
    temperature: ["iced", "hot"].map(option),
    texture: ["clean", "creamy", "foamy"].map(option),
  },
  constraints: [],
};
