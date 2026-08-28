# Felixdev Foundation and Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready Felixdev application shell and approved proof-first homepage, including the system-aware theme, Orbit Assembly intro, Human Orbit hero, credibility, work, capability, about, testimonial, and FAQ sections.

**Architecture:** Use a Next.js App Router application that renders content on the server and isolates theme and motion behavior in small client components. Keep copy in typed local content modules, use CSS custom properties as the theme contract, and test pure preference logic separately from rendered interactions.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React, Vitest, Testing Library, Playwright, npm

**Spec:** `docs/superpowers/specs/2026-08-28-felixdev-portfolio-design.md`

## Global Constraints

- Public title: `Full-Stack & AI Automation Developer`.
- Hero headline: `Software that works. Automation that keeps working.`
- Primary hero action: `Explore my work`; secondary action: `Download résumé`.
- Homepage order: Orbit Assembly, Human Orbit hero, credibility, featured work, capabilities, experience, testimonials/FAQ, inquiry preview.
- Palette: P2 Signal Cobalt with the exact light and dark tokens in the design spec.
- First theme follows `prefers-color-scheme`; a manual choice persists without a wrong-theme flash.
- Motion is cinematic but controlled; every animated state has a reduced-motion equivalent.
- Use CSS 3D and Motion; do not add WebGL to the MVP.
- Do not mention Felix's current US-based VA work.
- Do not publish unverified metrics, client counts, ratings, or testimonials.
- Node.js must be `>=20.9`; the current workspace runtime is Node `v24.11.1`.
- Use npm and commit `package-lock.json`.
- Keep `.superpowers/` out of source control.

## File Structure

```text
.
├── .gitignore                         # Ignore generated, secret, and brainstorming state
├── package.json                       # Scripts and dependencies
├── package-lock.json                  # Locked dependency graph
├── next.config.ts                     # Next.js configuration
├── next-env.d.ts                      # Next.js ambient type declarations
├── postcss.config.mjs                 # Tailwind PostCSS plugin
├── tsconfig.json                      # Strict TypeScript and @/* alias
├── vitest.config.ts                   # Unit/component test configuration
├── vitest.setup.ts                    # jest-dom and browser API shims
├── playwright.config.ts               # Browser-flow test configuration
├── e2e/home.spec.ts                   # Homepage and preference smoke flows
└── src
    ├── app
    │   ├── globals.css                # P2 tokens, reset, typography, motion fallbacks
    │   ├── layout.tsx                 # Fonts, metadata, early theme script, app shell
    │   └── page.tsx                   # Approved H1 homepage composition
    ├── components
    │   ├── about-section.tsx          # Concise professional approach
    │   ├── capabilities-section.tsx   # Three service lanes
    │   ├── credibility-band.tsx       # Grounded expertise and approved quote slot
    │   ├── faq-section.tsx            # Accessible FAQ disclosure
    │   ├── featured-work.tsx          # Three project previews
    │   ├── human-orbit.tsx            # Client-side pointer/reduced-motion hero visual
    │   ├── orbit-assembly.tsx         # Versioned first-visit intro gate
    │   ├── site-footer.tsx            # Public contact alternatives and legal footer
    │   ├── site-header.tsx            # Sticky desktop/mobile navigation
    │   ├── testimonials-section.tsx   # Permissioned testimonial rendering
    │   └── theme-toggle.tsx            # Accessible persistent theme control
    ├── content
    │   ├── homepage.ts                # Approved homepage copy and capability data
    │   └── testimonials.ts            # Publication-safe testimonial records
    └── lib
        ├── intro-preference.test.ts   # Intro storage and preference unit tests
        ├── intro-preference.ts        # Versioned intro decision functions
        ├── theme.test.ts              # Theme resolution unit tests
        └── theme.ts                   # Theme types, constants, and pure resolution logic
```

---

### Task 1: Scaffold the App and Test Harness

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: Node.js `>=20.9`, npm, the approved design spec.
- Produces: npm scripts `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:run`, `test:e2e`, and `verify`; `@/*` resolves to `src/*`.

- [ ] **Step 1: Initialize the package and install the runtime dependencies**

Run:

```powershell
npm init -y
npm install next@latest react@latest react-dom@latest motion zod @vercel/analytics
npm install --save-dev typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @playwright/test
```

