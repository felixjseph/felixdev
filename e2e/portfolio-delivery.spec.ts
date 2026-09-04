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
    await expect(gallery.locator("figcaption")).toContainText(caption);
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
  const downloadLink = showDesktop ? desktopDownload : page.getByRole("link", { name: "Download CV" });
  const pendingDownload = page.waitForEvent("download");
  await downloadLink.click();
  expect((await pendingDownload).suggestedFilename()).toBe("felix-dev-cv.pdf");
  const response = await request.get("/downloads/felix-dev-cv.pdf");
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("Solara publishes three supplied previews and links to the live client project", async ({ page }) => {
  await page.goto("/");
  const project = page.locator("#projects article").filter({ has: page.getByRole("heading", { name: "Solara" }) });
  await project.scrollIntoViewIfNeeded();
  await expect(project.getByText("Web Developer")).toBeVisible();
  await expect(project.getByRole("link", { name: "Visit website" })).toHaveAttribute("href", "https://solaraservices.vercel.app/");
  await expect(project.getByRole("button", { name: "Service discovery", exact: true })).toHaveCount(0);
  await expect(project.getByRole("button", { name: "System starting points", exact: true })).toHaveCount(0);
  await expect(project.getByRole("button", { name: "Assessment inquiry", exact: true })).toHaveCount(0);
  await expect(project.getByRole("button", { name: "Pause preview slideshow" })).toBeVisible();
  await expect(page.locator("#projects figcaption")).toHaveCount(0);
  await expect(page.locator("#projects [class*='project-preview__toolbar']")).toHaveCount(0);
});

test("the mobile hero motion control clears the lower viewport edge", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".site-loader").waitFor({ state: "detached" });
  const control = await page.getByRole("button", { name: "Pause hero animation" }).boundingBox();
  const lowerClearance = 844 - (control!.y + control!.height);
  expect(lowerClearance).toBeGreaterThanOrEqual(10);
  expect(lowerClearance).toBeLessThanOrEqual(32);
});

test("compact sections fit narrow viewports and follow the active theme", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
      const testimonial = page.locator("#testimonial figure[aria-hidden='false']");
      await testimonial.scrollIntoViewIfNeeded();
      const colors = await testimonial.evaluate((element) => {
        const style = getComputedStyle(element);
        return { background: style.backgroundColor, color: style.color };
      });
      expect(colors.background).toBe("rgba(0, 0, 0, 0)");
      expect(colors.color).toBe(theme === "light" ? "rgb(10, 10, 10)" : "rgb(245, 245, 241)");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    {
      const [identity, dot, text] = await Promise.all([
        page.locator(".hero-identity").boundingBox(),
        page.locator(".hero-identity__dot").boundingBox(),
        page.locator(".hero-identity__text").boundingBox(),
      ]);
      expect(Math.abs((dot!.y + dot!.height / 2) - (text!.y + text!.height / 2))).toBeLessThan(1);
      expect(identity!.width).toBeLessThan(width);
    }
  }
});
