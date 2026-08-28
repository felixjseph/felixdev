# Felixdev Conversion and Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the portfolio with a protected inquiry flow, meaningful analytics, production metadata, verified launch assets, accessibility coverage, and an evidence-backed Vercel deployment.

**Architecture:** Keep inquiry validation and email delivery behind a server-only service boundary, with Resend as a replaceable mailer adapter and recoverable client form states. Add privacy-conscious analytics through a typed event wrapper, generate metadata through App Router conventions, and make production release contingent on automated asset, content, accessibility, build, and browser gates.

**Tech Stack:** Next.js App Router, React, TypeScript, Zod, Resend, Vercel Web Analytics, Vitest, Testing Library, Playwright, axe-core, Lighthouse, Vercel

**Spec:** `docs/superpowers/specs/2026-08-28-felixdev-portfolio-design.md`

## Global Constraints

- Primary conversion is a short project inquiry; email and LinkedIn remain alternatives.
- Form fields: name, email, project type, optional company, and `What are you trying to improve?`.
- Do not require an account, booking step, budget, or timeline.
- Browser validation improves usability; server-side Zod validation is authoritative.
- Preserve form values after recoverable errors and block duplicate in-flight submissions.
- Provider credentials remain server-only.
- Add a honeypot plus elapsed-time abuse check; do not claim this is durable distributed rate limiting.
- Do not send inquiry message content to analytics.
- Use Vercel page-view analytics; custom events require a Vercel plan that supports them.
- Launch requires an edited real portrait, verified project media, permissioned named testimonials, a redesigned résumé PDF, public contact links, and final domain settings.
- The Portfolio AI assistant, AI Sayu suggestions, WebGL gallery, framework page, blog, and CMS remain post-MVP.
- Do not push or deploy without an explicit execution-time authorization checkpoint.

## File Structure

```text
.
├── .env.example                              # Public URL and server-only mail settings
├── docs
│   └── resume
│       └── felix-castaneda-resume.docx       # Editable verified résumé source
├── scripts
│   └── validate-launch-assets.mjs            # Reject development fallbacks and missing assets
├── e2e
│   ├── accessibility.spec.ts                 # axe and reduced-motion checks
│   ├── inquiry.spec.ts                       # Success and recoverable failure flows
│   └── metadata.spec.ts                      # Canonical and social metadata checks
├── public
│   ├── felix-castaneda-resume.pdf            # Final redesigned résumé
│   └── images
│       ├── felix-portrait.webp               # Final edited Human Orbit portrait
│       ├── og-default.png                    # Default social preview fallback
│       └── projects                          # Final project screenshots
└── src
    ├── app
    │   ├── actions
    │   │   └── submit-inquiry.ts             # Server action and FormData adapter
    │   ├── manifest.ts                       # Web manifest
    │   ├── opengraph-image.tsx               # Generated default social image
    │   ├── robots.ts                         # Crawl policy
    │   ├── sitemap.ts                        # Homepage and project URLs
    │   └── layout.tsx                        # Metadata base and Vercel Analytics
    ├── components
    │   ├── analytics-link.tsx                # Typed client event link
    │   └── inquiry-form.tsx                  # Accessible project inquiry UI
    ├── content
    │   ├── contact.ts                        # Verified public email and LinkedIn
    │   └── testimonials.ts                   # Final permissioned testimonials
    ├── emails
    │   └── project-inquiry-email.tsx          # Plain, escaped inquiry notification
    ├── features
    │   └── inquiry
    │       ├── inquiry-service.test.ts        # Validation, abuse, delivery, error tests
    │       ├── inquiry-service.ts             # Provider-independent submission flow
    │       ├── schema.test.ts                 # Exact field constraints
    │       ├── schema.ts                      # Zod schema and public types
    │       ├── types.ts                       # Result and mailer contracts
    │       ├── resend-mailer.test.ts          # Adapter mapping test
    │       ├── resend-mailer.ts               # Server-only Resend adapter
    │       └── test-mailer.ts                 # Non-production E2E success/failure adapter
    └── lib
        ├── analytics.test.ts                  # Event allow-list tests
        └── analytics.ts                       # Privacy-safe event wrapper
```

