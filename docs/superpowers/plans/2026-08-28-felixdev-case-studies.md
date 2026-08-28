# Felixdev Case Studies and Sayu Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three truthful, statically generated case-study routes and the working rule-based Sayu product-discovery builder.

**Architecture:** Store project narratives in a discriminated typed content model and render them through reusable server components. Keep the Sayu compatibility engine pure and content-driven, then expose it through one client component; render Solara's document-first quotation routing and Pach Drugmart's analytics proof as static, accessible diagrams.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React, Vitest, Testing Library, Playwright

**Spec:** `docs/superpowers/specs/2026-08-28-felixdev-portfolio-design.md`

## Global Constraints

- Public project names: `Sayu Café`, `Solara`, and `Pach Drugmart`.
- Sayu is product discovery and café operations; do not describe branding or ordering.
- Sayu launch builder is deterministic and rule-based; future smart suggestions are visibly labeled `Planned`.
- Solara checks the approved pricing/quotation document first and does not call Gemini when the document can answer.
- Solara uses a lightweight Gemini model only when additional quotation assistance genuinely requires it.
- Do not publish the unverified `40%` workload-reduction claim.
- Pach Drugmart covers inventory, analytics, dashboard, transactions, and operational visibility.
- Do not use the name `PD Pach Drugmart` and do not claim record-management functionality.
- Proof states are exactly `shipped`, `prototype`, or `planned`.
- Critical project text remains server-rendered and available without motion or JavaScript.
- Project media must have explicit dimensions and useful alternative text.
- The case-study shell must be reusable; project-specific behavior belongs in focused components.

## File Structure

```text
src
├── app
│   └── work
│       └── [slug]
│           ├── not-found.tsx                   # Useful missing-project route
│           └── page.tsx                        # Static params, metadata, project dispatch
├── components
│   └── case-study
│       ├── case-study-hero.tsx                 # Project identity and summary
│       ├── case-study-navigation.tsx           # Chapter navigation and next project
│       ├── case-study-section.tsx              # Shared narrative section renderer
│       ├── pach-dashboard-preview.tsx          # Accessible analytics/dashboard proof
│       ├── project-gallery.tsx                 # Responsive screenshots and captions
│       ├── proof-state-badge.tsx                # Shipped/prototype/planned labels
│       └── solara-quotation-flow.tsx            # Document-first routing diagram
├── content
│   ├── projects.ts                             # All public project narratives
│   └── sayu-builder-data.ts                    # Approved options and compatibility data
├── features
│   └── sayu-builder
│       ├── drink-rules.test.ts                 # Pure compatibility and summary tests
│       ├── drink-rules.ts                      # Pure rules engine
│       ├── sayu-builder.test.tsx               # Interactive accessibility tests
│       ├── sayu-builder.tsx                    # Client-side product discovery UI
│       └── types.ts                            # Drink and constraint contracts
├── lib
│   ├── projects.test.ts                        # Slug/order/proof validation
│   └── projects.ts                             # Project lookup and static params helpers
└── types
    └── project.ts                              # Project content types
e2e
└── projects.spec.ts                            # Route, builder, and truthfulness flows
public
└── images
    └── projects
        ├── sayu-fallback.svg                   # Development image fallback
        ├── solara-fallback.svg                 # Development image fallback
        └── pach-fallback.svg                   # Development image fallback
```

---

### Task 1: Define and Validate the Project Content Model

**Files:**
- Create: `src/types/project.ts`
- Create: `src/content/projects.ts`
- Create: `src/lib/projects.ts`
- Create: `src/lib/projects.test.ts`
- Create: `public/images/projects/sayu-fallback.svg`
- Create: `public/images/projects/solara-fallback.svg`
- Create: `public/images/projects/pach-fallback.svg`

**Interfaces:**
- Consumes: exact case-study claims from the approved spec.
- Produces: `ProofState`, `CaseStudyProject`, `projects`, `getProjectBySlug(slug)`, `getProjectSlugs()`, and `getNextProject(slug)`.

- [ ] **Step 1: Write failing project-model tests**

