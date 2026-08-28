# Felixdev Portfolio Rebuild — Design Specification

**Date:** 2026-08-28
**Status:** Approved design, ready for implementation planning
**Repository:** `felixdev`
**Working title:** Full-Stack & AI Automation Developer

## 1. Purpose

Rebuild Felix's portfolio from scratch as a distinctive, proof-first website that presents him as a **Full-Stack & AI Automation Developer**.

The portfolio must serve two audiences without splitting into separate identities:

1. Recruiters and hiring decision-makers evaluating technical and automation ability.
2. US-based service and e-commerce businesses looking for useful software, workflow automation, and applied AI solutions.

The site should feel memorable and technically capable, while remaining fast, readable, credible, and straightforward to navigate.

The portfolio does **not** disclose Felix's current US-based virtual-assistant work.

## 2. Positioning and Core Message

### Public title

Use this title consistently across the hero, metadata, résumé, social previews, and contact copy:

> Full-Stack & AI Automation Developer

### Hero headline

> Software that works. Automation that keeps working.

### Hero actions

- Primary: **Explore my work**
- Secondary: **Download résumé**

### Conversion objective

The website's primary conversion is a qualified project inquiry. The main closing action is a short inquiry form, while email and LinkedIn remain visible alternatives.

## 3. Experience Direction

### Chosen concept

The visual identity is **Systems in Motion**, expressed through the **Human Orbit** hero.

Felix's real portrait is the visual anchor. Workflow signals orbit the portrait to communicate that Felix connects software, automation, and business processes. The portrait should be edited specifically for the site rather than displayed as an ordinary rectangular headshot.

### Experience principles

- Human identity anchors the experience; technology supports it.
- Proof appears immediately after the opening identity statement.
- Motion clarifies hierarchy, relationships, or continuity.
- The interface feels dimensional but remains a conventional, accessible web document.
- Claims are connected to visible artifacts, workflows, or permissioned testimonials.
- Planned features are never represented as shipped work.

## 4. Homepage Information Architecture

The approved homepage journey is **H1 — Proof First**.

### 4.1 Orbit Assembly intro

- Approximately 1.05 seconds.
- Runs on the first visit for the current intro version.
- A cobalt signal assembles into the portrait, orbit, and workflow nodes before settling into the hero.
- Always skippable.
- Bypassed when the user prefers reduced motion.
- A versioned persistent flag prevents repeated playback while allowing a future redesigned intro to run once.

### 4.2 Sticky navigation

Primary anchors:

- Work
- Capabilities
- About
- Contact

Header actions:

- Primary: **Start a project**
- Utility: **Résumé**
- Theme toggle

The mobile navigation must remain compact, keyboard-accessible, and free of scroll traps.

### 4.3 Human Orbit hero

Required content:

- Public title
- Approved hero headline
- Short positioning paragraph
- Explore my work CTA
- Download résumé CTA
- Edited portrait
- Workflow signals such as Build, Automate, and Improve

Desktop behavior:

- Portrait and signal nodes respond subtly to pointer position.
- The response must not chase or obstruct the pointer.

Mobile behavior:

- Copy and portrait stack cleanly.
- Pointer-only behavior is removed.
- The orbit is simplified if needed to protect readability and scrolling.

### 4.4 Compact credibility band

Immediately after the hero, show:

- One concise, named testimonial excerpt with permission to publish.
- Grounded expertise markers for full-stack systems, workflow automation, and applied AI.

Do not invent client counts, star ratings, years, or performance metrics.

### 4.5 Featured work

Project order:

1. Sayu Café — flagship feature
2. Solara
3. Pach Drugmart

Sayu receives the largest interactive preview. Solara and Pach Drugmart follow as focused supporting projects. Every card links to a dedicated route.

### 4.6 Capabilities

Present three service lanes:

1. Full-stack products
2. Workflow automation
3. AI-enabled tools

A restrained technology rail may support the section. Technology logos or names must not dominate the story.

### 4.7 Experience and approach

Provide a concise professional story and working method centered on turning business problems into dependable software.

Exclude the current US-based VA role. Avoid a long chronological biography on the homepage.

### 4.8 Testimonials and common questions

Use named testimonials only when publication permission exists.

FAQ subjects should address genuine buyer or recruiter concerns:

- What kinds of projects Felix takes on
- How collaboration begins
- Typical phases of a project
- Handoff and documentation
- Support after launch
- How automation and AI are evaluated responsibly

Answers should be specific and conversational, not generic sales copy.

### 4.9 Project inquiry

The closing section contains a short form with:

- Name
- Email
- Project type: Full-stack, Automation, AI, or Not sure
- Company or team, optional
- “What are you trying to improve?” free-text field

Do not require an account, scheduling step, or budget disclosure.

