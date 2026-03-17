# Reloadux — Next.js

UI/UX Design Agency for AI-Native Experiences. Migrated from WordPress to Next.js 15 (App Router).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

The design system library is preserved and accessible at `/design-system/library.html`.

Token files live in `design-system/tokens/` (primitive, semantic, component).

## Architecture

- **Next.js 15** with App Router and TypeScript
- **Styling**: Existing CSS custom properties (3-tier token system) + CSS Modules. No Tailwind.
- **Content**: `lib/content.ts` abstraction layer reading from `content/` JSON files. Swap to headless CMS by changing only this file.
- **Components**: 3 tiers — `layout/` (Header, Footer), `sections/` (full page sections), `ui/` (atomic pieces)

## Deployment

Push to GitHub, connect to Vercel. Configure `reloadux.com` domain in Vercel dashboard.
