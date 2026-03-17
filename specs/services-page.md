# Services Page — Specification

## Purpose

Present the company's service offerings in a clear, scannable layout that builds trust and drives engagement. The page converts visitors into leads via prominent CTAs.

---

## Page Structure

```
┌──────────────────────────────────────────────┐
│  HERO SECTION  (dark bg + Unicorn backdrop)  │
│  ── Overline label                           │
│  ── H1 headline                              │
│  ── Subtitle paragraph                       │
│  ── Primary CTA button                       │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│  SERVICES GRID  (light bg)                   │
│  ── Section heading + intro                  │
│  ── Grid of service cards (3-col / 1-col)    │
│     Each card:                               │
│       • Icon (SVG)                           │
│       • Title (h3)                           │
│       • Description (p)                      │
│       • "Learn more" link                    │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│  PROCESS SECTION  (surface bg)               │
│  ── Section heading                          │
│  ── Numbered step list (4 steps)             │
│     Each step:                               │
│       • Step number                          │
│       • Title (h3)                           │
│       • Description (p)                      │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│  CTA SECTION  (dark bg + Unicorn backdrop)   │
│  ── Headline                                 │
│  ── Supporting text                          │
│  ── CTA button                               │
└──────────────────────────────────────────────┘
```

---

## Section Details

### 1. Hero Section

| Property       | Value                                                       |
|----------------|-------------------------------------------------------------|
| Background     | `color.brand.primary` with Unicorn Studio WebGL scene       |
| Overline       | "OUR SERVICES" — uppercase, `font-size.xs`, `letter-spacing.wider`, `color.brand.highlight` |
| Headline       | H1, `font-size.5xl` (desktop) / `font-size.3xl` (mobile)   |
| Subtitle       | `font-size.lg`, `color.text-inverse` at 80 % opacity        |
| CTA            | Primary button → links to `#services`                       |
| Unicorn scene  | `data-us-project` container, absolute positioned behind content |
| Padding        | `layout.section-padding` top and bottom                     |

### 2. Services Grid

| Property       | Value                                                       |
|----------------|-------------------------------------------------------------|
| Background     | `color.semantic.bg-page`                                    |
| Heading        | H2, `font-size.3xl`, centred                                |
| Intro          | Paragraph, `font-size.md`, `color.text-secondary`, centred  |
| Grid           | `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`, `gap: spacing.lg` |
| Cards          | `bg-elevated`, `border-radius.lg`, `shadow.card` → `shadow.card-hover` on hover |
| Card icon      | 48 × 48 SVG, `color.brand.accent`                           |
| Card title     | H3, `font-size.xl`, `font-weight.semibold`                  |
| Card body      | `font-size.base`, `color.text-secondary`                    |
| Card link      | "Learn more →", `color.brand.highlight`                     |

#### Service Items

1. **Strategy & Consulting** — We analyse your goals and craft a tailored digital roadmap.
2. **Web Design & Development** — Pixel-perfect, responsive sites built for performance.
3. **Brand Identity** — Logos, guidelines, and assets that tell your story.
4. **SEO & Content** — Data-driven content strategies that grow organic traffic.
5. **Digital Marketing** — Targeted campaigns across search, social, and email.
6. **Maintenance & Support** — Ongoing updates, security, and performance monitoring.

### 3. Process Section

| Property       | Value                                                       |
|----------------|-------------------------------------------------------------|
| Background     | `color.semantic.bg-surface`                                 |
| Heading        | H2, `font-size.3xl`, centred                                |
| Layout         | 4-column grid on desktop, single column on mobile           |
| Step number    | Large numeral, `font-size.4xl`, `color.brand.highlight`, `font-weight.bold` |
| Step title     | H3, `font-size.lg`, `font-weight.semibold`                  |
| Step body      | `font-size.base`, `color.text-secondary`                    |

#### Steps

1. **Discovery** — We learn about your business, audience, and objectives.
2. **Plan** — A detailed scope, timeline, and strategy is created.
3. **Execute** — Design and development sprints bring the plan to life.
4. **Launch & Grow** — We ship, monitor, and iterate for continuous improvement.

### 4. CTA Section

| Property       | Value                                                       |
|----------------|-------------------------------------------------------------|
| Background     | `color.brand.secondary` with Unicorn Studio WebGL scene     |
| Headline       | H2, `font-size.3xl`, white text                             |
| Body           | `font-size.md`, `color.text-inverse` at 80 % opacity        |
| CTA            | Primary button — "Get Started" or "Let's Talk"              |
| Unicorn scene  | Interactive mouse-tracking scene behind content              |

---

## Responsive Breakpoints

| Breakpoint | Width       | Adjustments                                    |
|------------|-------------|------------------------------------------------|
| Desktop    | ≥ 1024 px   | Full grid, large typography                    |
| Tablet     | 768–1023 px | 2-col grid, medium type sizes                  |
| Mobile     | < 768 px    | 1-col stack, reduced section padding (48 px)   |

---

## Accessibility Requirements

- All images / icons require `aria-label` or descriptive `alt` text.
- Colour contrast meets WCAG 2.1 AA (4.5 : 1 for body text).
- Keyboard-navigable CTA and link elements.
- `prefers-reduced-motion` disables scroll-reveal animations and pauses Unicorn scenes.
- Semantic landmark roles via HTML5 elements (`<main>`, `<section>`, `<nav>`).

---

## Performance Targets

- Unicorn Studio SDK loaded async / deferred.
- WebGL scenes use `lazyLoad: true` and `dpi: 1` on viewports < 768 px.
- No render-blocking CSS beyond the critical path.
- Target Largest Contentful Paint < 2.5 s.
