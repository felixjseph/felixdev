import { expect, test } from "@playwright/test";

test("opens the flagship project from the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click().catch(() => {});
  await page.getByRole("link", { name: /Sayu Café/i }).click();
  await expect(page).toHaveURL(/\/work\/sayu-cafe$/);
});

test("persists a manual dark theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("felixdev-theme");
    localStorage.setItem("felixdev-intro-v1", "1");
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("uses the dark system theme on a first visit", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    localStorage.removeItem("felixdev-theme");
    localStorage.setItem("felixdev-intro-v1", "1");
  });

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("keeps dark-theme accent and support surfaces at accessible contrast", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("felixdev-theme", "dark");
    localStorage.setItem("felixdev-intro-v1", "1");
  });
  await page.goto("/");

  const ratios = await page.locator(
    "[data-accent-surface='primary'], .human-orbit-node, .human-orbit-fallback-label",
  ).evaluateAll((elements) => {
    const luminance = (color: string) => {
      const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
      const linear = channels.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const ratio = (first: string, second: string) => {
      const lighter = Math.max(luminance(first), luminance(second));
      const darker = Math.min(luminance(first), luminance(second));
      return (lighter + 0.05) / (darker + 0.05);
    };

    return elements.map((element) => {
      const styles = getComputedStyle(element);
      return {
        className: element.getAttribute("class") ?? "",
        ratio: ratio(styles.color, styles.backgroundColor),
      };
    });
  });

  expect(ratios.length).toBeGreaterThanOrEqual(6);
  for (const result of ratios) {
    expect(result.ratio, String(result.className)).toBeGreaterThanOrEqual(4.5);
  }
});

test("keeps the fallback divider distinct from both adjacent mint fields", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("felixdev-intro-v1", "1");
  });
  await page.goto("/");

  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((currentTheme) => {
      document.documentElement.dataset.theme = currentTheme;
      document.documentElement.style.colorScheme = currentTheme;
    }, theme);

    const contrast = await page.locator(".human-orbit-fallback-label").evaluate(
      async (label) => {
        const channels = (color: string) => {
          if (color.startsWith("#")) {
            const hex = color.slice(1);
            return [0, 2, 4].map((offset) =>
              Number.parseInt(hex.slice(offset, offset + 2), 16),
            );
          }
          return color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        };
        const luminance = (color: string) => {
          const linear = channels(color).map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
        };
        const ratio = (first: string, second: string) => {
          const lighter = Math.max(luminance(first), luminance(second));
          const darker = Math.min(luminance(first), luminance(second));
          return (lighter + 0.05) / (darker + 0.05);
        };

        const labelStyles = getComputedStyle(label);
        const portrait = label.parentElement?.querySelector<HTMLImageElement>(
          ".human-orbit-portrait",
        );
        if (!portrait) {
          throw new Error("Human Orbit portrait is missing beside its fallback label");
        }
        const svg = await fetch(portrait.currentSrc || portrait.src).then((response) =>
          response.text(),
        );
        const portraitDocument = new DOMParser().parseFromString(svg, "image/svg+xml");
        const portraitMint = portraitDocument.querySelector("rect")?.getAttribute("fill");
        if (!portraitMint) {
          throw new Error("Fallback portrait background color is missing");
        }

        return {
          divider: labelStyles.borderTopColor,
          labelMint: labelStyles.backgroundColor,
          portraitMint,
          dividerToLabel: ratio(labelStyles.borderTopColor, labelStyles.backgroundColor),
          dividerToPortrait: ratio(labelStyles.borderTopColor, portraitMint),
        };
      },
    );

    const evidence = JSON.stringify({ theme, ...contrast });
    expect(contrast.dividerToLabel, evidence).toBeGreaterThanOrEqual(3);
    expect(contrast.dividerToPortrait, evidence).toBeGreaterThanOrEqual(3);
  }
});

test("keeps dark-theme intro structure visibly distinct", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("felixdev-theme", "dark");
    localStorage.removeItem("felixdev-intro-v1");
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeVisible();

  const ratios = await page.locator(".orbit-assembly-ring, .orbit-assembly-node").evaluateAll(
    (elements) => {
      const luminance = (color: string) => {
        const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        const linear = channels.map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      };
      const ratio = (first: string, second: string) => {
        const lighter = Math.max(luminance(first), luminance(second));
        const darker = Math.min(luminance(first), luminance(second));
        return (lighter + 0.05) / (darker + 0.05);
      };

      return elements.map((element) => {
        const styles = getComputedStyle(element);
        const comparison = element.classList.contains("orbit-assembly-ring")
          ? getComputedStyle(document.body).backgroundColor
          : styles.backgroundColor;
        return ratio(styles.borderTopColor, comparison);
      });
    },
  );

  expect(ratios).toHaveLength(4);
  for (const ratio of ratios) {
    expect(ratio).toBeGreaterThanOrEqual(3);
  }
});
