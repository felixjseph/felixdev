# Portfolio Site — PLAN.md

## 1. Overview

A personal portfolio site for a BSIT graduate (CIT-U, Cebu) positioning as a **full stack engineer focused on generative AI** — building useful, practical apps and systems for MSMEs (micro, small, and medium enterprises).

**Stack:** Next.js + Tailwind CSS, built with Claude Code.

The site showcases real shipped projects as **Selected Work**, each with its own card and a screenshot of the actual landing page — no case-study fluff, just the work. One featured project is a branding + dev case study (Sayu Café), shown alongside the software projects to demonstrate range without diluting the core engineering focus.

---

## 2. Goals

- [ ] Communicate a clear positioning: full stack engineer, gen AI, MSME-focused, practical/useful software
- [ ] Showcase real projects (StartUpSphere, CineCity, Pach Drugmart, Sayu Café, + room for more) with real screenshots
- [ ] Give the site some personality beyond the resume — a Blog and a Gear page
- [ ] Fast, clean, mobile-first
- [ ] Easy to update as new projects/posts ship

---

## 3. Design Direction — LOCKED

This direction was stress-tested against several layout, type, and color variants before being finalized. Do not deviate without discussing first.

**Layout — "Split masthead" (Concept C):**
- Thin top bar: logo/name on the left, nav links on the right (Work · Blog · Gear), separated by a hairline rule beneath
- A thin horizontal rule directly under the nav bar
- Hero section below the rule: two-column grid — headline on the left (wider column), a stat number + label on the right (e.g. "10+ / Projects shipped")
- A small numbered eyebrow label above the headline (e.g. "N° 01 — Available for work"), optionally with a small pulsing dot

**Typography:**
- **Headline / display:** Editorial serif (Fraunces, or Georgia as a fallback/reference) — regular weight 500, generous line-height (~1.1)
- **Nav, labels, stat captions, eyebrow text:** Monospace (JetBrains Mono or IBM Plex Mono), small size (10–11px), slight letter-spacing, uppercase for labels
- **Body copy (case studies, blog):** A clean sans (Inter) for readability at length

**Palette — "Plain":**
- No accent color. Off-white/near-white background (`#FAFAF8`–`#F5F5F0` range), near-black ink (`#111`–`#1A1A1A`) for text
- Muted gray (`#666`) for secondary text, labels, dividers
- Emphasis is carried by type weight/size/italics, not color — deliberately restrained so the work is what stands out, not the chrome

**Background texture:**
- Subtle dot-grid pattern behind all content — barely-there dots (e.g. `radial-gradient(#00000008 1px, transparent 1px)`, 16px grid), adds tactile depth without breaking the flat/plain aesthetic

**Motion:**
- On page/section load: staggered fade-up entrance — nav first, then the horizontal rule "draws" itself left to right, then the eyebrow label, then the headline, then the stat number last (roughly 100–150ms stagger between each)
- Nav links get a hover-triggered underline (draws in on hover, not on load)
- **Must respect `prefers-reduced-motion`** — all animations snap to end state instantly when that's set; this is a non-negotiable accessibility requirement, not a nice-to-have

**Certification cards pattern (reused from earlier reference, kept minimal):** icon, title, issuer (small caps, muted), "Verify →" link. Keep this section as a simple list, not a big grid.

**Numbered stat blocks:** short stat + label pairs (e.g. "10+ Projects shipped", "6 Roles"), used in the hero and optionally repeated as a strip elsewhere.

---

## 4. Site Structure

- [ ] **Home** — masthead header, hero (locked design above), quick-facts strip, Selected Work preview, links to other pages
- [ ] **Selected Work** — cards for StartUpSphere, CineCity, Pach Drugmart, and Sayu Café (+ future projects), each with a screenshot/landing-page snapshot, description, and tech stack tags
- [ ] **Blog** — MDX-based posts; informal notes, things being built, things enjoyed
- [ ] **Gear** — current setup: laptop, peripherals, dev tools, etc.
- [ ] **Certifications** — minimal list (not a big grid) — badge/title/issuer, verify link
- [ ] **About / Info** (could live on Home or its own page) — Socials & Contact, Location, Education, Technologies, Services

---

## 5. Content Inventory

### Selected Work

**StartUpSphere**
> A comprehensive platform for mapping and visualizing startup ecosystems. Features interactive network graphs, stakeholder analysis, and real-time collaboration tools for tracking startup communities and their connections.
- Stack: React, Spring Boot, Tailwind CSS, Mapbox, MySQL
- [ ] Needs: landing page screenshot, repo/live link

