import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"]) {
  test(`startup workflow fits and reveals the page in ${theme} mode`, async ({ page }, testInfo) => {
    await page.clock.install();
    await page.clock.pauseAt(new Date());
    await page.addInitScript((value) => localStorage.setItem("felixdev-theme", value), theme);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const loader = page.locator(".site-loader");
    await expect(loader).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(loader).toHaveCSS("pointer-events", "none");
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(page.locator(".skill-track")).toHaveCSS("animation-play-state", "running");
    await expect(page.locator(".site-loader__step")).toHaveCount(3);
    const shine = page.locator(".site-loader__statement em");
    expect(await shine.evaluate((element) => getComputedStyle(element, "::after").animationName)).toBe("loader-forward-shine");
    expect(await shine.evaluate((element) => getComputedStyle(element, "::after").backgroundClip)).toBe("text");
    await loader.evaluate((element) => {
      for (const animation of element.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = 1000;
        if ("animationName" in animation && animation.animationName === "loader-forward-shine") {
          animation.currentTime = 700;
        }
      }
    });
    const content = await page.locator(".site-loader__content").boundingBox();
    const viewport = page.viewportSize()!;
    expect(content!.x).toBeGreaterThanOrEqual(0);
    expect(content!.y).toBeGreaterThanOrEqual(0);
    expect(content!.x + content!.width).toBeLessThanOrEqual(viewport.width);
    expect(content!.y + content!.height).toBeLessThanOrEqual(viewport.height);
    await page.screenshot({ path: testInfo.outputPath(`startup-${theme}.png`) });
    await page.clock.runFor(1600);
    await expect(loader).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("reduced-motion startup is static and exits promptly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await page.goto("/");
  await expect(page.locator(".site-loader")).toBeVisible();
  expect(await page.locator(".site-loader").evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.clock.runFor(450);
  await expect(page.locator(".site-loader")).toHaveCount(0);
});

test("keyboard navigation bypasses startup", async ({ page }) => {
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await page.goto("/");
  await expect(page.locator(".site-loader")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(".site-loader")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});
