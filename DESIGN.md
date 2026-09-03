---
name: Felix Joseph Castañeda Portfolio
description: A monochrome operational signal system shaped by precise typography, soft-offset depth, and tightly controlled spectral light.
colors:
  canvas: "#f3f3ef"
  surface: "#ffffff"
  surface-raised: "#e9e9e4"
  ink: "#0a0a0a"
  muted-ink: "#60605c"
  line: "rgba(10, 10, 10, 0.17)"
  inverse-panel: "#070707"
  inverse-ink: "#f7f7f2"
  spectral-cyan: "#65e7f4"
  spectral-lilac: "#a9a5ff"
  spectral-apricot: "#ffbd87"
  status-green: "#56d96b"
  dark-canvas: "#050505"
  dark-surface: "#0e0e0e"
  dark-surface-raised: "#171717"
  dark-ink: "#f5f5f1"
  dark-muted-ink: "#9a9a94"
  dark-line: "rgba(255, 255, 255, 0.16)"
typography:
  display:
    fontFamily: "Nohemi, -apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.038em"
  hero:
    fontFamily: "Nohemi, -apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "clamp(3.8rem, 7.4vw, 7.8rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Nohemi, -apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-large:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  technical-label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.62rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.1em"
rounded:
  square: "0"
  subtle: "0.25rem"
  contained: "1rem"
  pill: "999px"
  circle: "50%"
spacing:
  compact: "0.5rem"
  control: "0.75rem"
  element: "1rem"
  cluster: "1.5rem"
  block: "2rem"
  group: "3rem"
  section: "clamp(7rem, 13vw, 13rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.technical-label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.15rem"
    height: "3.4rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.technical-label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.15rem"
    height: "3.4rem"
  skill-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1rem"
  system-node:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0.8rem"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "clamp(1.5rem, 3.4vw, 3.5rem)"
---

# Design System: Felix Joseph Castañeda Portfolio

## Current work and proof presentation — September 2026

The following decisions supersede the earlier project-preview and testimonial direction below:

- First viewport: the normal-flow header and hero together occupy at least `100svh` at every supported ratio, preventing the About section from peeking into the opening frame. Use minimum height so short landscape viewports grow rather than clip hero content. The original mono name · role label and green pulse remain centered above the headline.
- Selected work: borderless, background-free alternating rows float on the page with a fluid 5.5–9rem separation. Softpoint screenshots lead on the left; the existing Sayu study reverses the arrangement. Mobile stacks preview above copy. Minimal underlined actions keep visual priority on the work.
- Gallery: show three physical media layers with the rear two exposed. The resting deck uses an editorial 3D tilt; hover/focus eases toward front while capped cursor response and a soft radial shine add depth. Real media rotates forward every 4.4 seconds; single-image projects repeat that approved visual only as decorative hidden-from-assistive-technology rear layers. Pause on all interaction, hidden/offscreen states, and reduced motion. Preserve the accessible expanded viewer and never mutate page overflow.
- Testimonials: one compact same-theme entry at a time in a hairline carousel, using 2.8rem logos, restrained stars, a small quote, counter, navigation, and pause/resume. Auto-advance every 6.2 seconds only while visible and idle. Softpoint is approved; Sayu remains marked “Draft testimonial” without the longer sample sentence on the card.
- Contact and footer: restore direct contact details with no copy-email control. Keep the send-email CTA. Footer email, phone, and back-to-top arrow circles share the same 2.75rem visual size and accessible labels; motion is removed when reduced motion is requested.
- The official CV is downloadable from the navigation in desktop and mobile layouts. Keep the supplied PDF intact.
- Work and testimonial components own their styles through CSS modules, keeping these designs independent of legacy global overrides.

## Overview

**Creative North Star: "The Signal Room"**

The portfolio feels like a quiet operating room for complex systems: high-contrast, typographically assured, and structured enough to make mechanisms visible. Its visual foundation is almost entirely monochrome. Spectral cyan, lilac, and apricot appear as refracted light, progress feedback, focus, or a small proof-of-life signal—not as decorative brand fill.

The page is an Experience surface. The interface demonstrates Felix's way of working through a compact split hero, a live workflow map, an expanding About field, technical labels, and diagrammatic project previews. Nohemi supplies the human, editorial voice; Apple-aligned system typography keeps explanations clear and responsive; IBM Plex Mono marks system state and metadata. Motion explains hierarchy or completion and always has an immediate, fully readable reduced-motion equivalent.

**Key Characteristics:**

- Monochrome Signal / System palette with rare spectral refraction
- Compact, first-viewport hero with editorial copy and an operational workflow map
- Large Nohemi statements paired with Apple-aligned system explanations
- IBM Plex Mono metadata, counters, state labels, and controls
- Fine rules, grid fields, soft-offset shadows, and restrained perspective
- Motion used to reveal process, depth, and document progress
- Honest placeholder labels wherever public evidence is not yet approved

## Colors

Warm near-whites and dense near-blacks carry the interface; muted grays create hierarchy, while spectral color is reserved for light, progress, selection, focus, and status.

### Primary

- **Signal Ink:** The main text, primary control fill, structural connectors, and high-contrast brand-mark color.
- **Warm Canvas:** The light-theme page ground and the inverse text color inside Signal Ink regions.

### Secondary

- **Refracted Cyan:** The leading edge of the spectral gradient, keyboard focus, selection, and select data highlights.
- **Refracted Lilac:** The middle spectral wavelength used inside soft ambient fields and progress light.
- **Refracted Apricot:** The warm spectral endpoint and occasional pending-target cue.

### Neutral

- **Paper Surface:** Cards, controls, diagram nodes, and project content panels above the canvas.
- **Raised Warm Gray:** Toggle tracks and shallow tonal separation without adding heavy shadow.
- **Muted Graphite:** Supporting copy, secondary headline phrases, and technical metadata.
- **Hairline Ink:** One-pixel rules, grid strokes, and low-priority outlines.
- **Inverse Black / Inverse Paper:** Full-width About, testimonial, and contact worlds.
- **Dark Theme Family:** A true-black-adjacent canvas, stepped charcoal surfaces, warm off-white text, and translucent white rules preserve the same hierarchy in dark mode.

**The Refracted-Light Rule.** Spectral color is light passing through the system. Use it for progress, focus, ambient beams, glows, and tiny data cues; never turn it into a broad decorative fill or a rainbow UI.

**The Monochrome-First Rule.** A screen must remain coherent and complete before spectral accents are added.

## Typography

**Display Font:** Nohemi, self-hosted in Light, Regular, Medium, SemiBold, and Bold, with Apple-aligned system fallbacks

**Body Font:** Apple system stack (`-apple-system`, SF Pro Display/Text, Segoe UI), with sans-serif fallback

**Label/Mono Font:** IBM Plex Mono in Regular and SemiBold, with monospace fallback

**Character:** Nohemi is compact, confident, and human enough to carry the portfolio's strongest ideas. Apple-aligned system typography supplies responsive reading clarity, while IBM Plex Mono creates a measured systems layer without turning the page into a terminal theme.

### Hierarchy

- **Hero** (Medium, fluid display scale, 0.88 line-height): The first-viewport value proposition; keep it to a compact block of roughly 11.5 characters per line at wide sizes.
- **Display** (Medium, fluid display scale, 0.92 line-height): Section headings and the expanding About statement; use balanced wrapping and tight negative tracking.
- **Expressive Light** (Light): One short phrase within a display headline may drop to weight 300 and muted color to create a second voice.
- **Title** (Medium to SemiBold): Practice names, project subheads, and system-node actions.
- **Body** (Regular, 1.5–1.65 line-height): Explanations and narrative copy; use restrained widths of about 36–40rem or 62–68 characters.
- **Technical Label** (Regular or SemiBold, compact mono scale, uppercase): Navigation, counts, states, tags, rails, metadata, and controls.

**The Three-Voice Rule.** Nohemi speaks ideas, the Apple-aligned system stack explains them, and IBM Plex Mono identifies system state. Do not interchange these roles for novelty.

**The Tight-Display Rule.** Large Nohemi text uses close tracking and sub-1.0 line-height, but must never clip at any viewport or during motion.

## Layout

The homepage is a vertically paced portfolio narrative with wide editorial containers: navigation and hero content cap at 94rem; standard sections cap at 90rem. Horizontal gutters are 1rem per side on larger screens and 0.625rem per side below 600px. The core section rhythm is a fluid 7–13rem, keeping the long page deliberate rather than dense.

The first viewport is a compact split: copy occupies the wider 1.08 fraction and the workflow map the narrower 0.66 fraction, with a fluid 2.25–5rem gap. At 1080px and below, the hero becomes one column and the workflow map is removed so the value proposition and actions retain priority. Project cards alternate content and preview columns on wide screens, collapse to stacked rows at 1080px, and simplify their internal mockups at 600px.

The About sequence is intentionally spatial. Its 190svh scroll region holds a sticky viewport-height stage beneath the header; a contained black field expands from a rounded 12%/21% inset to fill the viewport while the statement settles and the supporting method appears. It shortens to 175svh below 820px and 165svh below 600px. Reduced motion removes the scroll runway and renders the expanded, readable state directly.

Below 820px, section-heading splits, skill details, and experience columns become single-column; the desktop navigation becomes a full-width stacked menu. Below 600px, primary actions become full-width, project stories stack, footer and contact rows reorganize, and display sizes use viewport-aware mobile clamps. Touch controls retain at least 2.7rem height; primary hero actions are 3.4rem high.

**The First-Viewport Rule.** On wide and common laptop viewports, keep the full value proposition, supporting copy, both actions, contact-state metadata, workflow map, and process ticker visible without scrolling.

**The Priority-Collapse Rule.** Responsive adaptation removes or stacks secondary mechanisms before compressing the primary message.

## Elevation & Depth

Depth is a hybrid of tonal layering and soft, directional offset. Most surfaces remain flat and are separated by one-pixel rules. The workflow map introduces a broad ambient shadow, its nodes use small down-right offsets, and project previews use deep perspective shadows plus gentle 3D rotation. Spectral glows behave like light in the environment rather than object shadows.

### Shadow Vocabulary

- **Map Ambient:** A broad, low-opacity black shadow beneath the workflow map; use only for a large diagram floating above the page.
- **Node Offset:** A compact down-right shadow tinted from the current text color; use on diagram nodes to suggest movable system artifacts.
- **Preview Depth:** A deep black shadow beneath perspective project mockups; reserve for the large featured-work visuals.
- **Spectral Halo:** A low-opacity cyan or brand-derived glow around progress and hover signals; it must remain softer than the text contrast.

**The Soft-Offset Rule.** Structural surfaces use rules first. Add shadow only when a diagram, preview, or state needs physical separation.

**The Light-Not-Neon Rule.** Blur spectral accents generously and keep their opacity low enough that typography stays dominant.

## Shapes

The base system is rectilinear: sections, cards, project frames, metadata rails, and most diagram nodes use square corners and one-pixel borders. A subtle 0.25rem corner softens the hero workflow map; the About field begins with a 1rem clip radius and resolves to square when fully expanded. Pills are reserved for actions, tags, skill chips, and the theme switch; circular forms identify the F/J mark, status lights, diagram orbits, and toggle thumb.

Grid fields use 32px cells in the workflow map, 42px in project previews, and 56px in the About field. Shared outline icons use a 20×20 view box, currentColor strokes, rounded caps and joins, and a 1.7 stroke width so arrows, refresh, theme, and back-to-top symbols remain one family.

**The Diagram Geometry Rule.** Use square artifacts, hairline connectors, and circular state markers. Rounded rectangles belong to controls and tags, not ordinary content containers.

## Components

### Buttons

- **Shape:** Fully pill-shaped with a 3.4rem minimum height, one-pixel Signal Ink border, and deliberately wide icon gap.
- **Primary:** Signal Ink fill on Warm Canvas with IBM Plex Mono uppercase labeling and a currentColor arrow.
- **Ghost:** Transparent at rest; inverts to Signal Ink on hover.
- **Hover / Focus:** Translate upward by 2px and widen the internal gap; use the global 2px cyan focus outline with a 4px offset. Transitions are 240ms for gap, transform, background, and color.

### Chips

- **Style:** Skill chips use Paper Surface, a hairline border, pill shape, compact system text, and a real technology-color SVG mark. Technical tags use IBM Plex Mono uppercase text and tighter padding.
- **State:** Skill lanes pause on hover or focus-within. Non-target chips fade while the target rises 2px, gains a restrained brand-color border/halo, and its icon scales and rotates slightly.

### Cards / Containers

- **Corner Style:** Square by default; the workflow map alone uses the subtle corner.
- **Background:** Paper Surface for project and practice content, with inverse charcoal visual stages for project previews.
- **Shadow Strategy:** Flat practice and project content panels; depth belongs inside the diagram or preview artifact.
- **Border:** Hairline grid rules define adjacency; avoid nested rounded-card stacks.
- **Internal Padding:** 1.2rem for compact practices, 0.8rem for system nodes, and a fluid 1.5–3.5rem for featured project content.

### Navigation

The header is sticky and translucent, using an 82% canvas mix with 18px blur and 140% saturation above a one-pixel rule. Desktop links are uppercase IBM Plex Mono with a directional underline that draws from right to left on hover. The solid contact pill and outlined theme switch sit at the right; below 820px they yield to a pill-shaped Menu control and large Nohemi rows. The circular F/J mark is the persistent identity anchor.

A 2px spectral line at the header's lower edge shows continuous document completion. Normal motion uses a spring with stiffness 150, damping 28, and mass 0.25; reduced motion binds directly to raw scroll progress with no spring.

### Workflow Map

The hero's signature operational diagram uses a fine 32px grid, four square nodes, straight hairline connectors, a low-opacity spectral orb, and a compact interactive focus selector. A 300-particle OGL field sits behind the hero at 0.74 opacity with difference blending. Pointer response, drift, and rotation are GPU-bound; reduced motion hides the field entirely. The whole secondary map is removed at 1080px so it never competes with the message on constrained screens.

### Scroll-Expand About Field

The About section transforms a contained black system statement into a full-viewport field. The frame expansion is linear and scroll-controlled; statement scale and offset resolve alongside it, then the explanatory detail enters late with a short power-out reveal. In reduced motion, the fully expanded frame, statement, and details are immediately visible with no pinned runway, clipping, opacity gate, or transform.

### Project Previews and Placeholder Labels

Featured work pairs editorial problem/system copy with purpose-built diagrammatic UI previews. On wide screens previews use restrained perspective and a deep shadow, then settle closer to flat on hover; mobile reduces the rotation and reduced motion removes it. Every unverified preview carries an explicit mono placeholder label. Unapproved project outcomes, employers, testimonial attribution, and public contact details remain visibly pending rather than being styled as finished evidence.

## Do's and Don'ts

### Do:

- **Do** establish a complete monochrome hierarchy before adding spectral light.
- **Do** use Nohemi for statements, the Apple-aligned system stack for explanation, and IBM Plex Mono for state and metadata.
- **Do** preserve the compact first viewport and remove the workflow map at 1080px when it would compete with the primary message.
- **Do** use one-pixel rules, visible focus, keyboard-complete controls, and minimum 2.7rem control heights.
- **Do** make reduced motion a direct, complete state: hide particles, remove scroll runways and transforms, stop marquees, and expose all content.
- **Do** use the shared currentColor SVG icon grammar for directional and theme controls.
- **Do** label placeholders and pending public evidence in the interface itself.

### Don't:

- **Don't** spread spectral color across large surfaces or use it as generic decoration.
- **Don't** replace structural rules with heavy card shadows or stack rounded cards inside rounded cards.
- **Don't** use IBM Plex Mono for paragraph copy or the system stack for primary display statements.
- **Don't** compress, clip, or over-wrap Nohemi display type to preserve a desktop composition.
- **Don't** keep the workflow map, perspective effects, particle motion, or pinned About sequence when the viewport or motion preference makes them secondary.
- **Don't** publish invented contact details, employer history, project outcomes, screenshots, or testimonial attribution.