Expected: npm exits `0` and creates `package-lock.json`.

- [ ] **Step 2: Write the failing homepage smoke test**

Create `src/app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("states the approved role and headline", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: "Software that works. Automation that keeps working.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Full-Stack & AI Automation Developer")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Configure Vitest and run the smoke test to verify it fails**

Create `vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Run:

```powershell
npx vitest run src/app/page.test.tsx
```

Expected: FAIL because `src/app/page.tsx` does not yet export the approved page.

- [ ] **Step 4: Add the minimal application configuration and page**

Set these `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "verify": "npm run lint && npm run typecheck && npm run test:run && npm run build"
  }
}
```

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

Create `next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "coverage/**", "playwright-report/**"]),
]);
```

Create `src/app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main>
      <p>Full-Stack &amp; AI Automation Developer</p>
      <h1>Software that works. Automation that keeps working.</h1>
    </main>
  );
}
```

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix Castañeda — Full-Stack & AI Automation Developer",
  description: "Software that works. Automation that keeps working.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `src/app/globals.css`:

```css
@import "tailwindcss";

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}
```

- [ ] **Step 5: Add Playwright's base configuration**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  use: { baseURL: "http://127.0.0.1:3000", trace: "on-first-retry" },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
});
```

- [ ] **Step 6: Add repository exclusions**

Ensure `.gitignore` contains exactly the relevant generated and secret paths:

```gitignore
node_modules/
.next/
out/
coverage/
playwright-report/
test-results/
.env*
!.env.example
.superpowers/
```

- [ ] **Step 7: Run the harness and commit**

Run:

```powershell
npm run lint
npm run typecheck
npm run test:run
npm run build
git status --short
```

Expected: all four commands exit `0`; `.superpowers/` is absent from `git status`.

Commit:

```powershell
git add .gitignore package.json package-lock.json next.config.ts next-env.d.ts postcss.config.mjs tsconfig.json eslint.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts src/app
git commit -m "chore: scaffold portfolio application"
```

---

### Task 2: Implement P2 Theme Tokens and Persistence

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/lib/theme.test.ts`
- Create: `src/components/theme-toggle.tsx`
- Create: `src/components/theme-toggle.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: browser `prefers-color-scheme`, local storage key `felixdev-theme`.
- Produces: `type Theme = "light" | "dark"`; `resolveTheme(stored, prefersDark): Theme`; root attribute `data-theme`; accessible `ThemeToggle`.

- [ ] **Step 1: Write failing pure theme tests**

Create `src/lib/theme.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses a stored manual choice before system preference", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("uses the system preference without a stored choice", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });
});
```

- [ ] **Step 2: Run the theme tests to verify they fail**

Run: `npx vitest run src/lib/theme.test.ts`

Expected: FAIL because `resolveTheme` is not defined.

- [ ] **Step 3: Implement the pure theme contract**

Create `src/lib/theme.ts`:

```ts
export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "felixdev-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(stored: unknown, prefersDark: boolean): Theme {
  return isTheme(stored) ? stored : prefersDark ? "dark" : "light";
}
```

- [ ] **Step 4: Run the pure tests and verify they pass**

Run: `npx vitest run src/lib/theme.test.ts`

Expected: 2 tests PASS.

- [ ] **Step 5: Write the failing toggle test**

Create `src/components/theme-toggle.test.tsx` with a `matchMedia` stub, render `ThemeToggle`, click the button, and assert that `document.documentElement.dataset.theme` becomes `dark` and `localStorage.getItem("felixdev-theme")` equals `dark`.

Use this assertion shape:

```tsx
expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "Switch to dark theme" }));
expect(document.documentElement.dataset.theme).toBe("dark");
expect(localStorage.getItem("felixdev-theme")).toBe("dark");
```

- [ ] **Step 6: Run the toggle test to verify it fails**

Run: `npx vitest run src/components/theme-toggle.test.tsx`

Expected: FAIL because `ThemeToggle` does not exist.

- [ ] **Step 7: Implement the early theme script and toggle**

In `src/app/layout.tsx`, insert an inline script before interactive content that:

```js
const key = "felixdev-theme";
const stored = localStorage.getItem(key);
const theme = stored === "light" || stored === "dark"
  ? stored
  : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.dataset.theme = theme;
