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
  await expect(dialog.getByRole("button", { name: "Next project image" })).toBeFocused();
  await dialog.getByRole("button", { name: "Next project image" }).click();
  await dialog.getByRole("button", { name: "Next project image" }).click();
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
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toHaveAttribute("data-playing", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(gallery).toHaveAttribute("data-playing", "false");
  await expect(gallery.getByRole("button", { name: /preview slideshow/ })).toHaveCount(0);
});

test("contact remains direct and footer controls share one visual size", async ({ page }) => {
  await page.goto("/");
  const contactHeading = page.getByRole("heading", { name: "Let’s build something useful." });
  await contactHeading.scrollIntoViewIfNeeded();
  await expect(contactHeading).toHaveAttribute("data-revealed", "true");
  await expect.poll(() => contactHeading.locator("[data-contact-type-char]").evaluateAll((characters) =>
    characters.some((character) => character.getAnimations().length > 0),
  )).toBe(true);
  await expect(page.getByRole("button", { name: "Copy email address" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Send me an email", exact: true }).first()).toHaveAttribute("href", "mailto:felixjosephcastaneda@gmail.com");
  const footer = page.getByRole("navigation", { name: "Footer navigation" });
  await expect(footer.getByRole("link", { name: "Send me an email" })).toHaveAttribute("href", "mailto:felixjosephcastaneda@gmail.com");
  await expect(footer.getByRole("link", { name: "Call Felix" })).toHaveAttribute("href", "tel:09432469897");
  const controls = await Promise.all([
    footer.getByRole("link", { name: "Back to top" }).locator("span").boundingBox(),
    footer.getByRole("link", { name: "Send me an email" }).boundingBox(),
    footer.getByRole("link", { name: "Call Felix" }).boundingBox(),
  ]);
  expect(new Set(controls.map((box) => `${box!.width}x${box!.height}`)).size).toBe(1);
  await footer.getByRole("link", { name: "Back to top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(150);
});

test("the first viewport contains the complete hero and no following section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".site-loader").waitFor({ state: "detached" });
  for (const viewport of [
    { width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 },
    { width: 1024, height: 600 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => window.scrollTo(0, 0));
    const about = await page.locator("#about").boundingBox();
    expect(about!.y).toBeGreaterThanOrEqual(viewport.height - 1);
    await expect(page.getByRole("heading", { name: /I build systems that turn busywork/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "View my work" })).toBeVisible();
  }
});

test("featured work floats without outer cards and uses three responsive visual layers", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const first = page.locator("#projects article").first();
  await first.scrollIntoViewIfNeeded();
  const shell = await first.evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, border: style.borderTopWidth, radius: style.borderRadius };
  });
  expect(shell.background).toBe("rgba(0, 0, 0, 0)");
  expect(shell.border).toBe("0px");
  expect(shell.radius).toBe("0px");
  const stage = first.getByRole("button", { name: "Expand Softpoint Enterprise previews" });
  await expect(stage.locator("[data-stack-position]")).toHaveCount(3);
  if (!isMobile) {
    const before = await stage.evaluate((element) => getComputedStyle(element).transform);
    const box = await stage.boundingBox();
    await page.mouse.move(box!.x + box!.width * 0.6, box!.y + box!.height * 0.45);
    await expect.poll(() => stage.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
    await expect(first.locator("span[class*='project-preview__shine']")).toHaveCSS("opacity", "0.55");
    const [front, leftRear, rightRear] = await Promise.all([
      stage.locator("[data-stack-position='0']").boundingBox(),
      stage.locator("[data-stack-position='1']").boundingBox(),
      stage.locator("[data-stack-position='2']").boundingBox(),
    ]);
    expect(front!.x - leftRear!.x).toBeGreaterThan(front!.width * 0.15);
    expect(rightRear!.x + rightRear!.width - (front!.x + front!.width)).toBeGreaterThan(front!.width * 0.15);
  }
});

test("testimonial carousel shows one compact entry and supports manual navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#testimonial");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("figure")).toHaveCount(1);
  await expect(section.getByText("Softpoint Enterprise")).toBeVisible();
  await section.getByRole("button", { name: "Next testimonial" }).click();
  await expect(section.getByText("Sayu Café")).toBeVisible();
  const activeTestimonial = section.getByRole("figure");
  await expect(activeTestimonial.getByText("Client testimonial")).toBeVisible();
  await expect(activeTestimonial.getByLabel("5 out of 5 stars")).toBeVisible();
  await expect(section.getByText(/not client-submitted/i)).toHaveCount(0);
});

test("testimonial autoplay advances only while visible and idle", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop coverage is sufficient for the shared carousel timer.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const section = page.locator("#testimonial");
  await section.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(section).toHaveAttribute("data-playing", "true");
  await expect(section.getByText("Softpoint Enterprise")).toBeVisible();
  await expect.poll(() => section.getByRole("figure").textContent(), { timeout: 9000 }).toContain("Sayu Café");
  const box = await section.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await expect(section).toHaveAttribute("data-playing", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section.getByRole("button", { name: /testimonial slideshow/ })).toHaveCount(0);
});

