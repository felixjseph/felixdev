import { expect, test } from "@playwright/test";

test("previews expand, trap focus, close, and preserve document scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Expand Softpoint Enterprise previews" });
  await trigger.scrollIntoViewIfNeeded();
  const originalOverflow = await page.evaluate(() => [document.body.style.overflow, document.documentElement.style.overflow]);
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Softpoint Enterprise expanded previews" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close expanded previews" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Operations", exact: true })).toBeFocused();
  await dialog.getByRole("button", { name: "Operations", exact: true }).click();
  await expect(dialog.getByRole("img", { name: /operations dashboard/i })).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => [document.body.style.overflow, document.documentElement.style.overflow])).toEqual(originalOverflow);
  const before = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: "instant" }));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  await trigger.click();
  await dialog.getByRole("button", { name: "Close expanded previews" }).click();
  await expect(dialog).not.toBeVisible();
});

test("slideshow advances only while visible and idle, with explicit and reduced-motion pauses", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/work/softpoint-enterprise");
  const gallery = page.getByRole("figure", { name: "Softpoint Enterprise project previews" });
  await gallery.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(gallery).toHaveAttribute("data-playing", "true");
  const active = gallery.getByRole("button", { pressed: true });
  const start = await active.textContent();
  await expect.poll(() => active.textContent(), { timeout: 8000 }).not.toBe(start);
  await gallery.getByRole("button", { name: "Pause preview slideshow" }).click();
  await page.mouse.move(0, 0);
  await expect(gallery).toHaveAttribute("data-playing", "false");
  await gallery.getByRole("button", { name: "Resume preview slideshow" }).click();
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await expect(gallery).toHaveAttribute("data-playing", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(gallery).toHaveAttribute("data-playing", "false");
  await expect(gallery.getByRole("button", { name: /preview slideshow/ })).toHaveCount(0);
});

test("contact copies the exact email and footer icons retain accessible destinations", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("felixjosephcastaneda@gmail.com");
  const footer = page.getByRole("navigation", { name: "Footer navigation" });
  await expect(footer.getByRole("link", { name: "Send me an email" })).toHaveAttribute("href", "mailto:felixjosephcastaneda@gmail.com");
  await expect(footer.getByRole("link", { name: "Call Felix" })).toHaveAttribute("href", "tel:09432469897");
  await footer.getByRole("link", { name: "Back to top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(150);
});

test("project rows alternate on desktop and stack without overflow on mobile", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const first = page.locator("#projects article").nth(0);
  const second = page.locator("#projects article").nth(1);
  for (const [row, side] of [[first, "left"], [second, "right"]] as const) {
    const preview = await row.locator("figure").boundingBox();
    const title = await row.locator("h3").boundingBox();
    if (isMobile) expect(preview!.y).toBeLessThan(title!.y);
    else if (side === "left") expect(preview!.x).toBeLessThan(title!.x);
    else expect(preview!.x).toBeGreaterThan(title!.x);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await second.scrollIntoViewIfNeeded();
  const brand = second.getByRole("img");
  await expect.poll(() => brand.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});
