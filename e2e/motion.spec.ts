import { expect, test } from "@playwright/test";

test("reveals section titles and copy once and keeps focused controls readable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-loader")).toHaveCount(0);
  const bodyWidth = await page.locator("body").evaluate((element) => element.getBoundingClientRect().width);

  for (const selector of [
    "#about-heading", "#skills-heading", "#projects-heading",
    ".project-story p", "#testimonial-heading", "#experience-heading", "#contact-heading",
  ]) {
    const element = page.locator(selector).first();
    const reveal = element.locator("xpath=ancestor-or-self::*[@data-reveal][1]");
    await element.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveAttribute("data-revealed", "true");
    await expect.poll(() => reveal.evaluate((node) => node.getAnimations().length)).toBe(0);
    await expect(reveal).toHaveCSS("opacity", "1");
  }

  const email = page.locator(".contact-email-button");
  await email.focus();
  await expect(email).toBeFocused();
  await expect(email).toHaveCSS("opacity", "1");
  expect(await email.evaluate((node) => node.getAnimations().length)).toBe(0);

  await page.locator("#about-heading").scrollIntoViewIfNeeded();
  expect(await page.locator("#about-heading").evaluate((node) => node.getAnimations().length)).toBe(0);
  expect(await page.locator("body").evaluate((element) => element.getBoundingClientRect().width)).toBe(bodyWidth);
  await expect(page.locator(".skill-track")).toHaveCSS("animation-play-state", "running");
});

test("honors motion preference changes without hiding any section", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-loader")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#experience-heading").scrollIntoViewIfNeeded();
  await expect(page.locator(".site-nav")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".skill-track")).toHaveCSS("animation-name", "none");
  await expect.poll(() => page.locator("[data-reveal]").evaluateAll((nodes) =>
    nodes.every((node) => node.getAnimations().length === 0 && getComputedStyle(node).opacity === "1"),
  )).toBe(true);
  await expect(page.locator("html")).toHaveCSS("scrollbar-gutter", "stable");
});

test("keeps content and navigation visible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expect(page.locator(".site-loader")).toBeHidden();
    await expect(page.locator(".site-nav")).toHaveCSS("opacity", "1");
    await expect(page.locator("#hero-heading")).toHaveCSS("opacity", "1");
    await expect(page.locator(".hero-keyword")).toHaveCSS("animation-name", "none");
    await page.locator("#contact-heading").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact-heading")).toBeInViewport();
    await expect(page.locator(".contact-email-button")).toBeVisible();
  } finally {
    await context.close();
  }
});

test("starts reveals at the first visible sliver without requiring more scrolling", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-loader")).toHaveCount(0);
  for (const selector of [
    "#skills-heading", "#projects-heading", ".project-feature__visual",
    "#testimonial-heading", "#experience-heading", "#contact-heading",
  ]) {
    const target = page.locator(selector).first();
    await expect(target).not.toHaveAttribute("data-revealed", "true");
    const scrollTop = await target.evaluate((element) => {
      window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - window.innerHeight + 2, behavior: "instant" });
      return window.scrollY;
    });
    // Stop at just two pixels of visibility, including for a tall project visual.
    await expect(target).toHaveAttribute("data-revealed", "true");
    await expect.poll(() => target.evaluate((element) => element.getAnimations().length)).toBe(0);
    await expect(target).toHaveCSS("opacity", "1");
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollTop);
  }
});

test("hero loop is continuous, controllable, and suspended outside the viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-loader")).toHaveCount(0);
  const keyword = page.locator(".hero-keyword");
  const light = page.locator(".hero-light-drift span").first();
  await expect(keyword).toHaveCSS("animation-play-state", "running");
  await expect(light).toHaveCSS("animation-play-state", "running");
  const firstTime = await keyword.evaluate((element) => Number(element.getAnimations()[0].currentTime));
  await expect.poll(() => keyword.evaluate((element) => Number(element.getAnimations()[0].currentTime))).toBeGreaterThan(firstTime + 100);

  await page.getByRole("button", { name: "Pause hero animation" }).click();
  await expect(keyword).toHaveCSS("animation-play-state", "paused");
  await expect(light).toHaveCSS("animation-play-state", "paused");
  await expect(page.locator(".skill-track")).toHaveCSS("animation-play-state", "running");
  const pausedTime = await keyword.evaluate((element) => Number(element.getAnimations()[0].currentTime));
  await page.getByRole("button", { name: "Resume hero animation" }).click();
  await expect(keyword).toHaveCSS("animation-play-state", "running");
  expect(await keyword.evaluate((element) => Number(element.getAnimations()[0].currentTime))).toBeGreaterThanOrEqual(pausedTime);

  await page.locator("#projects-heading").scrollIntoViewIfNeeded();
  await expect(keyword).toHaveCSS("animation-play-state", "paused");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(keyword).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(keyword).toHaveCSS("animation-name", "none");
  await expect(light).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-motion-toggle")).toBeHidden();
});