---

### Task 1: Define the Inquiry Schema and Provider-Independent Service

**Files:**
- Create: `src/features/inquiry/schema.ts`
- Create: `src/features/inquiry/schema.test.ts`
- Create: `src/features/inquiry/types.ts`
- Create: `src/features/inquiry/inquiry-service.ts`
- Create: `src/features/inquiry/inquiry-service.test.ts`

**Interfaces:**
- Consumes: plain inquiry input and a `Mailer` implementation.
- Produces: `InquiryInput`, `InquiryResult`, `Mailer`, `createInquiryService({ mailer, now })`, and exact field-error records.

- [ ] **Step 1: Write failing schema tests**

Create `src/features/inquiry/schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { inquirySchema } from "./schema";

const valid = {
  name: "Avery Stone",
  email: "avery@example.com",
  projectType: "automation",
  company: "Northstar",
  message: "We need to remove repetitive order reconciliation work.",
  website: "",
  startedAt: Date.now() - 5_000,
};

describe("inquirySchema", () => {
  it("accepts the approved form shape", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid project types and short messages", () => {
    const result = inquirySchema.safeParse({
      ...valid,
      projectType: "branding",
      message: "Help",
    });
    expect(result.success).toBe(false);
  });

  it("allows an empty optional company", () => {
    expect(inquirySchema.safeParse({ ...valid, company: "" }).success).toBe(true);
  });
});
```

- [ ] **Step 2: Run the schema tests to verify they fail**

Run: `npx vitest run src/features/inquiry/schema.test.ts`

Expected: FAIL because `inquirySchema` does not exist.

- [ ] **Step 3: Implement the exact Zod schema**

Create `src/features/inquiry/schema.ts`:

```ts
import { z } from "zod";

export const projectTypes = ["full-stack", "automation", "ai", "not-sure"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  projectType: z.enum(projectTypes),
  company: z.string().trim().max(120).default(""),
  message: z.string().trim().min(20).max(2_000),
  website: z.string().max(200),
  startedAt: z.coerce.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
```

- [ ] **Step 4: Define the service contracts**

Create `src/features/inquiry/types.ts`:

```ts
import type { InquiryInput } from "./schema";

export type InquiryResult =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string }
  | { status: "invalid"; message: string; fieldErrors: Record<string, string[]> }
  | { status: "blocked"; message: string }
  | { status: "error"; message: string };

export type Mailer = {
  sendInquiry(input: InquiryInput): Promise<{ id: string }>;
};
```

- [ ] **Step 5: Write failing service tests**

Use a fake `Mailer`. Test all four outcomes:

```ts
expect((await service.submit(valid)).status).toBe("success");
expect((await service.submit({ ...valid, message: "short" })).status).toBe("invalid");
expect((await service.submit({ ...valid, website: "spam.example" })).status).toBe("blocked");
expect((await service.submit({ ...valid, startedAt: now - 500 })).status).toBe("blocked");
```

Also make the fake mailer reject and assert that the service returns `status: "error"` without exposing the provider error message.

- [ ] **Step 6: Run the service tests to verify they fail**

Run: `npx vitest run src/features/inquiry/inquiry-service.test.ts`

Expected: FAIL because `createInquiryService` does not exist.

- [ ] **Step 7: Implement the service**

`createInquiryService` receives `{ mailer, now }`. It:

1. Parses with `inquirySchema.safeParse`.
2. Returns `blocked` when the honeypot is nonempty.
3. Returns `blocked` when `now() - startedAt < 1_500` milliseconds or greater than 24 hours.
4. Calls `mailer.sendInquiry` once for valid input.
5. Returns `success` with `Thanks—your inquiry was sent. Felix will reply as soon as possible.`
6. Returns a generic recoverable `error` result when delivery throws.

- [ ] **Step 8: Verify and commit**

Run:

```powershell
npx vitest run src/features/inquiry/schema.test.ts src/features/inquiry/inquiry-service.test.ts
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/features/inquiry
git commit -m "feat: add validated inquiry service"
```

---

### Task 2: Add the Server-Only Resend Adapter and Action