document.documentElement.style.colorScheme = theme;
```

Implement `ThemeToggle` as a client component that reads the root attribute after mount, toggles it, updates `colorScheme`, persists the value, and exposes the next action in its accessible name.

- [ ] **Step 8: Add exact light and dark tokens**

In `src/app/globals.css`, define:

```css
:root {
  --color-bg: #f7f7f2;
  --color-surface: #ffffff;
  --color-text: #111316;
  --color-accent: #2457ff;
  --color-support: #bce7d0;
}

:root[data-theme="dark"] {
  --color-bg: #0a0d14;
  --color-surface: #121826;
  --color-text: #f2f4f8;
  --color-accent: #6b8cff;
  --color-support: #9fe0c0;
}
```

Add global focus, selection, body background, and reduced-motion rules. Do not add decorative global gradients.

- [ ] **Step 9: Verify and commit**

Run:

```powershell
npx vitest run src/lib/theme.test.ts src/components/theme-toggle.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/lib/theme.ts src/lib/theme.test.ts src/components/theme-toggle.tsx src/components/theme-toggle.test.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add persistent signal cobalt themes"
```

---

### Task 3: Build the App Shell and Content Contract

**Files:**
- Create: `src/content/homepage.ts`
- Create: `src/content/testimonials.ts`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-header.test.tsx`
- Create: `src/components/site-footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` from Task 2.
- Produces: `homepageContent`, `capabilities`, `faqItems`, `Testimonial` records, `SiteHeader`, and `SiteFooter`.

- [ ] **Step 1: Define the content types and approved values**

Create `src/content/homepage.ts` with these exported contracts:

```ts
export type Capability = {
  title: string;
  description: string;
  proof: string;
};

export type FaqItem = { question: string; answer: string };

export const homepageContent = {
  role: "Full-Stack & AI Automation Developer",
  headline: "Software that works. Automation that keeps working.",
  primaryCta: "Explore my work",
  secondaryCta: "Download résumé",
} as const;
```

Populate `capabilities` with Full-stack products, Workflow automation, and AI-enabled tools. Populate FAQ answers using only approved, non-numeric claims from the design spec.

Create `src/content/testimonials.ts`:

```ts
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  publicationApproved: true;
};

export const testimonials: Testimonial[] = [];
```

An empty list is the correct pre-asset state; the component must omit the testimonial section rather than fabricate content.

- [ ] **Step 2: Write the failing header accessibility test**

Test that the header contains a `Home` link, anchor links for Work, Capabilities, About, and Contact, a résumé link, a `Start a project` link, and a button that opens the mobile menu with `aria-expanded="false"` initially.

- [ ] **Step 3: Run the header test to verify it fails**

Run: `npx vitest run src/components/site-header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 4: Implement the header and footer**

Implement a sticky `SiteHeader` with semantic `<nav aria-label="Primary">`, standard anchor links, `ThemeToggle`, and a client-controlled mobile disclosure. Close the mobile menu on link activation and Escape.

Implement `SiteFooter` with the public title, email/LinkedIn link slots, and the current year. Use explicit empty configuration values until Felix supplies public links; omit empty anchors.

- [ ] **Step 5: Add Manrope and IBM Plex Mono with `next/font/google`**

In `src/app/layout.tsx`, configure:

```tsx
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-mono",
});
```

Apply both variables to `<body>` and map them to the global typography rules.

- [ ] **Step 6: Verify and commit**

Run:

```powershell
npx vitest run src/components/site-header.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/content src/components/site-header.tsx src/components/site-header.test.tsx src/components/site-footer.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add portfolio shell and content contracts"
```

---

### Task 4: Implement Orbit Assembly and Human Orbit

**Files:**
- Create: `src/lib/intro-preference.ts`
- Create: `src/lib/intro-preference.test.ts`
- Create: `src/components/orbit-assembly.tsx`
- Create: `src/components/orbit-assembly.test.tsx`
- Create: `src/components/human-orbit.tsx`
- Create: `src/components/human-orbit.test.tsx`
- Create: `public/images/portrait-fallback.svg`

**Interfaces:**
- Consumes: Motion for React and the global reduced-motion contract.
- Produces: `shouldPlayIntro(seenVersion, reducedMotion): boolean`, storage key `felixdev-intro-v1`, `OrbitAssembly`, and `HumanOrbit`.

- [ ] **Step 1: Write failing intro decision tests**

Create tests asserting:

```ts
expect(shouldPlayIntro(null, false)).toBe(true);
expect(shouldPlayIntro("1", false)).toBe(false);
expect(shouldPlayIntro(null, true)).toBe(false);
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/lib/intro-preference.test.ts`

Expected: FAIL because `shouldPlayIntro` is undefined.

- [ ] **Step 3: Implement the intro preference function**

```ts
export const INTRO_VERSION = "1";
export const INTRO_STORAGE_KEY = "felixdev-intro-v1";

