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
- --color-add / --color-remove: #3e6b4f / #8b4a3e — **terminal semantics
  only**: the `$`/`//` prompt glyphs, cursor carets, the boot screen, the
  "available for work" dot. They are never decorative — if a section feels
  flat, fix the type, not the color.
- --color-paper: backing for the hero portrait well only. The artwork is
  black ink on white, so it keeps a paper ground in **both** themes rather
  than being inverted — inverting tonal crosshatch produces a photographic
  negative, not chalk-on-blackboard. Dimmed in dark mode to cut glare.

### Dark mode
- Class-based, on `<html class="dark">`. **All** components style through the
  semantic tokens, so dark mode is implemented purely by redefining those
  token values under `:root.dark` in globals.css — do not add per-component
  `dark:` variants; if something doesn't flip, it's using a hardcoded color
  and that's the bug.
- `@custom-variant dark (&:where(.dark, .dark *))` at the top of globals.css
  repoints Tailwind's `dark:` off its default `prefers-color-scheme` media
  query. Without it the variant follows the OS while the tokens follow the
  class, and the two silently disagree.
- **Light is the default.** The blocking init script in `app/layout.tsx` only
  ever *adds* `.dark`, and only when localStorage says so — it deliberately
  does not fall back to the system preference. It runs in `<head>` before
  paint so returning dark-mode visitors never get a white flash; `<html>`
  carries `suppressHydrationWarning` because that script mutates it.

### Typography — one superfamily (IBM Plex)
The whole site reads as a build log / engineering document, which is what
suits the crosshatched ink portrait in the hero. Mono is the *display* face,
not just a label face.
- --font-display: IBM Plex Mono (700)  — headings, wordmark, hero headline
- --font-mono:    IBM Plex Mono (400/500) — nav, eyebrows, labels, stats
- --font-body:    IBM Plex Sans (400/500/600) — body copy, descriptions
- Wired in `lib/fonts.ts` (`ibmPlexMono` / `ibmPlexSans`) → `@theme inline`.
  Fraunces / Inter / JetBrains Mono were removed — do not reintroduce a serif
  display face; it fights the drafted, technical feel of the artwork.
- Mono sets much wider than a serif at the same px. Headings top out around
  `text-2xl sm:text-3xl` (page h1s `md:text-4xl`) with `tracking-tight`.