**Files:**
- Create: `.env.example`
- Create: `src/emails/project-inquiry-email.tsx`
- Create: `src/features/inquiry/resend-mailer.ts`
- Create: `src/features/inquiry/resend-mailer.test.ts`
- Create: `src/app/actions/submit-inquiry.ts`

**Interfaces:**
- Consumes: `Mailer`, `InquiryInput`, `createInquiryService`, and server-only environment values.
- Produces: `resendMailer`, `submitInquiry(previousState, formData)`, and the client-safe `InquiryResult`.

- [ ] **Step 1: Install the server-only delivery dependencies**

Run:

```powershell
npm install resend server-only
```

Expected: npm exits `0` and updates `package.json` and `package-lock.json`.

- [ ] **Step 2: Document the exact environment contract**

Create `.env.example`:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_replace_with_resend_key
FELIXDEV_FROM_EMAIL=Felixdev Portfolio <portfolio@your-verified-domain.example>
FELIXDEV_TO_EMAIL=felixjosephcastaneda@gmail.com
NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS=false
```

Do not create or commit `.env.local`.

- [ ] **Step 3: Write the failing adapter mapping test**

Mock `resend.emails.send`, call `sendInquiry`, and assert the request contains:

```ts
expect(send).toHaveBeenCalledWith(
  expect.objectContaining({
    from: process.env.FELIXDEV_FROM_EMAIL,
    to: [process.env.FELIXDEV_TO_EMAIL],
    replyTo: "avery@example.com",
    subject: "Portfolio inquiry · Automation · Avery Stone",
  }),
);
```

Assert that missing `RESEND_API_KEY`, `FELIXDEV_FROM_EMAIL`, or `FELIXDEV_TO_EMAIL` throws `Inquiry email is not configured` before an API request.

- [ ] **Step 4: Run the adapter test to verify it fails**

Run: `npx vitest run src/features/inquiry/resend-mailer.test.ts`

Expected: FAIL because the adapter does not exist.

- [ ] **Step 5: Implement the email and adapter**

`ProjectInquiryEmail` must render only escaped React text fields and no `dangerouslySetInnerHTML`. Include name, email, project type, optional company, and message.

Add `import "server-only";` at the top of `resend-mailer.ts`. Instantiate `Resend` inside the method after validating environment values, not at module import time. Return the provider message ID and throw a generic error when Resend returns an error.

- [ ] **Step 6: Implement the server action**

Create `src/app/actions/submit-inquiry.ts`:

```ts
"use server";

import { createInquiryService } from "@/features/inquiry/inquiry-service";
import { resendMailer } from "@/features/inquiry/resend-mailer";
import type { InquiryResult } from "@/features/inquiry/types";

export async function submitInquiry(
  _previous: InquiryResult,
  formData: FormData,
): Promise<InquiryResult> {
  const service = createInquiryService({ mailer: resendMailer, now: Date.now });
  return service.submit(Object.fromEntries(formData.entries()));
}
```

Do not log form content.

- [ ] **Step 7: Verify and commit**

Run:

```powershell
npx vitest run src/features/inquiry/resend-mailer.test.ts
npm run typecheck
npm run lint
```

Expected: all commands exit `0` without real network calls.

Commit:

```powershell
git add .env.example package.json package-lock.json src/emails/project-inquiry-email.tsx src/features/inquiry/resend-mailer.ts src/features/inquiry/resend-mailer.test.ts src/app/actions/submit-inquiry.ts
git commit -m "feat: add server-only inquiry delivery"
```

---

### Task 3: Build the Recoverable Inquiry Form

**Files:**
- Create: `src/components/inquiry-form.tsx`
- Create: `src/components/inquiry-form.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `submitInquiry` and `InquiryResult` from Tasks 1–2.
- Produces: an accessible form section with pending, invalid, blocked, error, and success states.

- [ ] **Step 1: Write failing form tests**

Mock the server action and assert:

```tsx
expect(screen.getByLabelText("Name")).toBeRequired();
expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
expect(screen.getByLabelText("Company or team (optional)")).not.toBeRequired();
expect(screen.queryByLabelText(/budget/i)).not.toBeInTheDocument();
expect(screen.getByRole("button", { name: "Send project inquiry" })).toBeInTheDocument();
```

