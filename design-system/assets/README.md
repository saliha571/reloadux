# Reloadux Asset Conventions

All production assets are served from `public/images/` and organized by category.
The `design-system/assets/` folder contains source assets from Figma exports (icons, page-specific decorations).

## Folder Structure — `public/images/`

```
public/images/
  brand/            # reloadux-logo.svg, tkxel-logo.svg
  logos/            # Client logo SVGs (nbc-1.svg, barclays-2.svg, etc.)
  blog/             # Blog post cover images
  testimonials/     # Avatar photos, company logos, play cursor bg
  portfolio/        # Portfolio/case study slide images and videos
  cta/              # CTA section images (nbcu.png, fintua.png, etc.)
  covers/           # Hero and section background images
  icons/            # Shared icons (arrows, badges, decorative)
```

## Naming Conventions

| Asset type          | Pattern                         | Example                    |
|---------------------|---------------------------------|----------------------------|
| Brand logos         | `{brand}-logo.svg`              | `reloadux-logo.svg`       |
| Client logos        | `{company}-{variant}.svg`       | `barclays-2.svg`           |
| Blog covers         | `{slug}.webp`                   | `ai-first-redesign.webp`  |
| Testimonial avatars | `{first-name}.webp`             | `iman.webp`                |
| Company logos       | `{company}-logo.webp`           | `vocable-logo.webp`        |
| Portfolio slides    | `{project}-slide.webp`          | `occ-slide.webp`           |
| CTA logos           | `{company}.png`                 | `nbcu.png`                 |
| Icons               | `{descriptive-name}.svg`        | `down-arrow.svg`           |

## Format Rules

- **SVG** for logos, icons, and all vector graphics
- **WebP** for photographs, cover images, and raster graphics
- **PNG** only when WebP is unavailable (e.g., legacy CTA logos)
- **Never** use JPEG for new assets — convert to WebP

## Usage in Code

- Always use `next/image` `<Image>` component for raster images (WebP, PNG)
- Use native `<img>` only for SVGs that need to fill their container
- Reference paths from `public/`: `src="/images/logos/barclays-2.svg"`
- All file names must be kebab-case and descriptive
