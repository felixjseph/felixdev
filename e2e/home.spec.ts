import { expect, test } from "@playwright/test";

test.fixme("opens the flagship project from the homepage", {
  annotation: { type: "fixme", description: "Plan 2 creates project routes" },
}, async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click().catch(() => {});
  await page.getByRole("link", { name: /Sayu Café/i }).click();
  await expect(page).toHaveURL(/\/work\/sayu-cafe$/);
});

test("persists a manual dark theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("felixdev-theme");
    localStorage.setItem("felixdev-intro-v1", "1");
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