Add a submission test that returns a provider error, preserves the typed message, shows `Your inquiry could not be sent. Try again or email Felix directly.`, and re-enables the button.

- [ ] **Step 2: Run the form tests to verify they fail**

Run: `npx vitest run src/components/inquiry-form.test.tsx`

Expected: FAIL because `InquiryForm` does not exist.

- [ ] **Step 3: Implement the form**

Use `useActionState(submitInquiry, initialState)` and `useFormStatus()` in a nested submit button. Include:

- Native labels and inputs
- `autocomplete` values for name, email, and organization
- A visually hidden honeypot named `website` with `tabIndex={-1}`
- A hidden `startedAt` initialized once when the component mounts
- `aria-describedby` links from invalid fields to their errors
- `role="status"` for success and `role="alert"` for failure
- A direct `mailto:` link in the error state

Do not clear inputs on invalid or error results. Reset only after success.

- [ ] **Step 4: Replace the homepage contact preview**

Render `InquiryForm` inside the existing `#contact` section. Keep visible email and LinkedIn alternatives below the form.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npx vitest run src/components/inquiry-form.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/components/inquiry-form.tsx src/components/inquiry-form.test.tsx src/app/page.tsx
git commit -m "feat: add recoverable project inquiry form"
```

---

### Task 4: Add Privacy-Safe Analytics and Metadata

**Files:**
- Create: `src/lib/analytics.ts`
- Create: `src/lib/analytics.test.ts`
- Create: `src/components/analytics-link.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/manifest.ts`
- Create: `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/featured-work.tsx`
- Modify: `src/components/inquiry-form.tsx`

**Interfaces:**
- Consumes: `@vercel/analytics/next`, `@vercel/analytics`, `NEXT_PUBLIC_SITE_URL`, and `NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS`.
- Produces: `PortfolioEventName`, `trackPortfolioEvent(name)`, canonical metadata, sitemap, robots policy, manifest, and default Open Graph image.

- [ ] **Step 1: Write failing analytics allow-list tests**

Create `src/lib/analytics.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { portfolioEvents, trackPortfolioEvent } from "./analytics";

describe("portfolio analytics", () => {
  it("contains only approved event names", () => {
    expect(portfolioEvents).toEqual([
      "explore_work",
      "project_opened",
      "resume_downloaded",
      "sayu_builder_completed",
      "inquiry_started",
      "inquiry_submitted",
    ]);
  });

  it("does not accept event properties", () => {
    expect(trackPortfolioEvent.length).toBe(1);
  });
});
```

- [ ] **Step 2: Run the analytics tests to verify they fail**

Run: `npx vitest run src/lib/analytics.test.ts`

Expected: FAIL because the wrapper does not exist.

- [ ] **Step 3: Implement analytics without sensitive properties**

Create:

```ts
export const portfolioEvents = [
  "explore_work",
  "project_opened",
  "resume_downloaded",
  "sayu_builder_completed",
  "inquiry_started",
  "inquiry_submitted",
] as const;

export type PortfolioEventName = (typeof portfolioEvents)[number];

export function trackPortfolioEvent(name: PortfolioEventName): void {
  if (process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS !== "true") return;
  void import("@vercel/analytics").then(({ track }) => track(name));
}
```

Wrap only approved CTA and project links. Do not pass name, email, company, message, or URL query content.

- [ ] **Step 4: Add page-view analytics and metadata**

Render `<Analytics />` from `@vercel/analytics/next` in the root layout. Set `metadataBase` from a validated `NEXT_PUBLIC_SITE_URL`, use the approved title and headline, and configure canonical and Open Graph defaults.

Generate a P2 Signal Cobalt Open Graph image with `ImageResponse`, using text and geometric orbit nodes only; do not use the portrait until the final image rights and crop are approved.

- [ ] **Step 5: Add sitemap, robots, and manifest**

The sitemap includes `/`, `/work/sayu-cafe`, `/work/solara`, and `/work/pach-drugmart`. Robots allows crawling in production. Manifest names the app `Felix Castañeda — Full-Stack & AI Automation Developer` and uses P2 theme colors.

- [ ] **Step 6: Verify and commit**

Run:

```powershell
npx vitest run src/lib/analytics.test.ts
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit `0`.