On success, show confirmation and an honest expected reply window. On failure, retain input and provide retry and direct-email paths.

## 5. Case-Study System

### 5.1 Shared narrative

Every project route follows this sequence:

1. Hook
2. Context
3. Problem
4. System or solution
5. Proof
6. Reflection
7. Next project

Visitors must be able to scan the outcome quickly and then explore implementation details.

### 5.2 Proof-state vocabulary

Every meaningful feature or artifact must be categorized accurately:

- **Shipped:** implemented and demonstrable
- **Prototype:** an experimental portfolio interaction or proof of concept
- **Planned:** future work or roadmap concept

The design must visually distinguish these states.

### 5.3 Sayu Café

**Route:** `/work/sayu-cafe`
**Proof angle:** web presence, product discovery, rule-based product logic, and operational automation

Sayu is not presented as a branding or online-ordering project.

Case-study chapters:

1. Business context and operational friction
2. Responsive web experience and product discovery
3. Daily audit reporting workflow
4. Inventory monitoring and low-stock alerts
5. Live rule-based drink builder
6. Future smart-suggestion concept, clearly labeled as planned

#### Rule-based drink builder

The launch version is a functional, deterministic product-discovery experience.

Inputs:

- Base: coffee, matcha, hojicha, or seasonal signature
- Sweetness
- Milk
- Temperature
- Texture

Behavior:

- Only compatible choices are permitted.
- Invalid combinations are disabled or explained in context.
- The interface produces a clear drink summary and can show relevant ingredient usage.
- State remains local; the launch builder requires no backend.
- The feature is described as rule-based, never AI-powered.

Future AI-assisted suggestions may recommend balanced combinations based on available ingredients. This remains a phase-two concept until implemented and evaluated.

### 5.4 Solara

**Route:** `/work/solara`
**Proof angle:** full-stack SaaS delivery, grounded quotation automation, and applied AI

Known implementation details:

- Next.js
- Supabase
- Vercel
- Custom domain and DNS configuration
- Analytics integration
- Lightweight Gemini model for quotation assistance

#### Quotation routing

The platform uses a document-first retrieval and answerability flow:

1. A customer submits a quotation or pricing question.
2. The platform checks the approved document or knowledge source.
3. If the document can answer the question, the platform returns the grounded result without calling Gemini.
4. If the question genuinely requires additional quotation assistance, the lightweight Gemini path may be used within defined guardrails.

The portfolio should explain this routing as a deliberate reliability and cost-control choice. It must not imply that Gemini invents, estimates, or overrides pricing.

Do not publish the previously suggested “40% reduction” claim unless Felix later provides verifiable evidence and context. Use qualitative language about reducing repetitive administrative work.

### 5.5 Pach Drugmart

**Route:** `/work/pach-drugmart`
**Proof angle:** inventory operations, analytics, dashboard design, and transaction visibility

Use the public name **Pach Drugmart**, without the “PD” prefix.

Case-study chapters:

1. Operational context and recurring inventory problems
2. Information structure and core workflows
3. Inventory analytics and operational dashboard
4. Transaction handling and operational visibility

Do not claim record-management functionality. Do not add a fifth chapter unless verified content later requires it.

## 6. Visual System

### 6.1 Palette: P2 Signal Cobalt

Light theme:

- Chalk background: `#F7F7F2`
- White surface: `#FFFFFF`
- Ink: `#111316`
- Cobalt: `#2457FF`
- Mint: `#BCE7D0`

Dark theme:

- Night background: `#0A0D14`
- Elevated surface: `#121826`
- Cloud text: `#F2F4F8`
- Electric cobalt: `#6B8CFF`
- Soft mint: `#9FE0C0`

Usage rules:

- Cobalt indicates primary actions and high-attention proof.
- Mint indicates trust, state, success, or supporting signals.
- Neither accent should become ambient decoration across every section.

### 6.2 Theme behavior

- Use the visitor's operating-system preference on first visit.
- Provide a visible manual toggle.
- Persist the visitor's manual choice.
- Prevent a flash of the wrong theme during initial rendering.
- Treat reduced-motion preference independently from color theme.

### 6.3 Typography

- Primary family: Manrope
- Technical and metadata family: IBM Plex Mono

Manrope handles headlines, navigation, controls, and body text. IBM Plex Mono is limited to metadata, system labels, proof states, and workflow signals.

Headlines use compact line heights and tight tracking. Body content prioritizes comfortable reading and does not mimic oversized editorial decoration.

### 6.4 Component character

- Sharp or lightly rounded geometry
- Visible 1.5–2px structural borders
- Offset shadows for selected high-attention surfaces
- Clear white or elevated dark surfaces
- Consistent focus rings
- CSS perspective for dimensional project cards

Avoid excessive glassmorphism, continuous glow, or decorative gradients that compete with project content.