### Background texture
- Dot-grid pattern on page wrapper only, not inside cards:
  background-image: radial-gradient(#00000008 1px, transparent 1px);
  background-size: 16px 16px;

### Motion
- Entrance animation: staggered fade-up (nav -> drawn rule -> eyebrow label ->
  headline -> stat number), ~100-150ms stagger between each element
- Nav link underlines: hover-triggered only, never animate on load
- Boot screen (components/ui/boot-screen.tsx): ~1.5s terminal splash on first
  paint, then wipes to the page. It ships in the SSR HTML so there's no flash
  of page content before it, and its fade-out is driven by **CSS**
  (`[data-boot-screen]` in globals.css), not React state — a slow hydration or
  JS failure must never leave a visitor trapped behind the overlay. React only
  unmounts the dead node afterwards. If you change the CSS duration, bump
  `UNMOUNT_AFTER_MS` to stay ahead of it.
- MANDATORY: wrap all animation in a `prefers-reduced-motion` check —
  reduced-motion users get instant end-states, no exceptions. For reduced
  motion the boot screen is `display:none` and the hero taglines stop
  rotating (auto-advancing text is both motion *and* auto-updating content).

### Navigation — SideRail (components/ui/side-rail.tsx)
There is **no top navbar**; it was replaced by a fixed left rail (header.tsx /
nav-link.tsx / draw-rule.tsx were deleted — don't reinstate them).
- Idle: one short **bar** per nav entry, active one extended and ink-colored.
  Bars, not dots/pills — the site's language is hairline rules and diff
  gutters, so the rail should read as a code minimap, not generic dot-nav.
- Expands on hover, focus, or click into a panel: name (links to `#top`),
  nav list, theme switch, then contacts + email. Order matters — theme sits
  above contacts.
- Active state comes from an IntersectionObserver scroll-spy on the landing
  page (`rootMargin: -45% 0px -45%` isolates a band across the middle of the
  viewport, so "active" means "what you're actually looking at"). On
  standalone routes it falls back to matching `pathname` against
  `NavItem.route` instead.
- Nav entries live in `lib/nav.ts`. Hrefs are absolute (`/#work`, not
  `#work`) so they work from `/blog` and `/gear` too. Blog carries both a
  `sectionId` and a `route` because it exists as both.
- Opening on `onFocus` and closing on `onBlur`/Escape is what makes it
  keyboard-usable — the collapsed rail is a real `<button>`, and the panel
  unmounts when closed so its links aren't silently tabbable.

### Layout reference — landing page
- Hero — "Build Log" treatment (components/sections/hero.tsx): the whole
  hero sits inside a bordered "terminal window" (title bar with 3 dots +
  `~/felix/hero.tsx` path). Inside: a `felix@cebu:~$` prompt row with an
  "available for work" status (pulsing dot), a `$ whoami` eyebrow, then a
  two-column grid (`md:grid-cols-[1.6fr_1fr]`, `md:items-center`) —
  headline + contact links left, portrait right. The portrait card closes
  with a file-inspector row (`1080×1440` / `PNG`) — keep that factual; it
  describes the actual asset.
- Hero headline cycles three taglines via `RotatingTagline`
  (components/ui/rotating-tagline.tsx). All taglines render into the same
  CSS-grid cell — the hidden copies size the box to the tallest line so a
  swap never shifts the page below. Exit is deliberately faster than enter
  (`mode="wait"` holds the incoming line until the outgoing one is gone, so
  a slow exit reads as a blank gap). Keep taglines short; 4 would start to
  feel like a slideshow.
- Portrait: `PORTRAIT_SRC` in hero.tsx → `/public/felix-portrait.png`
  (crosshatched ink illustration, 1080x1440, transparent background). Frame
  is `aspect-[3/4]` + `object-contain` to match the art's native ratio, and
  capped at `md:max-w-[280px]` so it doesn't stretch the row and strand the
  left column in whitespace. The source has transparent padding baked around
  the figure, so it carries `scale-[1.14] object-top` to fill the frame edge
  to edge — the surplus crops off the shirt, never the head. If PORTRAIT_SRC is ever emptied it falls back
  to an abstract head-and-shoulders mark (plain CSS shapes, no facial
  features — never fabricate a likeness).
- Contact links live in `lib/contact.ts`, shared by hero and footer. Hero
  shows `primaryContactLinks` (Email / GitHub / LinkedIn) only; the footer
  shows all of `socialLinks`. Don't inline contact URLs in components.
- Everything below the hero is one continuous scroll, in this order:
  1. Blog (`id="blog"`) — `N deg 01 — Blog`, 3-post preview grid, "View all
     posts" links to `/blog` for the rest
  2. Projects (`id="work"` — matches the header nav link) — `N deg 02 —
     Projects`, `AnimatedProjectStack` cycles through all 4 projects
  3. Experience (`id="experience"`) — `// 03 — Experience`, role/company/
     year rows, with an unnumbered "Tech stack" sub-block directly beneath.
     `ExperienceEntry.company` is optional — an entry without one omits that
     column rather than rendering an empty cell or inventing an employer.
  4. Gear (`id="gear"`) — `// 04 — Gear`, a **grid** of `GearCard`s. There is
     no `/gear` page. GearCard deliberately mirrors ProjectCard's visual
     language (category pill, monogram, image well, spec tags) but uses a
     plain grid, not the project fan-deck: six utilitarian items are meant to
     be scanned side by side, not clicked through one at a time.
  5. Certifications (`id="certifications"`) — `// 05 — Certifications`
  6. Footer (global, in `app/layout.tsx`) — `felixdev` ASCII banner, tagline,
     location, education, email + socials, copyright. No Certifications link;
     the rail owns navigation.
- Footer wordmark: a figlet-style banner in `WORDMARK` (footer.tsx), every row
  padded to the same length. Keep it **ASCII-only** — box-drawing glyphs like
  U+2588 aren't in the `latin` font subset next/font loads, so they fall back
  to another face with different metrics and shear the whole thing.
- `app/template.tsx` (not layout) gives each route its own mount animation, so
  navigating to `/blog` fades in instead of hard-cutting. `/blog` opens with a
  `BackToHero` link.
- Each section eyebrow is a code comment: `// 0N — Label`, mono, uppercase,
  with the `//` in --color-add. Standalone pages continue the numbering
  (`/gear` is `// 05 — Gear`). Section wrapper `id`s exist specifically so
  header/footer links can anchor-scroll into the page instead of navigating
  away.

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
- Don't add a color accent anywhere. --color-add/--color-remove are reserved
  for terminal semantics (see palette above), not decoration
- Don't restyle ProjectCard / AnimatedProjectStack without being asked — the
  fanned deck and card layout are settled; they inherit type tokens and that's
  the only way they should change
- Don't add new dependencies without asking first
- Don't over-use "use client"
- Don't claim something works without showing build/test/screenshot output
- Don't skip the prefers-reduced-motion guard on any animation