Create `src/lib/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { getNextProject, getProjectBySlug, getProjectSlugs } from "./projects";

describe("project content", () => {
  it("exposes the three approved slugs in order", () => {
    expect(getProjectSlugs()).toEqual([
      "sayu-cafe",
      "solara",
      "pach-drugmart",
    ]);
  });

  it("uses only approved proof states", () => {
    const states = projects.flatMap((project) =>
      project.sections.flatMap((section) => section.proofState ?? []),
    );
    expect(states.every((state) => ["shipped", "prototype", "planned"].includes(state))).toBe(true);
  });

  it("keeps corrected public claims", () => {
    const text = JSON.stringify(projects);
    expect(text).not.toMatch(/PD Pach Drugmart/i);
    expect(text).not.toMatch(/ordering/i);
    expect(text).not.toMatch(/record management/i);
    expect(text).not.toMatch(/40%/i);
    expect(text).toMatch(/document-first/i);
  });

  it("cycles to the next project", () => {
    expect(getNextProject("pach-drugmart").slug).toBe("sayu-cafe");
    expect(getProjectBySlug("solara")?.title).toBe("Solara");
  });
});
```

- [ ] **Step 2: Run the project tests to verify they fail**

Run: `npx vitest run src/lib/projects.test.ts`

Expected: FAIL because the project content and helpers do not exist.

- [ ] **Step 3: Define the project types**

Create `src/types/project.ts`:

```ts
export type ProofState = "shipped" | "prototype" | "planned";

export type ProjectSection = {
  id: string;
  title: string;
  body: string[];
  proofState?: ProofState;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type CaseStudyProject = {
  slug: "sayu-cafe" | "solara" | "pach-drugmart";
  title: string;
  proofAngle: string;
  summary: string;
  technologies: string[];
  sections: ProjectSection[];
  media: ProjectMedia[];
};
```

- [ ] **Step 4: Add exact public content records**

Create three `CaseStudyProject` records with these mandatory chapter titles:

```ts
export const requiredChapterTitles = {
  "sayu-cafe": [
    "Business context and operational friction",
    "Responsive product discovery",
    "Daily audit reporting",
    "Inventory monitoring and low-stock alerts",
    "Rule-based drink builder",
    "Future smart suggestions",
  ],
  solara: [
    "Service context and quotation needs",
    "Application architecture",
    "Document-first answerability check",
    "Lightweight Gemini quotation assistance",
    "Deployment, domain, DNS, and analytics",
  ],
  "pach-drugmart": [
    "Operational context and inventory problems",
    "Information structure and core workflows",
    "Inventory analytics and operational dashboard",
    "Transaction handling and operational visibility",
  ],
} as const;
```

Mark Sayu's builder `shipped` only if the live portfolio implementation is complete; mark its future suggestions `planned`. Describe Solara's grounded route with the exact phrase `document-first`. Do not infer numeric results.

- [ ] **Step 5: Implement lookup helpers**

Create `src/lib/projects.ts`:

```ts
import { projects } from "@/content/projects";

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1 + projects.length) % projects.length];
}
```

- [ ] **Step 6: Add explicit fallback art**

Create three SVG files with the project name, P2 palette, and `DEVELOPMENT MEDIA FALLBACK` text. These are valid development assets, but Plan 3's launch audit must reject them for production.

- [ ] **Step 7: Verify and commit**

Run:

```powershell
npx vitest run src/lib/projects.test.ts
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/types/project.ts src/content/projects.ts src/lib/projects.ts src/lib/projects.test.ts public/images/projects
git commit -m "feat: add verified case study content model"
```

---

### Task 2: Build Static Case-Study Routes and Shared Components