test("project rows alternate on desktop and stack without overflow on mobile", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const first = page.locator("#projects article").nth(0);
  const second = page.locator("#projects article").nth(1);
  const third = page.locator("#projects article").nth(2);
  for (const [row, side] of [[first, "left"], [second, "right"], [third, "left"]] as const) {
    const preview = await row.locator("figure").boundingBox();
    const title = await row.locator("h3").boundingBox();
    if (isMobile) expect(preview!.y).toBeLessThan(title!.y);
    else if (side === "left") expect(preview!.x).toBeLessThan(title!.x);
    else expect(preview!.x).toBeGreaterThan(title!.x);
  }
  if (isMobile) {
    const descriptions = page.locator("#projects [class*='featured-work__description'] p");
    await expect(descriptions).toHaveCount(3);
    for (const description of await descriptions.all()) {
      await expect.poll(() => description.evaluate((element) => getComputedStyle(element).textAlign)).toBe("left");
    }
    const content = first.locator("[class*='featured-work__content']");
    await expect.poll(() => content.evaluate((element) => getComputedStyle(element).textAlign)).toBe("left");
    await expect.poll(() => first.locator("[class*='featured-work__eyebrow']").evaluate((element) => getComputedStyle(element).justifyContent)).toBe("flex-start");
    await expect.poll(() => first.locator("[class*='work-technologies']").evaluate((element) => getComputedStyle(element).justifyContent)).toBe("flex-start");
    await expect.poll(() => first.locator("[class*='work-actions']").evaluate((element) => getComputedStyle(element).justifyContent)).toBe("flex-start");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await second.scrollIntoViewIfNeeded();
  const brand = second.getByRole("img");
  await expect.poll(() => brand.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await third.scrollIntoViewIfNeeded();
  await expect(third.getByRole("button", { name: "Expand Solara previews" }).locator("[data-stack-position]")).toHaveCount(3);
});

test("testimonial shell stays compact and centered at tablet width", async ({ page }) => {
  await page.setViewportSize({ width: 848, height: 912 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const shell = page.locator("#testimonial > div");
  await shell.scrollIntoViewIfNeeded();
  const bounds = await shell.boundingBox();
  const sectionBounds = await page.locator("#testimonial").boundingBox();
  expect(bounds!.width).toBeLessThan(848 * 0.9);
  expect(Math.abs((bounds!.x + bounds!.width / 2) - (sectionBounds!.x + sectionBounds!.width / 2))).toBeLessThan(2);
});

test("testimonial follows selected work with measured breathing room", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  for (const viewport of [{ width: 390, height: 844 }, { width: 1141, height: 912 }]) {
    await page.setViewportSize(viewport);
    const finalProject = page.locator("#projects article").last();
    const testimonialHeading = page.getByRole("heading", { name: /Good work. Good company./i });
    const [projectBounds, testimonialBounds] = await Promise.all([
      finalProject.boundingBox(),
      testimonialHeading.boundingBox(),
    ]);
    const gap = testimonialBounds!.y - (projectBounds!.y + projectBounds!.height);
    expect(gap).toBeGreaterThanOrEqual(64);
    expect(gap).toBeLessThanOrEqual(132);
  }
});

test("mobile project decks fan open as they enter the center viewing band", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The centered fan replaces hover only on mobile layouts.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const preview = page.locator("#projects article").first().getByRole("figure", { name: "Softpoint Enterprise project previews" });
  await preview.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(preview).toHaveAttribute("data-mobile-centered", "true");
  const stage = preview.getByRole("button", { name: "Expand Softpoint Enterprise previews" });
  const [front, leftRear, rightRear] = await Promise.all([
    stage.locator("[data-stack-position='0']").boundingBox(),
    stage.locator("[data-stack-position='1']").boundingBox(),
    stage.locator("[data-stack-position='2']").boundingBox(),
  ]);
  expect(front!.x - leftRear!.x).toBeGreaterThan(front!.width * 0.05);
  expect(rightRear!.x + rightRear!.width - (front!.x + front!.width)).toBeGreaterThan(front!.width * 0.05);
});

test("experience timeline follows viewport progress and keeps competencies divider-free", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const timeline = page.locator("#experience .experience-list");
  await timeline.scrollIntoViewIfNeeded();
  await expect.poll(() => timeline.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).getPropertyValue("--experience-progress")) || 0,
  )).toBeGreaterThan(0);

  if (!isMobile) {
    const beforePointer = await timeline.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--experience-progress")) || 0,
    );
    const bounds = await timeline.boundingBox();
    const viewport = page.viewportSize()!;
    const visibleLowerPoint = Math.min(viewport.height - 12, bounds!.y + bounds!.height - 12);
    await page.mouse.move(bounds!.x + bounds!.width * 0.5, visibleLowerPoint);
    await expect.poll(() => timeline.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--experience-progress")) || 0,
    )).toBeGreaterThan(beforePointer + 0.04);
  }

  const competencies = page.locator("#experience .experience-competencies > div");
  await expect(competencies).toHaveCSS("border-top-width", "0px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => timeline.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).getPropertyValue("--experience-progress")) || 0,
  )).toBe(1);
});