Commit:

```powershell
git add src/lib/analytics.ts src/lib/analytics.test.ts src/components/analytics-link.tsx src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts src/app/manifest.ts src/app/opengraph-image.tsx src/components/featured-work.tsx src/components/inquiry-form.tsx
git commit -m "feat: add portfolio analytics and metadata"
```

---

### Task 5: Replace Development Content with Verified Launch Assets

**Files:**
- Create: `scripts/validate-launch-assets.mjs`
- Create: `src/content/contact.ts`
- Modify: `src/content/testimonials.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/content/sayu-builder-data.ts`
- Create: `docs/resume/felix-castaneda-resume.docx`
- Create: `public/felix-castaneda-resume.pdf`
- Create: `public/images/felix-portrait.webp`
- Create: final project images under `public/images/projects/`
- Modify: `package.json`

**Interfaces:**
- Consumes: user-provided portrait, project media, résumé content, public contact links, testimonial permission, and Sayu compatibility approval.
- Produces: `npm run validate:launch` and a repository with no development fallbacks in public content.

- [ ] **Step 1: Pause for the exact launch-content packet**

Request these items from Felix in one checkpoint:

1. Portrait photo selected for editing.
2. At least one approved screenshot for each project.
3. Testimonial quote, public name, public role, and explicit publication approval for each testimonial.
4. Résumé source content with dates and claims to verify.
5. Public email and LinkedIn URL.
6. Sayu menu option and compatibility matrix approval.
7. Production domain.

Do not fabricate or infer any missing value. Continue with Steps 2–6 only after the packet is supplied.

- [ ] **Step 2: Add final files at fixed public paths**

Use these stable paths:

```text
public/images/felix-portrait.webp
public/images/projects/sayu-01.webp
public/images/projects/solara-01.webp
public/images/projects/pach-01.webp
public/felix-castaneda-resume.pdf
```

Optimize raster images before committing. Update project media records with verified dimensions, alt text, and captions. Replace the portrait fallback in `HumanOrbit`.

For the portrait, inspect the selected source and use the image-editing skill to create a clean Human Orbit cutout/treatment while preserving Felix's real likeness. Keep the original source outside the public bundle unless Felix explicitly wants it published.

For the résumé, use the document-creation skill's render-and-verify workflow to create `docs/resume/felix-castaneda-resume.docx` and the matching `public/felix-castaneda-resume.pdf`. Use the approved public title, exclude the current US-based VA role, and include only dates, technologies, responsibilities, and outcomes Felix verifies. Visually inspect every rendered page before accepting the PDF.

- [ ] **Step 3: Add permissioned content**

Every testimonial record must satisfy the existing `Testimonial` type with `publicationApproved: true`. Use `apply_patch` to create `src/content/contact.ts` with `email` and `linkedin` set directly to the exact strings Felix supplies in Step 1 and export the object `as const`. Do not reuse the Git author email as the public contact address unless Felix explicitly approves that use.

- [ ] **Step 4: Approve Sayu production constraints**

Translate only Felix-approved compatibility rules into `Constraint[]`. Change `sayuCatalog.verification` from `development` to `approved` only after each rule has a user-supplied reason. Rerun all rule and builder tests for the approved matrix.

- [ ] **Step 5: Write the launch validator**

Create `scripts/validate-launch-assets.mjs` that checks required files with `fs.existsSync`, scans `src/content` and `src/components` for these forbidden launch strings, and exits `1` when any are found:

```js
const forbidden = [
  "DEVELOPMENT MEDIA FALLBACK",
  "portrait-fallback.svg",
  'verification: "development"',
];
```

Also fail when the résumé is smaller than 10 KB or when any required image is smaller than 20 KB. These size checks catch missing or dummy files; they do not prove visual quality.

Read `src/content/testimonials.ts` and require at least one `publicationApproved: true` record. Read `src/content/contact.ts` and fail if either public contact value is empty. These checks validate presence; the manual review still verifies permission and accuracy.