**Files:**
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/app/work/[slug]/not-found.tsx`
- Create: `src/components/case-study/case-study-hero.tsx`
- Create: `src/components/case-study/case-study-navigation.tsx`
- Create: `src/components/case-study/case-study-section.tsx`
- Create: `src/components/case-study/project-gallery.tsx`
- Create: `src/components/case-study/proof-state-badge.tsx`
- Create: `src/components/case-study/case-study-shell.test.tsx`

**Interfaces:**
- Consumes: `CaseStudyProject`, `getProjectBySlug`, `getProjectSlugs`, and `getNextProject` from Task 1.
- Produces: static routes for all project slugs, per-project metadata, reusable section and proof components.

- [ ] **Step 1: Write the failing shared-shell test**

Render a Sayu fixture and assert:

```tsx
expect(screen.getByRole("heading", { level: 1, name: "Sayu Café" })).toBeInTheDocument();
expect(screen.getByText("Shipped")).toBeInTheDocument();
expect(screen.getByRole("navigation", { name: "Case study chapters" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /Next project: Solara/i })).toHaveAttribute("href", "/work/solara");
```

- [ ] **Step 2: Run the shell test to verify it fails**

Run: `npx vitest run src/components/case-study/case-study-shell.test.tsx`

Expected: FAIL because the shared components do not exist.

- [ ] **Step 3: Implement proof and narrative components**

`ProofStateBadge` maps exact display labels:

```ts
const proofLabels = {
  shipped: "Shipped",
  prototype: "Prototype",
  planned: "Planned",
} as const;
```

`CaseStudySection` renders an `<section aria-labelledby>` with body paragraphs and an optional proof badge. `CaseStudyNavigation` renders in-page chapter anchors plus the next-project link. `ProjectGallery` uses `next/image`, the supplied dimensions, alt text, and visible captions.

- [ ] **Step 4: Implement the dynamic static route**

In `page.tsx`:

```tsx
type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project
    ? { title: `${project.title} — Felix Castañeda`, description: project.summary }
    : {};
}
```

Call `notFound()` for an unknown slug. Render the shared shell and leave project-specific interactive slots for Tasks 4–6.

- [ ] **Step 5: Implement the useful not-found state**

Include a heading `Project not found`, a link back to `/#work`, and a link to `/#contact`.

- [ ] **Step 6: Verify and commit**

Run:

```powershell
npx vitest run src/components/case-study/case-study-shell.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: the build lists all three `/work/...` routes and exits `0`.

Commit:

```powershell
git add src/app/work src/components/case-study
git commit -m "feat: add reusable case study routes"
```

---

### Task 3: Implement the Data-Driven Sayu Rules Engine

**Files:**
- Create: `src/features/sayu-builder/types.ts`
- Create: `src/features/sayu-builder/drink-rules.ts`
- Create: `src/features/sayu-builder/drink-rules.test.ts`
- Create: `src/content/sayu-builder-data.ts`

**Interfaces:**
- Consumes: an approved option catalog and compatibility constraints.
- Produces: `DrinkSelection`, `DrinkCatalog`, `Constraint`, `getDisabledOptions(selection, catalog)`, `normalizeSelection(selection, catalog)`, and `createDrinkSummary(selection, catalog)`.

- [ ] **Step 1: Define the rule contracts**

Create `src/features/sayu-builder/types.ts`:

```ts
export type DrinkField = "base" | "sweetness" | "milk" | "temperature" | "texture";

export type DrinkSelection = Record<DrinkField, string>;

export type DrinkOption = {
  id: string;
  label: string;
};

export type Constraint = {
  when: Partial<DrinkSelection>;
  disallow: { field: DrinkField; optionIds: string[] };
  reason: string;
};

export type DrinkCatalog = {
  options: Record<DrinkField, DrinkOption[]>;
  constraints: Constraint[];
  verification: "development" | "approved";
};

export type DisabledOption = {
  field: DrinkField;
  optionId: string;
  reason: string;
};
```

- [ ] **Step 2: Write failing rules tests with a self-contained fixture**

Create a fixture in `drink-rules.test.ts` where `{ base: "seasonal", temperature: "hot" }` disallows texture `foamy`. This rule is test-only and must not be copied into production Sayu data.

Assert:

```ts
expect(getDisabledOptions(selection, fixtureCatalog)).toContainEqual({
  field: "texture",
  optionId: "foamy",
  reason: "The test seasonal recipe is served without foam.",
});
expect(normalizeSelection({ ...selection, texture: "foamy" }, fixtureCatalog).texture).toBe("clean");
expect(createDrinkSummary(selection, fixtureCatalog)).toBe(
  "Hot seasonal · balanced sweetness · oat milk · clean texture",
);
```

- [ ] **Step 3: Run the rules tests to verify they fail**

Run: `npx vitest run src/features/sayu-builder/drink-rules.test.ts`

Expected: FAIL because the rules functions do not exist.

- [ ] **Step 4: Implement the pure engine**

Implement matching as an exact partial-object comparison. `getDisabledOptions` returns a de-duplicated list from all matching constraints. `normalizeSelection` replaces any disabled selected value with the first non-disabled catalog option for that field. `createDrinkSummary` resolves labels from the catalog and returns:

```ts
`${temperature} ${base} · ${sweetness} sweetness · ${milk} · ${texture} texture`
```

with only the first word capitalized.

- [ ] **Step 5: Add safe development catalog data**

Create `src/content/sayu-builder-data.ts` with the approved choice groups from the spec:

```ts
import type { DrinkCatalog, DrinkOption } from "@/features/sayu-builder/types";

