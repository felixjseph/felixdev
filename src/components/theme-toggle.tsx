"use client";

import { useSyncExternalStore } from "react";
import {
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("felixdev-theme-change", onStoreChange);
      return () => window.removeEventListener("felixdev-theme-change", onStoreChange);
    },
    () =>
      resolveTheme(
        document.documentElement.dataset.theme,
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      ),
    () => "light",
  );

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("felixdev-theme-change"));
  };

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
      type="button"
    >
      Theme
    </button>
  );
}