Add:

```json
{
  "scripts": {
    "validate:launch": "node scripts/validate-launch-assets.mjs"
  }
}
```

- [ ] **Step 6: Verify and commit the content packet**

Run:

```powershell
npm run validate:launch
npm run test:run
npm run typecheck
npm run lint
```

Expected: launch validation and all tests pass with no development fallback in rendered content.

Commit:

```powershell
git add scripts/validate-launch-assets.mjs package.json package-lock.json src/content src/components/human-orbit.tsx docs/resume/felix-castaneda-resume.docx public/felix-castaneda-resume.pdf public/images
git commit -m "content: add verified portfolio launch assets"
```

---

### Task 6: Add Accessibility, Failure-Path, and Metadata E2E Tests

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `playwright.config.ts`
- Modify: `src/app/actions/submit-inquiry.ts`
- Create: `src/features/inquiry/test-mailer.ts`
- Create: `e2e/accessibility.spec.ts`
- Create: `e2e/inquiry-success.spec.ts`
- Create: `e2e/inquiry-failure.spec.ts`
- Create: `e2e/metadata.spec.ts`

**Interfaces:**
- Consumes: the full production build, inquiry action, and launch metadata.
- Produces: automated axe scans, reduced-motion checks, mocked delivery success/failure checks, and canonical metadata verification.

- [ ] **Step 1: Install the browser accessibility dependency**

Run:

```powershell
npm install --save-dev @axe-core/playwright lighthouse cross-env
```

Expected: npm exits `0` and updates the lockfile.

- [ ] **Step 2: Write accessibility tests**

Create `e2e/accessibility.spec.ts`:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/work/sayu-cafe", "/work/solara", "/work/pach-drugmart"]) {
  test(`${path} has no serious axe violations`, async ({ page }) => {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? "")
    )).toEqual([]);
  });
}

