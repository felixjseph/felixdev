import { expect, test } from "@playwright/test";

test("follows the requested homepage story and opens project details", async ({ page }) => {
  await page.goto("/");

  const sectionIds = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  );
  expect(sectionIds).toEqual(["hero", "about", "skills", "projects", "testimonial", "experience", "contact"]);

  await expect(page.getByRole("heading", { name: /turn repetitive work into forward motion/i })).toBeVisible();
  await page.getByRole("link", { name: /View my work/i }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.locator("#projects article").first().getByRole("link", { name: "View case study" }).click();
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

test("keeps the signal map readable when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".signal-map__stages > li")).toHaveCount(4);
  await expect(page.getByText("Workflows that keep moving while you sleep.")).toBeVisible();
  const animation = await page.locator(".signal-map__route-line").evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
});

test("keeps the clicked navigation target active while smooth scrolling", async ({ page, isMobile }) => {
  await page.goto("/");
  const primary = page.getByRole("navigation", { name: "Primary" });
  if (isMobile) await page.getByRole("button", { name: "Open navigation menu" }).click();

  const skillsLink = (isMobile ? page.getByRole("navigation", { name: "Mobile" }) : primary)
    .getByRole("link", { name: "Skills", exact: true });
  await skillsLink.click();

  await expect(page.locator(".site-nav__links")).toHaveAttribute("data-active-index", "1");
  await page.waitForTimeout(180);
  await expect(page.locator(".site-nav__links")).toHaveAttribute("data-active-index", "1");
});

test("uses a refined responsive type hierarchy in the dropdown navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  const about = mobileNav.getByRole("link", { name: "About", exact: true });
  const typography = await about.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      family: style.fontFamily,
      size: Number.parseFloat(style.fontSize),
      transform: style.textTransform,
    };
  });

  expect(typography.family.toLowerCase()).toContain("nohemi");
  expect(typography.size).toBeGreaterThanOrEqual(16);
  expect(typography.transform).toBe("none");
  await expect(mobileNav.locator(".mobile-nav__index")).toHaveCount(6);
  await expect(mobileNav.getByRole("link", { name: "Download CV", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("adapts the brand mark to the surface underneath it without a backplate", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("felixdev-theme", "light"));
  await page.goto("/");
  const lockup = page.locator(".site-mark");
  const header = page.locator(".site-header");
  const mark = page.locator(".site-mark__symbol img");

  await expect(header).toHaveAttribute("data-contrast-tone", "dark");
  await expect(lockup).toHaveAttribute("data-contrast-tone", "dark");
  await expect(lockup).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(lockup).toHaveCSS("mix-blend-mode", "normal");
  await expect.poll(() => mark.evaluate((element) => getComputedStyle(element).filter)).not.toContain("invert(1)");

  await page.locator("#skills").evaluate((section) => {
    window.scrollTo({ top: (section as HTMLElement).offsetTop + 96, behavior: "instant" });
  });
  await expect(header).toHaveAttribute("data-contrast-tone", "light");
  await expect(lockup).toHaveAttribute("data-contrast-tone", "light");
  await expect.poll(() => mark.evaluate((element) => getComputedStyle(element).filter)).toContain("invert(1)");
});

test("publishes approved contact details without GitHub or LinkedIn", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("a[href*='github']")).toHaveCount(0);
  await expect(page.locator("a[href*='linkedin']")).toHaveCount(0);
  await expect(page.locator("a[href='mailto:felixjosephcastaneda@gmail.com']").first()).toBeVisible();
  await expect(page.locator("a[href='tel:09432469897']").first()).toBeVisible();
  await expect(page.getByText("San Fernando, Cebu, PH")).toBeVisible();
});
