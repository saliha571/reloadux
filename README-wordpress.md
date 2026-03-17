# Services Page — WordPress Front-End

Semantic HTML, CSS custom properties, and vanilla JS for a WordPress services page with **Unicorn Studio** WebGL animations.

## Project Structure

```
/design
  tokens.json            Design token system (colors, type, spacing, motion)
  design-direction.md    Visual principles and creative direction

/specs
  services-page.md       Full page specification with content and layout

/src
  services.html          Semantic HTML5 — ready for a WP page template
  styles.css             CSS variables derived from tokens.json
  animations.js          Scroll-reveal + Unicorn Studio SDK integration
```

## Quick Start

1. Open `src/services.html` in a browser — everything works with zero build step.
2. To preview Unicorn Studio scenes, replace `YOUR_HERO_PROJECT_ID` and `YOUR_CTA_PROJECT_ID` in the HTML with real project IDs from [unicorn.studio](https://unicorn.studio).

## Design Tokens

All visual values live in `design/tokens.json` and are mapped 1:1 to CSS custom properties in `styles.css`. To override for a WordPress theme, redefine the `:root` variables in your theme's stylesheet.

## Unicorn Studio Integration

The [Unicorn Studio JS SDK](https://github.com/hiunicornstudio/unicornstudio.js) (v2) is loaded via CDN with `defer`. Scenes are placed as `position: absolute` backdrops behind content sections.

**Setup:**
1. Create your scenes at [unicorn.studio](https://unicorn.studio).
2. Publish each scene and copy the project ID.
3. Set the `data-us-project` attribute on the `.unicorn-backdrop` divs in `services.html`.

**Performance:**
- Scenes use `lazyLoad: true` — they only render when scrolled into view.
- DPI is reduced to `1` on viewports below 768 px.
- `prefers-reduced-motion: reduce` hides all WebGL canvases entirely.

## WordPress Usage

The HTML uses semantic landmarks (`<main>`, `<section>`, `<article>`) and has no framework dependencies. To integrate:

- **Classic theme**: Copy the HTML structure into a custom page template (`page-services.php`), enqueue `styles.css` and `animations.js`.
- **Block theme**: Use a custom block pattern or an HTML block in the site editor.
- **Override tokens**: Redefine CSS custom properties in your theme's `style.css` to match your brand.

## Accessibility

- WCAG 2.1 AA colour contrast.
- `prefers-reduced-motion` fully respected — animations disabled, Unicorn scenes hidden.
- Semantic HTML with ARIA labels on interactive elements.
- Keyboard-navigable CTAs and links.
