# Portfolio — Project Memory

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 — CSS-first config via `@theme` in `app/globals.css`
  (there is NO tailwind.config.js; do not create one. Use `@import "tailwindcss";`)
- Motion (`motion/react`) for animation
- MDX for blog posts (content lives in `content/blog/`) — not wired up yet;
  posts are currently placeholder entries in `lib/blog.ts` (`status: "draft"`)

## Architecture rules
- Default to Server Components. Only add `"use client"` when a component
  needs state, effects, event handlers, or browser APIs.
- Keep `"use client"` at the leaves of the tree, not on whole pages.
- Colocate components: shared UI primitives in `components/ui/`, page
  sections in `components/sections/`.
- ProjectCard is a single reusable component for all 4 featured projects
  (StartUpSphere, CineCity, Pach Drugmart, Sayu Café) — same template,
  different content. Do not create a separate one-off card for Sayu Café.
  Layout: black category pill badge (`project.category` — a factual label
  like "Web Platform" or "Capstone Project", not a superlative claim), a
  bordered icon-monogram square (initials, no real project images yet),
  title, description, rounded-pill stack tags, "View project" arrow-link.
  It's rendered inside `AnimatedProjectStack`
  (components/ui/animated-project-stack.tsx) as a rotated fan/deck — active
  card centered and upright, one neighbor peeking rotated left, one peeking
  rotated right (`origin-bottom` so the bottoms stay aligned and only the
  tops swing out), everything else hidden behind at opacity 0. Peek cards
  are themselves clickable (jump to front), plus explicit prev/next chevron
  buttons and clickable dot indicators below for keyboard/a11y. Reuse this
  fan pattern for any future card-based section instead of inventing a new
  interaction.
- A standalone page is only kept for a content type when its landing-page
  section shows a subset of that content (e.g. `/blog` — landing shows 3 of 5
  posts, `/blog` lists all of them). Remove the standalone page once the
  landing section already shows everything (this is why `/work` and
  `/certifications` don't exist — their content moved into landing sections
  in full).
- Landing sections share one container width: `mx-auto w-[80%]` (header, hero,
  and every section use it so edges align down the page).

## Design tokens — LOCKED (define these in @theme, use everywhere)

### Palette — "Plain" (no accent color)
- --color-bg: #FAFAF8        (page background)
- --color-ink: #141414        (primary text)
- --color-muted: #666666      (secondary text, labels, dividers)
- --color-border: #00000018   (hairline rules, ~10% black)

### Typography
- --font-display: "Fraunces", Georgia, serif   (headline only, weight 500, line-height 1.1)
- --font-body: "Inter", sans-serif             (body copy, case studies, blog)
- --font-mono: "JetBrains Mono", monospace     (nav, labels, stat captions, eyebrow text
  — small size 10-11px, slight letter-spacing, uppercase for labels)

### Background texture
- Dot-grid pattern on page wrapper only, not inside cards:
  background-image: radial-gradient(#00000008 1px, transparent 1px);
  background-size: 16px 16px;

### Motion
- Entrance animation: staggered fade-up (nav -> drawn rule -> eyebrow label ->
  headline -> stat number), ~100-150ms stagger between each element
- Nav link underlines: hover-triggered only, never animate on load
- MANDATORY: wrap all animation in a `prefers-reduced-motion` check —
  reduced-motion users get instant end-states, no exceptions

### Layout reference — landing page
- Top bar: logo/name left, nav right (Work / Blog / Gear), hairline rule
  beneath ("Concept C" / split masthead)
- Hero: two-column grid below the rule — headline (wider column) left,
  stat number + label right; small numbered eyebrow label above headline
  (e.g. "N deg 01 -- Available for work")
- Everything below the hero is one continuous scroll, in this order:
  1. Blog (`id="blog"`) — `N deg 01 — Blog`, 3-post preview grid, "View all
     posts" links to `/blog` for the rest
  2. Projects (`id="work"` — matches the header nav link) — `N deg 02 —
     Projects`, `AnimatedProjectStack` cycles through all 4 projects
  3. Experience (`id="experience"`) — `N deg 03 — Experience`, role/company/
     year rows, with an unnumbered "Tech stack" sub-block directly beneath
  4. Certifications (`id="certifications"` — matches the footer link) —
     `N deg 04 — Certifications`, all entries shown
  5. Footer (global, in `app/layout.tsx`)
- Each section eyebrow follows `N deg 0N — Label`, mono, uppercase, matching
  the hero's eyebrow. Section wrapper `id`s exist specifically so header/
  footer links can anchor-scroll into the page instead of navigating away.

## Copy voice
- Confident, direct, no corporate buzzwords. First person.
- Positioning: full stack engineer, generative AI, building for MSMEs
  (micro, small, and medium enterprises)
- Plain palette means emphasis comes from type weight/size, not color —
  do not add a color accent to "fix" a section that feels flat; adjust
  type instead

## Do
- Match existing patterns; check components/ui/ before writing a new primitive
- Use design tokens above, never hardcoded hex in components
- After any UI change, use Playwright MCP to screenshot localhost and
  compare against the layout reference above (say "use Playwright MCP"
  explicitly in the prompt)
- Run typecheck + lint after a series of edits
- Small, single-purpose commits

## Don't
- Don't add a color accent anywhere — the palette is intentionally plain
- Don't add new dependencies without asking first
- Don't over-use "use client"
- Don't claim something works without showing build/test/screenshot output
- Don't skip the prefers-reduced-motion guard on any animation
