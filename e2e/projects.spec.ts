import { expect, test } from "@playwright/test";

for (const [slug, title] of [
  ["sayu-cafe", "Sayu Café"],
  ["solara", "Solara"],
  ["pach-drugmart", "Pach Drugmart"],
] as const) {
  test(`${title} has a dedicated case study`, async ({ page }) => {
    await page.goto(`/work/${slug}`);

    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Case study chapters" })).toBeVisible();
  });
}

test("Sayu builder produces a drink summary", async ({ page }) => {
  await page.goto("/work/sayu-cafe");
  await page.getByRole("radio", { name: "Matcha" }).check();
  await page.getByRole("radio", { name: "Iced" }).check();

  await expect(page.getByRole("status")).toContainText("matcha");
});

test("Solara explains the document-first branch", async ({ page }) => {
  await page.goto("/work/solara");

  await expect(page.getByText("Answer from the document without calling Gemini")).toBeVisible();
});