export function shouldPlayIntro(
  seenVersion: string | null,
  reducedMotion: boolean,
): boolean {
  return !reducedMotion && seenVersion !== INTRO_VERSION;
}
```

- [ ] **Step 4: Write failing component behavior tests**

For `OrbitAssembly`, assert that a first visit renders a `Skip intro` button, clicking it removes the overlay, and reduced motion renders no overlay. For `HumanOrbit`, assert that the portrait has useful alternative text and the workflow labels Build, Automate, and Improve are present as text.

- [ ] **Step 5: Run the component tests to verify they fail**

Run:

```powershell
npx vitest run src/components/orbit-assembly.test.tsx src/components/human-orbit.test.tsx
```

Expected: FAIL because the components do not exist.

- [ ] **Step 6: Implement the intro and hero visual**

Implement `OrbitAssembly` as a client component using Motion's `useReducedMotion`. Total animation duration must remain approximately `1.05` seconds. Persist `INTRO_VERSION` when the sequence completes or is skipped. The overlay must not trap keyboard focus and the skip control must be first in tab order.

Implement `HumanOrbit` with semantic hero content, a normal `next/image` portrait, CSS perspective, and Motion values derived from pointer position only when a fine pointer is present. Cap visual translation at 12px and return to neutral on pointer leave.

Create `public/images/portrait-fallback.svg` as an explicit Felix-initials development fallback. Keep its alt text `Felix Castañeda portrait placeholder`; the launch asset audit in Plan 3 must reject this file as the production portrait.

- [ ] **Step 7: Verify and commit**

Run:

```powershell
npx vitest run src/lib/intro-preference.test.ts src/components/orbit-assembly.test.tsx src/components/human-orbit.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/lib/intro-preference.ts src/lib/intro-preference.test.ts src/components/orbit-assembly.tsx src/components/orbit-assembly.test.tsx src/components/human-orbit.tsx src/components/human-orbit.test.tsx public/images/portrait-fallback.svg
git commit -m "feat: add orbit assembly and human orbit hero"
```

---

### Task 5: Build the Proof-First Homepage Sections

**Files:**
- Create: `src/components/credibility-band.tsx`
- Create: `src/components/featured-work.tsx`
- Create: `src/components/capabilities-section.tsx`
- Create: `src/components/about-section.tsx`
- Create: `src/components/testimonials-section.tsx`
- Create: `src/components/faq-section.tsx`
- Create: `src/components/home-sections.test.tsx`
- Modify: `src/content/homepage.ts`

**Interfaces:**
- Consumes: typed homepage content and the project-preview shape defined locally in this task.
- Produces: section IDs `work`, `capabilities`, `about`, `faq`, and `contact`; project links `/work/sayu-cafe`, `/work/solara`, and `/work/pach-drugmart`.

- [ ] **Step 1: Write failing section-order and claim tests**

Render the six sections in a test harness and assert:

```tsx
expect(screen.getByRole("heading", { name: "Featured work" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /Sayu Café/i })).toHaveAttribute("href", "/work/sayu-cafe");
expect(screen.getByRole("link", { name: /Solara/i })).toHaveAttribute("href", "/work/solara");
expect(screen.getByRole("link", { name: /Pach Drugmart/i })).toHaveAttribute("href", "/work/pach-drugmart");
expect(screen.queryByText(/virtual assistant/i)).not.toBeInTheDocument();
expect(screen.queryByText(/40%/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/home-sections.test.tsx`

Expected: FAIL because the sections do not exist.

- [ ] **Step 3: Add exact project-preview data**

Add to `src/content/homepage.ts`:

```ts
export const projectPreviews = [
  {
    slug: "sayu-cafe",
    title: "Sayu Café",
    summary: "Product discovery and practical café automation.",
    proof: "Rule-based builder, daily audit reporting, and low-stock alerts.",
  },
  {
    slug: "solara",
    title: "Solara",
    summary: "A solar-services platform with grounded quotation assistance.",
    proof: "Document-first pricing answers and lightweight Gemini assistance.",
  },
  {
    slug: "pach-drugmart",
    title: "Pach Drugmart",
    summary: "Inventory operations, analytics, and transaction visibility.",
    proof: "Operational dashboard and inventory insight.",
  },
] as const;
```

- [ ] **Step 4: Implement server-rendered sections**

Build each section as a semantic server component. Use standard links for every navigation target. The testimonial section returns `null` when `testimonials.length === 0`. The FAQ uses native `<details>` and `<summary>` unless a custom client disclosure is required by the final visual design.

Use CSS perspective on project cards only when `(hover: hover) and (pointer: fine)` matches. Do not put critical copy inside transformed screenshot layers.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npx vitest run src/components/home-sections.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/content/homepage.ts src/components/credibility-band.tsx src/components/featured-work.tsx src/components/capabilities-section.tsx src/components/about-section.tsx src/components/testimonials-section.tsx src/components/faq-section.tsx src/components/home-sections.test.tsx
git commit -m "feat: add proof-first homepage sections"
```

---

### Task 6: Compose the Homepage and Add Browser Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`
- Create: `e2e/home.spec.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: all components created in Tasks 2–5.
- Produces: the complete approved H1 homepage; stable E2E selectors through semantic roles and section IDs.

- [ ] **Step 1: Expand the failing homepage composition test**

Assert the document order using section IDs:

```tsx
const ids = Array.from(container.querySelectorAll("main > section")).map(
  (section) => section.id,
);
expect(ids).toEqual([
  "hero",
  "credibility",
  "work",
  "capabilities",
  "about",
  "testimonials",
  "faq",
  "contact",
]);
```

Permit the testimonial section component to render an empty, hidden slot until approved testimonials arrive, so the layout contract remains stable without showing fabricated content.

- [ ] **Step 2: Run the composition test to verify it fails**

Run: `npx vitest run src/app/page.test.tsx`

Expected: FAIL because `page.tsx` is still the Task 1 smoke page.

- [ ] **Step 3: Compose the approved homepage**

Render `OrbitAssembly` outside `<main>`, then render the hero and all H1 sections in the approved order. Add a compact contact preview linking to `#contact`; the functional form arrives in Plan 3.

- [ ] **Step 4: Write homepage E2E tests**

Create `e2e/home.spec.ts` with these flows:

```ts
import { expect, test } from "@playwright/test";

test("opens the flagship project from the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click().catch(() => {});
  await page.getByRole("link", { name: /Sayu Café/i }).click();
  await expect(page).toHaveURL(/\/work\/sayu-cafe$/);
});

test("persists a manual dark theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Switch to dark theme/i }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
```

The first test will remain red until Plan 2 creates the project route; mark only that test with `test.fixme()` and include the exact reason `Plan 2 creates project routes`. Do not skip the theme test.

- [ ] **Step 5: Install Chromium and run the browser checks**

Run:

```powershell
npx playwright install chromium
npm run test:e2e -- --project=chromium
```

Expected: theme persistence PASS; the explicitly marked route test reports as fixme, not failure.

- [ ] **Step 6: Run the Plan 1 verification gate**

Run:

```powershell
npm run verify
npm run test:e2e -- --project=chromium
git diff --check
```

Expected: lint, typecheck, unit/component tests, production build, and active E2E tests all pass; `git diff --check` prints nothing.

- [ ] **Step 7: Commit the composed homepage**

```powershell
git add src/app/page.tsx src/app/page.test.tsx src/app/globals.css e2e/home.spec.ts
git commit -m "feat: compose proof-first portfolio homepage"
```

## Plan 1 Completion Gate

Before starting Plan 2, verify:

```powershell
npm run verify
npm run test:e2e -- --project=chromium
git status --short
```

Expected:

- `npm run verify` exits `0`.
- Active Chromium E2E tests pass.
- The only intentionally deferred browser test is the project-route test labeled `Plan 2 creates project routes`.
- `git status --short` is empty.
