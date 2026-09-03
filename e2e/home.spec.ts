import { expect, test } from "@playwright/test";

test("follows the requested homepage story and opens project details", async ({ page }) => {
  await page.goto("/");

  const sectionIds = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  );
  expect(sectionIds).toEqual(["hero", "about", "skills", "projects", "testimonial", "experience", "contact"]);

  await expect(page.getByRole("heading", { name: /turn busywork into forward motion/i })).toBeVisible();
  await page.getByRole("link", { name: /View my work/i }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.getByRole("link", { name: "View case study" }).click();
  await expect(page).toHaveURL(/\/work\/softpoint-enterprise$/);
  await expect(page.getByRole("heading", { level: 1, name: "Softpoint Enterprise" })).toBeVisible();
});

test("persists a manual dark theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("felixdev-theme"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("uses the dark system theme on a first visit", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.removeItem("felixdev-theme"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("keeps marquee content usable when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".skill-set[aria-hidden='true']").first()).toBeHidden();
  const animation = await page.locator(".skill-track").first().evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
});

test("publishes approved contact details without GitHub or LinkedIn", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("a[href*='github']")).toHaveCount(0);
  await expect(page.locator("a[href*='linkedin']")).toHaveCount(0);
  await expect(page.locator("a[href='mailto:felixjosephcastaneda@gmail.com']").first()).toBeVisible();
  await expect(page.locator("a[href='tel:09432469897']").first()).toBeVisible();
  await expect(page.getByText("San Fernando, Cebu, PH")).toBeVisible();
});
