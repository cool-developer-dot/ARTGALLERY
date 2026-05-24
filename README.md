# Atelier — Virtual Art Gallery

Luxury cinematic landing page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production (fastest load)

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for edge caching and automatic image optimization (AVIF/WebP).

## Performance

- Local `/public/images` assets (no external image CDN latency)
- Static page generation
- AVIF/WebP via `next/image`
- Below-the-fold sections lazy-loaded
- Optimized Framer Motion bundle splitting
