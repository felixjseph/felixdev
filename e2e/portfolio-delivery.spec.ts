import { expect, test } from "@playwright/test";

test("Softpoint previews switch accessibly and link to the live project", async ({ page }) => {
  await page.goto("/work/softpoint-enterprise");
  const gallery = page.getByRole("figure", { name: "Softpoint Enterprise project previews" });
  for (const [caption, alt] of [
    ["Website", /website introducing/i],
    ["Client portal", /client portal sign-in/i],
    ["Operations", /operations dashboard/i],
  ] as const) {
    const control = gallery.getByRole("button", { name: caption });
    await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "true");
    const image = gallery.getByRole("img", { name: alt });
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    await expect(gallery.getByRole("img")).toHaveCount(1);
  }
  await expect(page.getByRole("link", { name: "Visit live website" })).toHaveAttribute("href", "https://www.softpointenterprise.com/");
});

test("the official CV is downloadable from the responsive navigation", async ({ page, request }) => {
  await page.goto("/");
  const desktopDownload = page.getByRole("link", { name: "Resume", exact: true });
  const showDesktop = await desktopDownload.isVisible();
  if (!showDesktop) await page.getByRole("button", { name: "Open navigation menu" }).click();
  const downloadLink = showDesktop ? desktopDownload : page.getByRole("link", { name: "Download résumé" });
  const pendingDownload = page.waitForEvent("download");
  await downloadLink.click();
  expect((await pendingDownload).suggestedFilename()).toBe("felix-dev-cv.pdf");
  const response = await request.get("/downloads/felix-dev-cv.pdf");
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("compact sections fit narrow viewports and follow the active theme", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
      const testimonial = page.locator("#testimonial figure");
      await testimonial.scrollIntoViewIfNeeded();
      const colors = await testimonial.evaluate((element) => {
        const style = getComputedStyle(element);
        return { background: style.backgroundColor, color: style.color };
      });
      expect(colors.background).toBe(theme === "light" ? "rgb(255, 255, 255)" : "rgb(14, 14, 14)");
      expect(colors.color).toBe(theme === "light" ? "rgb(10, 10, 10)" : "rgb(245, 245, 241)");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    if (width <= 600) {
      const [identity, name, role] = await Promise.all([
        page.locator(".hero-identity").boundingBox(),
        page.locator(".hero-identity__name").boundingBox(),
        page.locator(".hero-identity__role").boundingBox(),
      ]);
      expect(role!.y).toBeGreaterThan(name!.y);
      expect(identity!.width).toBeLessThan(width);
    }
  }
});