## 7. Motion and Interaction

The selected motion level is **cinematic but controlled**.

### Motion hierarchy

1. Orbit Assembly intro — one-time arrival
2. Human Orbit response — subtle pointer relationship
3. Project transitions — layered depth and continuity into routes
4. Scroll rhythm — brief reveals and restrained parallax

### T1 Precision Core rule

The MVP uses HTML, CSS transforms, and a focused motion library. It does not use a site-wide WebGL canvas.

The project-card language may include:

- Cursor tilt on capable desktop devices
- Layered screenshot movement
- Perspective and offset shadows
- Smooth expansion or shared visual continuity into project routes

Touch devices receive direct tap states instead of simulated hover.

### Accessibility boundaries

- All content remains available without motion.
- Reduced-motion users bypass the intro and receive static state changes.
- Animation never delays access to navigation, proof, or forms.
- No custom cursor is required for core interaction.
- Keyboard focus must remain visible throughout animated states.

## 8. Technical Architecture

### 8.1 Foundation

- Next.js App Router
- TypeScript
- Tailwind CSS
- A focused React motion library
- CSS 3D transforms
- Vercel deployment

Exact compatible dependency versions will be verified during project setup.

### 8.2 Rendering strategy

- Homepage and case-study content are server-rendered.
- Case-study routes are statically generated where possible.
- Client-side JavaScript is limited to interactive islands.
- Content remains readable if nonessential animation fails.

### 8.3 Content layer

Use typed local content rather than a CMS for the MVP.

Project data should include:

- Slug and title
- Short summary
- Role and responsibilities
- Problem and context
- Technologies
- Feature or artifact list
- Proof state per claim
- Gallery media and accessible descriptions
- Outcome language
- Reflection
- Related or next project

A CMS is not justified for three projects and no blog. The content model should remain portable if publishing needs change later.

### 8.4 Component boundaries

Likely shared components include:

- App shell and theme provider
- Sticky navigation
- Orbit Assembly gate
- Human Orbit hero
- Credibility band
- Project preview cards
- Case-study section renderer
- Proof-state badge
- Sayu drink builder
- Capability rail
- Testimonial cards
- FAQ accordion
- Inquiry form
- Footer and social links

The exact file breakdown belongs in the implementation plan, but components should be divided by behavior and reuse rather than by arbitrary visual fragments.

### 8.5 Sayu builder data flow

1. Visitor changes a drink option.
2. Typed deterministic rules evaluate compatibility.
3. The interface updates available choices and explanations.
4. A drink summary is derived from valid state.

No network request or AI provider is required.

### 8.6 Inquiry data flow

1. The browser performs immediate usability validation.
2. The server repeats authoritative schema validation.
3. Spam controls and rate limits are evaluated.
4. A server-side email provider adapter delivers the inquiry.
5. The interface returns success or a recoverable failure state.

Provider credentials remain server-side. Provider selection occurs during implementation planning.

### 8.7 Analytics

Collect only events that help evaluate the portfolio:

- Explore-work click
- Project opened
- Résumé downloaded
- Sayu builder completed
- Inquiry started
- Inquiry submitted successfully

Avoid collecting sensitive inquiry content as analytics properties.

## 9. Failure Handling and Security

### Inquiry form

- Preserve field values after a network or provider error.
- Show field-specific validation messages.
- Prevent duplicate submissions while a request is pending.
- Provide a retry action and direct-email fallback.
- Use server-side schema validation.
- Add a honeypot and rate limiting or equivalent abuse controls.
- Never expose provider keys in client code.

### Content and media

- Provide useful alternative text or mark decorative imagery appropriately.
- Reserve image dimensions to prevent layout shifts.
- Use a visual fallback if a portrait or project image cannot load.
- Provide a useful not-found route with paths back to work and contact.

### Motion and theme

- The site must render a stable, readable state before animation enhances it.
- Theme initialization must avoid hydration errors and incorrect-theme flashes.
- Unsupported hover and pointer behavior must degrade to ordinary links and buttons.

## 10. Accessibility, Responsiveness, and Performance

### Accessibility requirements

- Semantic headings and landmarks
- Keyboard-complete navigation and interactions
- Visible focus states in both themes
- Accessible form names, instructions, errors, and status messages
- Reduced-motion equivalent for every animated interaction
- Contrast verification for all theme tokens and interaction states
- FAQ and navigation disclosure patterns with correct state semantics

### Responsive behavior

Desktop:

- Full Human Orbit composition
- Pointer-enhanced project depth
- Sticky navigation at full fidelity

Tablet:

- Compressed orbit composition
- Reduced card depth
- Touch-first controls

Mobile:

- Proof before spectacle
- Stacked hero composition
- Tap states instead of hover simulations
- No motion or overlay may obstruct scrolling
- Forms use comfortable targets and appropriate input types

