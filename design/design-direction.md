# Design Direction

## Overview

A refined, monochrome WordPress services page built on the live site's existing design language. Clean editorial typography (Libre Baskerville headings, Manrope body, Lexend accents) paired with a near-black / white / grey palette. Ambient depth is added via **Unicorn Studio** WebGL backdrops in hero and CTA sections.

## Visual Principles

| Principle | Application |
|-----------|-------------|
| **Monochrome confidence** | Night (#090909), black, white, smokey grey, and mid-grey — nothing else needed. |
| **Depth** | Unicorn Studio WebGL scenes create ambient motion behind dark sections — never competing with readable text. |
| **Rhythm** | WordPress preset spacing scale (0.44 rem → 5.06 rem); section padding uses `--wp--preset--spacing--80`. |
| **Motion** | Single `--transition: all 0.3s ease-in-out` for all interactive states; scroll-reveal via `IntersectionObserver`. |

## Typography

- **Headings**: Libre Baskerville — serif, editorial gravitas.
- **Body**: Manrope — geometric sans-serif, highly legible, with a full fallback stack (Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif).
- **Accent / Labels**: Lexend — overlines, tags, UI labels.
- **Scale**: WordPress preset sizes — small (13 px), normal (16 px), medium (20 px), large (36 px), x-large / huge (42 px).

## Colour Strategy

Built from the live WordPress site's `:root` variables:

| Token        | Hex       | Role                              |
|--------------|-----------|-----------------------------------|
| `--night`    | `#090909` | Primary dark bg, hero, CTA        |
| `--black`    | `#000000` | Deepest tone                      |
| `--white`    | `#FFFFFF` | Text on dark, light bg, buttons   |
| `--smokey`   | `#D9D9D9` | Borders, muted UI, secondary text on dark |
| `--grey`     | `#A5A9AC` | Secondary body text, captions     |

WordPress preset colours (vivid-red, vivid-purple, etc.) are available in tokens but reserved for editorial/CMS use — the page itself stays monochrome.

### Purple Gradient (CTA Glow)

Extracted from the Figma CTA banner. Two colours create a layered atmospheric glow on dark surfaces:

| Token        | Hex       | Role                                    |
|--------------|-----------|-----------------------------------------|
| `--purple`   | `#9662FF` | Vibrant purple — gradient start         |
| `--magenta`  | `#A401B7` | Deep magenta — gradient end (88% stop)  |

**Technique**: Two large blurred ellipses (812–855 px) are positioned partially off-canvas. Each uses `linear-gradient(180deg, #9662FF 0%, #A401B7 88%)`, `blur(325px)`, `opacity: 0.6`, and `border-radius: 400px`. The combined effect produces a soft purple atmospheric glow behind the CTA content.

CSS variable: `--gradient-purple-glow`.
Utility class: `.cta-glow` (applies Night background + both pseudo-element glow orbs).

## Abstract Holographic Shape

A 3D-rendered iridescent glass-like flowing form used as a decorative background element. The asset (`src/assets/holo-abstract.png`, 1000 x 1000 RGBA) features purple, blue, pink, and silver iridescent tones.

### Usage Variants

| Section        | Class                       | Rotation | Opacity | Size         |
|----------------|-----------------------------|----------|---------|--------------|
| Testimonials   | `.holo-shape--testimonials` | -164 deg | 59%     | 1848 x 1848  |
| CTA banner     | `.holo-shape--cta`          | none     | 10%     | 1459 x 1411  |
| Hero           | `.holo-shape--hero`         | none     | 0 (hidden, available) | 1365 x 735 |

Apply the base class `.holo-shape` plus a variant modifier. The shape is absolutely positioned and sits behind content (`z-index: -1`). For animated versions, these can be replaced with a **Unicorn Studio** WebGL scene using the same positioning.

## Motion & Animation

### Unicorn Studio Scenes

- **Hero backdrop**: Looping abstract scene, z-indexed behind hero content.
- **CTA section**: Subtle interactive mouse-tracking scene.
- Loaded via `UnicornStudio.init()` with `data-us-project` attributes.
- `lazyLoad: true`; `dpi: 1` on mobile for performance.

### CSS / JS Animations

- **Global transition**: `all 0.3s ease-in-out` — matches `--transition`.
- **Scroll-reveal**: Fade-up 20 px + opacity via `IntersectionObserver`.
- **Stagger**: Grid children animate sequentially (80 ms delay).
- **Hover states**: Cards lift with WP `natural` shadow (`6px 6px 9px`).

## Layout

- Max-width `1440px` — matches live site `--container`.
- CSS Grid for service cards (auto-fill, min 340 px).
- Sections alternate: dark (`--night`) / light (`--white`) / surface (`#F5F5F5`).

## WordPress Compatibility

- Semantic HTML5 landmarks.
- All WP preset variables (`--wp--preset--*`) included in `:root` for full theme compatibility.
- CSS custom properties can be overridden in `style.css` or `theme.json`.
- No framework — plain CSS + vanilla JS.
