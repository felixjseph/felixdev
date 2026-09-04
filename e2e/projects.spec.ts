import { expect, test } from "@playwright/test";

for (const [slug, title] of [
  ["sayu-cafe", "Sayu Café"],
  ["solara", "Solara"],
  ["pach-drugmart", "Pach Drugmart"],
] as const) {
  test(`${title} has a dedicated case study`, async ({ page }) => {
    await page.goto(`/work/${slug}`);

    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNavigation).toBeVisible();
    const desktopProjectsLink = primaryNavigation.getByRole("link", { name: "Projects" });
    if (await desktopProjectsLink.count()) {
      await expect(desktopProjectsLink).toHaveAttribute("href", "/#projects");
      await expect(primaryNavigation.getByRole("link", { name: "Contact" })).toHaveAttribute(
        "href",
        "/#contact",
      );
    } else {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const mobileNavigation = page.getByRole("navigation", { name: "Mobile" });
      await expect(mobileNavigation.getByRole("link", { name: "Projects" }))
        .toHaveAttribute("href", "/#projects");
      await expect(mobileNavigation.getByRole("link", { name: "Contact" }))
        .toHaveAttribute("href", "/#contact");
    }
    await expect(page.getByRole("button", { name: /Switch to (light|dark) theme/ })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Case study chapters" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}

test("Sayu builder produces a drink summary", async ({ page }) => {
  await page.goto("/work/sayu-cafe");
  await page.getByRole("radio", { name: "Matcha" }).check();
  await page.getByRole("radio", { name: "Iced" }).check();

  await expect(page.getByRole("status")).toContainText("matcha");
});

test("Solara presents the shipped client website and approved project gallery", async ({ page }) => {
  await page.goto("/work/solara");

  await expect(page.getByText("Web Developer")).toBeVisible();
  await expect(page.getByRole("region", { name: "Solara project gallery" }).getByRole("img")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "A clear path from interest to inquiry" })).toBeVisible();
  await expect(page.getByText(/Gemini quotation/i)).toHaveCount(0);
});
