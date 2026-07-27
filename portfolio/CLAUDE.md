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
- MDX for blog posts (content lives in `content/blog/`)

## Architecture rules
- Default to Server Components. Only add `"use client"` when a component
  needs state, effects, event handlers, or browser APIs.
- Keep `"use client"` at the leaves of the tree, not on whole pages.
- Colocate components: shared UI primitives in `components/ui/`, page
  sections in `components/sections/`.
- ProjectCard is a single reusable component for all 4 featured projects
  (StartUpSphere, CineCity, Pach Drugmart, Sayu Café) — same template,
  different content. Do not create a separate one-off card for Sayu Café.

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

### Layout reference — home hero ("Concept C" / split masthead)
- Top bar: logo/name left, nav right (Work / Blog / Gear), hairline rule beneath
- Hero: two-column grid below the rule — headline (wider column) left,
  stat number + label right
- Small numbered eyebrow label above headline (e.g. "N deg 01 -- Available for work")

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