**CineCity**
> A comprehensive movie booking platform with seat selection, payment integration, and user management. Built as a capstone project demonstrating full-stack development capabilities.
- Stack: React, Spring Boot, Tailwind CSS, MySQL, Android Studio
- [ ] Needs: landing page screenshot, repo/live link

**Pach Drugmart**
> A comprehensive pharmacy management system for inventory control, prescription processing, and sales tracking. Features include medicine stock management, customer records, and automated billing system.
- Stack: React, Spring Boot, Tailwind CSS, MySQL
- [ ] Needs: landing page screenshot, repo/live link

**Sayu Café** — branding + dev case study
> A specialty coffee brand built from the ground up — name, identity, and a shippable presence. "Sayu" means "early" in Cebuano. Brand tagline: "Made Fresh, Made Sayu." Warm, authentic, and cozy identity focused on slow moments, meaningful conversations, and quality coffee — a premium but welcoming brand.
- Stack: Figma/Illustrator (brand system), Next.js (if a landing page is built)
- [ ] Needs: brand assets (logo, palette, packaging mockups), landing page screenshot if built, framing that connects it back to product/engineering thinking (not just visuals)
- Framing note: presented as a fourth project alongside the three software builds — shows product/design range without diluting the core "full stack engineer, gen AI, MSMEs" positioning. Keep it visually consistent with the other project cards (same card template) so it reads as a sibling project, not a detour.

*(Card component should be reusable — image on top or side, title, description, stack tag pills, optional link out.)*

### Blog
- **Decided: MDX** for posts (more setup upfront, scales better as post count grows)
- [ ] First post ideas: notes from building any of the above, or a "why gen AI + MSMEs" post

### Gear
- [ ] Laptop
- [ ] Peripherals (keyboard, mouse, monitor, etc.)
- [ ] Dev tools / software (editor, terminal setup, etc.)
- [ ] Desk setup photo (optional)

### Certifications
- [ ] List actual certifications held (none filled in yet — add title, issuer, verify link, minimal card or list style)

### Socials & Contact / Location / Education / Technologies / Services
- [ ] Socials: GitHub, LinkedIn, email, etc.
- [ ] Location: Cebu, Philippines
- [ ] Education: BSIT — CIT-University
- [ ] Technologies: list of languages/frameworks/tools (from the projects above: React, Next.js, Spring Boot, Tailwind CSS, MySQL, Mapbox, Android Studio — plus gen AI stack once defined)
- [ ] Services: what you're open to (freelance builds for MSMEs? full-time roles? both?)
- [ ] Contact: working form vs. links only — still open, decide during build

---

## 6. Technical Notes (for Claude Code build)

- Framework: Next.js (App Router)
- Styling: Tailwind CSS v4, custom `@theme` tokens for the locked palette/type/spacing above
- Fonts: load Fraunces + Inter + a monospace face (JetBrains Mono or IBM Plex Mono) via `next/font` (Google Fonts)
- Motion: use Motion (`motion/react`) for the staggered entrance animation and hover underlines; wrap in a `prefers-reduced-motion` check
- Components to plan: Header/Nav (masthead style), Hero (with stat block + eyebrow label + drawn rule), ProjectCard (image + tags, reused for all 4 featured projects incl. Sayu Café), CertificationItem, BlogList/BlogPostLayout, GearItem, Footer/ContactBlock
- Blog: MDX files in `content/blog/` with typed frontmatter (title, date, summary, tags)
- Background texture: dot-grid pattern defined once as a reusable token/utility, applied at the page-wrapper level
- Deployment target: Vercel (default choice given Next.js)

---

## 7. Open Questions

- [ ] Landing-page screenshots for StartUpSphere, CineCity, Pach Drugmart — need these captured
- [ ] Sayu Café brand assets — need these gathered/exported for the case study
- [ ] Services section: freelance, full-time, or both — what to actually say here?
- [ ] Contact: working form or links only?
- [ ] Deployment target confirmation (Vercel assumed)
- [ ] Domain name

---

## 8. Milestones

- [ ] Lock design tokens (colors, type scale, monospace label style, dot-grid texture) in Tailwind `@theme`
- [ ] Build layout shell (masthead Nav, Footer, base page templates)
- [ ] Home page (hero with locked design + animation, stat strip, Selected Work preview)
- [ ] Selected Work page + ProjectCard component (4 projects incl. Sayu Café)
- [ ] Blog page + MDX post template
- [ ] Gear page
- [ ] Certifications section
- [ ] Socials/Contact/Location/Education/Technologies/Services section
- [ ] Content pass (screenshots, real copy, Sayu Café assets)
- [ ] Responsive/polish pass
- [ ] Accessibility pass (prefers-reduced-motion, contrast check on plain palette, focus states)
- [ ] Deploy