### Performance requirements

- No site-wide WebGL in the MVP
- Responsive optimized images
- Local or optimized font delivery
- Lazy loading for noncritical motion and media
- Static rendering where possible
- Production Lighthouse and real-device checks before launch
- Core Web Vitals should remain in their good ranges on representative mobile and desktop tests

## 11. Testing Strategy

### Unit tests

- Sayu compatibility rules
- Drink-summary derivation
- Inquiry validation schema
- Theme preference resolution and persistence utilities
- Proof-state/content validation where practical

### Component and accessibility tests

- Navigation and mobile menu
- Theme toggle
- FAQ behavior
- Sayu option controls and invalid-state explanations
- Inquiry form validation, pending, success, and error states

### End-to-end tests

- First visit and subsequent visit intro behavior
- Reduced-motion intro bypass
- Explore-work navigation
- Opening each project route
- Completing a valid Sayu builder flow
- Switching and persisting themes
- Downloading the résumé
- Successful and failed inquiry flows
- Keyboard navigation through primary conversion paths

### Manual verification

- Representative mobile, tablet, and desktop sizes
- Touch and pointer interactions
- Light and dark operating-system preferences
- Reduced-motion preference
- Slow-network behavior
- Social previews and production metadata
- Production analytics events

## 12. SEO and Metadata

The MVP includes:

- Descriptive page titles and summaries
- Canonical URLs
- Sitemap and robots configuration
- Social preview metadata and image
- Structured, crawlable project content
- Person and portfolio-relevant structured data where appropriate
- Stable project slugs

Metadata must use the approved public title and must not mention the undisclosed VA role.

## 13. MVP Scope

The launch MVP includes:

1. Proof-first homepage
2. Orbit Assembly intro
3. Human Orbit hero using an edited real portrait
4. Three dedicated case studies
5. Working rule-based Sayu drink builder
6. System-aware light and dark themes with a persistent toggle
7. Named, permissioned testimonials
8. Common-questions section
9. Redesigned downloadable résumé
10. Protected project-inquiry form
11. Analytics for meaningful conversion events
12. SEO and social-preview foundations
13. Responsive, keyboard, reduced-motion, and production QA

## 14. Explicit Post-MVP Scope

The following do not block launch:

- Portfolio AI assistant
- AI-supported Sayu drink recommendations
- Targeted WebGL or React Three Fiber gallery
- Personal framework presentation
- Blog or writing system
- Headless CMS

### Portfolio assistant seam

When phase two begins, the assistant should use a rate-limited server endpoint and retrieval over approved portfolio content. It must be clearly scoped to Felix's work, handle unknown questions honestly, and never expose provider credentials.

## 15. Launch Acceptance Criteria

The MVP is ready to deploy when:

- A first-time visitor can understand Felix's role, value, and primary action from the opening screen.
- Sayu, Solara, and Pach Drugmart each demonstrate a distinct and accurate proof angle.
- Every public claim maps to a visible artifact, verified fact, or permissioned testimonial.
- No current VA employment details appear.
- Theme, reduced-motion, keyboard, mobile, project, résumé, and inquiry flows pass verification.
- The inquiry form succeeds in production and has a tested recovery path.
- Production metadata, social previews, analytics, and canonical URLs are correct.
- Performance is verified in a production build and on representative devices.

## 16. Content and Access Required During Implementation

Felix will need to provide or confirm:

- Portrait photos suitable for the Human Orbit treatment
- Sayu, Solara, and Pach Drugmart screenshots or source media
- Verified project responsibilities and implementation facts
- Approved testimonial text, names, roles, and publication permission
- Existing résumé source content for rewriting and redesign
- Public email address and LinkedIn URL
- Domain details when deployment begins
- New GitHub `felixdev` repository URL so the local repository can be connected

The build may begin with clearly marked content placeholders, but launch is blocked until public claims and final assets are verified.

## 17. Decisions Summary

- Rebuild from scratch in the new `felixdev` repository.
- Brand title: Full-Stack & AI Automation Developer.
- Headline: “Software that works. Automation that keeps working.”
- Experience concept: Systems in Motion.
- Hero composition: Human Orbit.
- Intro: Orbit Assembly.
- Homepage journey: H1 Proof First.
- Palette: P2 Signal Cobalt with a purpose-built dark mode.
- Theme: system-aware first visit, persistent manual toggle.
- Motion: cinematic but controlled.
- Technical approach: T1 Precision Core.
- Primary conversion: short project inquiry form.
- Flagship: Sayu Café.
- Primary AI proof: Solara.
- Third proof: Pach Drugmart.
- Current US-based VA work: excluded.
- AI assistant: post-MVP.
- Testimonials: named and permissioned.
- Blog/framework: post-MVP.