function option(id: string): DrinkOption {
  return {
    id,
    label: id.replace(/\b\w/g, (letter) => letter.toUpperCase()),
  };
}

export const sayuCatalog: DrinkCatalog = {
  verification: "development",
  options: {
    base: ["coffee", "matcha", "hojicha", "seasonal"].map(option),
    sweetness: ["unsweetened", "light", "balanced", "sweet"].map(option),
    milk: ["whole milk", "oat milk", "almond milk", "no milk"].map(option),
    temperature: ["iced", "hot"].map(option),
    texture: ["clean", "creamy", "foamy"].map(option),
  },
  constraints: [],
};
```

Use an `option(id)` helper that title-cases labels. An empty constraint list avoids inventing Sayu recipe restrictions. Before launch, Felix must approve a real compatibility matrix; until then the route displays `Prototype menu data` even though the engine and UI work.

- [ ] **Step 6: Run tests and commit**

Run:

```powershell
npx vitest run src/features/sayu-builder/drink-rules.test.ts
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/features/sayu-builder/types.ts src/features/sayu-builder/drink-rules.ts src/features/sayu-builder/drink-rules.test.ts src/content/sayu-builder-data.ts
git commit -m "feat: add Sayu compatibility rules engine"
```

---

### Task 4: Build the Accessible Sayu Product-Discovery UI

**Files:**
- Create: `src/features/sayu-builder/sayu-builder.tsx`
- Create: `src/features/sayu-builder/sayu-builder.test.tsx`
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `sayuCatalog`, `getDisabledOptions`, `normalizeSelection`, and `createDrinkSummary` from Task 3.
- Produces: `SayuBuilder({ catalog }: { catalog: DrinkCatalog })` and a live summary announced with `aria-live="polite"`.

- [ ] **Step 1: Write failing interaction tests**

Create tests that render `SayuBuilder` with the Task 3 fixture and assert:

```tsx
expect(screen.getByRole("group", { name: "Choose your base" })).toBeInTheDocument();
await user.click(screen.getByRole("radio", { name: "Seasonal" }));
await user.click(screen.getByRole("radio", { name: "Hot" }));
expect(screen.getByRole("radio", { name: "Foamy" })).toBeDisabled();
expect(screen.getByText("The test seasonal recipe is served without foam.")).toBeInTheDocument();
expect(screen.getByRole("status")).toHaveTextContent("Hot seasonal");
```

- [ ] **Step 2: Run the UI tests to verify they fail**

Run: `npx vitest run src/features/sayu-builder/sayu-builder.test.tsx`

Expected: FAIL because `SayuBuilder` does not exist.

- [ ] **Step 3: Implement the builder**

Use one `<fieldset>` and `<legend>` per `DrinkField`. Use native radio inputs, keep disabled reasons in visible text, normalize invalid downstream selections immediately, and render the derived summary in `role="status" aria-live="polite"`.

Display one of these exact proof labels based on the catalog:

```ts
const dataLabel =
  catalog.verification === "approved"
    ? "Shipped · Approved menu rules"
    : "Prototype · Menu rules awaiting approval";
```

Below the builder, render the future concept as `Planned · Smart suggestions` and state that it is not active.

- [ ] **Step 4: Place the builder only on Sayu**

In the dynamic route, render `SayuBuilder` when `project.slug === "sayu-cafe"`. Do not load it for Solara or Pach Drugmart.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npx vitest run src/features/sayu-builder/sayu-builder.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/features/sayu-builder/sayu-builder.tsx src/features/sayu-builder/sayu-builder.test.tsx src/app/work/[slug]/page.tsx
git commit -m "feat: add interactive Sayu drink builder"
```

---