test.use({ reducedMotion: "reduce" });
test("reduced motion bypasses Orbit Assembly", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

- [ ] **Step 3: Add inquiry success and failure E2E fixtures**

Create `src/features/inquiry/test-mailer.ts`:

```ts
import "server-only";
import type { Mailer } from "./types";

export function getTestMailer(mode: string | undefined): Mailer | null {
  if (process.env.NODE_ENV === "production") return null;
  if (mode === "success") {
    return { sendInquiry: async () => ({ id: "e2e-success" }) };
  }
  if (mode === "failure") {
    return {
      sendInquiry: async () => {
        throw new Error("E2E delivery failure");
      },
    };
  }
  return null;
}
```

In `submit-inquiry.ts`, choose the mailer with:

```ts
const mailer = getTestMailer(process.env.INQUIRY_MAILER_MODE) ?? resendMailer;
const service = createInquiryService({ mailer, now: Date.now });
```

Create `e2e/inquiry-success.spec.ts` to submit valid values and assert the success message appears once. Create `e2e/inquiry-failure.spec.ts` to submit the same values, assert the typed message remains, and assert the direct-email fallback is visible. Neither test may inspect or log the message outside the page assertions.

Guard the files so the default suite never contacts Resend:

```ts
// inquiry-success.spec.ts
test.skip(process.env.INQUIRY_MAILER_MODE !== "success", "Requires success test mailer");

// inquiry-failure.spec.ts
test.skip(process.env.INQUIRY_MAILER_MODE !== "failure", "Requires failure test mailer");
```

Never call Resend from E2E. The production guard in `getTestMailer` ensures the fake adapter cannot activate in a production build.

- [ ] **Step 4: Add metadata tests**

Check canonical links and social metadata on `/` and each project route:

```ts
await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedUrl);
await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Felix|Sayu|Solara|Pach/);
await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
```

- [ ] **Step 5: Run the full browser suite and commit**

Run:

```powershell
npm run build
npx cross-env INQUIRY_MAILER_MODE=success playwright test e2e/accessibility.spec.ts e2e/metadata.spec.ts e2e/inquiry-success.spec.ts --project=chromium
npx cross-env INQUIRY_MAILER_MODE=failure playwright test e2e/inquiry-failure.spec.ts --project=chromium
```

Expected: all active E2E tests pass and no serious or critical axe violations remain.

Commit:

```powershell
git add package.json package-lock.json playwright.config.ts src/app/actions/submit-inquiry.ts src/features/inquiry/test-mailer.ts e2e
git commit -m "test: cover accessibility and launch flows"
```

---

### Task 7: Run the Production Gate and Deploy

**Files:**
- Modify only files required by failures discovered during this gate.

**Interfaces:**
- Consumes: all completed tasks, verified environment values, GitHub `origin`, and a Vercel account/project.
- Produces: a verified production deployment and recorded deployment URL.

- [ ] **Step 1: Run the complete local gate**

Run:

```powershell
npm run validate:launch
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e -- --project=chromium
npx cross-env INQUIRY_MAILER_MODE=success playwright test e2e/inquiry-success.spec.ts --project=chromium
npx cross-env INQUIRY_MAILER_MODE=failure playwright test e2e/inquiry-failure.spec.ts --project=chromium
git diff --check
git status --short
```

Expected: every command exits `0`, `git diff --check` prints nothing, and the working tree is clean.

- [ ] **Step 2: Run a production Lighthouse check**

Start the production server in a separate terminal:

```powershell
npm run start
```

Then run:

```powershell
npx lighthouse http://127.0.0.1:3000 --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse-report.json
```

Inspect the report. Require Accessibility and SEO scores of at least 0.95 and no failed Core Web Vitals audits. Treat Performance below 0.90 as a release blocker unless the report proves the deficit comes from the local test environment rather than the application.

Delete `lighthouse-report.json` after recording the scores in the implementation handoff; do not commit the generated report.

- [ ] **Step 3: Request explicit push and deployment authorization**

Report the local verification evidence, the commit list, the current branch, and the exact GitHub remote. Ask Felix to authorize pushing `main` and creating or updating the Vercel project. Stop until authorization is received.

- [ ] **Step 4: Push the verified branch**

After authorization:

```powershell
git push -u origin main
```

Expected: GitHub accepts the branch and sets `origin/main` as upstream.

- [ ] **Step 5: Configure and deploy Vercel**

Connect the GitHub repository in Vercel, set the production environment values from `.env.example`, enable Web Analytics, verify the sending domain in Resend, and deploy `main`.

Do not paste secret values into terminal output, chat, source files, or screenshots.

- [ ] **Step 6: Run production smoke checks**

Against the real deployment URL, verify:

1. Homepage and all three project routes return `200`.
2. System theme and manual persistence work.
3. Reduced motion bypasses the intro.
4. Résumé download returns the final PDF.
5. Inquiry delivery reaches the configured inbox and reply-to is the visitor email.
6. Sitemap, robots, canonical, and Open Graph endpoints use the production domain.
7. Vercel page views appear; custom events appear only if the enabled Vercel plan supports them.

- [ ] **Step 7: Record the deployed state**

Create a final commit only if production verification required source changes. Otherwise, report the deployment URL, production commit hash, verification results, and any post-MVP items without creating an empty commit.

## Plan 3 Completion Gate

The MVP is complete only when:

- `npm run validate:launch` passes with real assets and permissioned content.
- Lint, typecheck, unit/component tests, production build, and E2E pass.
- Serious and critical axe violations are zero on the homepage and three project routes.
- The real inquiry reaches the configured inbox without exposing secrets.
- The deployed site uses the production domain in canonical and social metadata.
- The production commit hash matches the verified local commit.
- Post-MVP features remain absent or explicitly labeled planned.

## Current Official References

- Next.js installation and Node requirement: `https://nextjs.org/docs/app/getting-started/installation`
- Tailwind CSS with Next.js: `https://tailwindcss.com/docs/installation/framework-guides/nextjs`
- Motion for React installation: `https://motion.dev/docs/react-installation`
- Vitest test environments: `https://vitest.dev/guide/environment`
- Playwright installation: `https://playwright.dev/docs/intro`
- Resend with Next.js: `https://resend.com/nextjs`
- Vercel Web Analytics quickstart: `https://vercel.com/docs/analytics/quickstart`
