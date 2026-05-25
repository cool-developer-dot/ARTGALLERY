# Atelier — Virtual Art Gallery

Luxury cinematic landing page and spatial gallery built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

- Home: [http://localhost:3000](http://localhost:3000)
- Gallery: [http://localhost:3000/gallery](http://localhost:3000/gallery)

## Deploy on Vercel

1. Push this repo to GitHub (`cool-developer-dot/ARTGALLERY`).
2. In [Vercel](https://vercel.com/new), import the repository.
3. **Root Directory:** leave as `.` (this folder is the app root).
4. **Framework Preset:** Next.js (auto-detected).
5. **Build Command:** `npm run build` (default)
6. **Install Command:** `npm install` (default)
7. Optional env: `NEXT_PUBLIC_SITE_URL` = your production URL (for Open Graph metadata).

No database or API keys required. Deploy completes in one click.

## Performance

- Static generation for `/` and `/gallery`
- Local `/public/images` (no external image CDN latency)
- AVIF/WebP via `next/image` + `sharp` on Vercel
- Long-cache headers for static images (`vercel.json`)
- Below-the-fold sections lazy-loaded on the home page
- Gallery route code-split with `next/dynamic`
- Optimized Framer Motion imports
- Compressed JPEG sources (max 1280px edge)

## Responsive

- Fluid typography with laptop-safe caps (`clamp` + max sizes)
- `site-container` + `grid-safe` prevent overflow on 1024–1440px
- Gallery: 1 column on mobile, 3-column rows on `sm+`
- Safe-area insets for notched phones
- Touch: pinch zoom + tilt on supported devices; mouse parallax on desktop

## Production build

```bash
npm run build
npm start
```