### Task 5: Add Solara's Grounded Quotation Flow

**Files:**
- Create: `src/components/case-study/solara-quotation-flow.tsx`
- Create: `src/components/case-study/solara-quotation-flow.test.tsx`
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: no live Gemini API; this component explains the already-built Solara architecture.
- Produces: a semantic ordered quotation-routing diagram with two explicit outcomes.

- [ ] **Step 1: Write the failing truthfulness test**

Assert:

```tsx
expect(screen.getByText("Search the approved quotation document")).toBeInTheDocument();
expect(screen.getByText("Answer from the document without calling Gemini")).toBeInTheDocument();
expect(screen.getByText("Use lightweight Gemini quotation assistance")).toBeInTheDocument();
expect(screen.queryByText(/40%/)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/case-study/solara-quotation-flow.test.tsx`

Expected: FAIL because the flow component does not exist.

- [ ] **Step 3: Implement the semantic flow**

Render an ordered list with these steps:

1. Receive a quotation or pricing question.
2. Search the approved quotation document.
3. Evaluate whether the document can answer.
4. Answer from the document without calling Gemini, or use lightweight Gemini quotation assistance within pricing guardrails.

Use visible labels rather than relying on arrows or color. Mark the feature `Shipped` only if Felix confirms the current Solara deployment contains this exact flow; otherwise mark it `Prototype` without changing the description.

- [ ] **Step 4: Place the flow only on Solara and verify**

Run:

```powershell
npx vitest run src/components/case-study/solara-quotation-flow.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit**

```powershell
git add src/components/case-study/solara-quotation-flow.tsx src/components/case-study/solara-quotation-flow.test.tsx src/app/work/[slug]/page.tsx
git commit -m "feat: explain Solara quotation routing"
```

---

### Task 6: Add Pach Drugmart Dashboard Proof and Project E2E Coverage

**Files:**
- Create: `src/components/case-study/pach-dashboard-preview.tsx`
- Create: `src/components/case-study/pach-dashboard-preview.test.tsx`
- Modify: `src/app/work/[slug]/page.tsx`
- Create: `e2e/projects.spec.ts`
- Modify: `e2e/home.spec.ts`

**Interfaces:**
- Consumes: Pach Drugmart content from Task 1 and all project routes.
- Produces: a static dashboard proof component and active end-to-end coverage for all three routes.

- [ ] **Step 1: Write the failing Pach claims test**

Assert that the preview contains `Inventory analytics`, `Operational dashboard`, and `Transaction visibility`, and does not contain `/record management/i` or `/PD Pach/i`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/case-study/pach-dashboard-preview.test.tsx`

Expected: FAIL because the preview does not exist.

- [ ] **Step 3: Implement the dashboard preview**

Render a semantic figure with three labeled cards: Inventory analytics, Operational dashboard, and Transaction visibility. Use `figcaption` to explain that the visualization represents the operational views described in the case study. Do not fabricate counts, revenue, stock totals, or chart values; use normalized axes and labels such as `Low`, `Stable`, and `Review`.

- [ ] **Step 4: Write complete project E2E tests**

Create `e2e/projects.spec.ts`:

```ts
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
```

Remove `test.fixme()` from the project-opening test in `e2e/home.spec.ts`.

- [ ] **Step 5: Run the Plan 2 verification gate**

Run:

```powershell
npm run verify
npm run test:e2e -- --project=chromium
git diff --check
```

Expected: all unit, component, build, and active Chromium tests pass; no case-study test remains skipped.

- [ ] **Step 6: Commit**

```powershell
git add src/components/case-study/pach-dashboard-preview.tsx src/components/case-study/pach-dashboard-preview.test.tsx src/app/work/[slug]/page.tsx e2e/projects.spec.ts e2e/home.spec.ts
git commit -m "feat: complete portfolio case study proofs"
```

## Plan 2 Completion Gate

Before starting Plan 3, verify:

```powershell
npm run verify
npm run test:e2e -- --project=chromium
git status --short
```

Expected:

- All three project routes are generated by the production build.
- Sayu rules and builder interaction tests pass.
- The Solara document-first path is visible and contains no unverified metric.
- Pach Drugmart contains analytics/dashboard proof and no disallowed name or record-management claim.
- `git status --short` is empty.
