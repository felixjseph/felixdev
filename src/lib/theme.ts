export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "felixdev-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(stored: unknown, prefersDark: boolean): Theme {
  return isTheme(stored) ? stored : prefersDark ? "dark" : "light";
}
