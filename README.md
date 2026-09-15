# Sweet Bee Bakehouse

The website for Sweet Bee Bakehouse — a croissant-focused bakery at 2540 E Broadway St, Ste A, Pearland, TX.

Built to **Direction 4, "The Quiet Case"** (`docs/handoff/`): restrained and editorial — one photograph per screen, one italic statement, 1px rules instead of cards, and scrolling as the only interaction. Home is light, Menu is dark, and the dark footer on Home bridges the two.

Next.js (App Router) + TypeScript + Tailwind, statically prerendered. No CMS, no server state, no cart.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static prerender of / and /menu
npm run assets       # re-derive everything in public/assets from assets-source/
npm run typecheck
```

## Editing content

Every line the bakery changes lives in one of two typed files. Neither requires touching layout.

| What | Where |
|---|---|
| Menu categories, items, tags, descriptions, prices | `src/data/menu.ts` → `menu` |
| The photograph, caption and italic note per category | `src/data/menu.ts` → `menu[].img` / `.caption` / `.note` |
| Hours, address, ordering and social links, "Est." year | `src/data/site.ts` |
| Press mentions | `src/data/site.ts` → `press` |

**Prices appear on `/menu` and nowhere else.** A test asserts this — Home renders zero `$` amounts.

Adding a photo: drop the original in `assets-source/`, add it to `PHOTOS` in `scripts/build-assets.mjs`, run `npm run assets`, then reference it by base name.

## Design system

Six colours, two faces, no shadows and no borders except 1px rules.

- **Schibsted Grotesk** 400/500/600 — everything not italic.
- **Newsreader italic**, with the **optical-size axis** — statements, captions, descriptions, notes. The axis is what makes the 70px hero statement a display cut rather than an enlarged text cut; it is visibly finer, and it is kept deliberately (see the performance note below).
- Teal and gold are accents only — section labels, one footer line, link hovers. Never a fill.

The bee glyph is the spine motif beside every section label. The supplied file is white on transparent, so it ships as-is on the dark ground and is recoloured teal on the light ground with a CSS `mask` — never `filter: invert`, which would only give black.

## Assets

`assets-source/` holds the client's originals. `npm run assets` derives what the site serves into `public/assets/` and writes `src/lib/image-manifest.json`, which the `Photo` component reads to build `srcset`. Derivatives are committed, so a deploy never needs `sharp`.

- Photography → AVIF + WebP + JPEG at 320/480/640/800/1000/1280 px
- Wordmarks and bee glyph → background keyed to transparency and trimmed
- Favicons

`case-overhead.jpg`, `fig-ricotta.jpg`, `sandwiches.jpg` and `bee-disc.png` are unused by this direction and are kept in the repo but never rendered (the bee disc still backs the favicon).

The hero loop is a 5.7-second silent cut of the one continuous pan along the case, cross-dissolved tail-to-head so it loops without a visible cut. It is skipped entirely under `prefers-reduced-motion`, Save-Data, or a 2G/3G connection — those visitors keep the still and lose nothing. The full `ffmpeg` recipe is in the previous revision of this file in git history.

## Deviations from the handoff

Two, both deliberate:

1. **Tags on the dark ground sit at 52% rather than 45%.** Canvas at 45% over ink measures 4.26:1, which misses AA at 10.5px. Every other tint in the handoff's dark scale already clears 4.5:1 and is used as specified.
2. **The hero wordmark is fluid between 390 and 1024.** The handoff draws it at 300px wide on mobile and 132px tall on desktop with nothing in between; held at 300px, it reads undersized across the tablet range. It now grows to 460px at 768 and pins to the specified 132px from 1024 up.

## Performance

Lighthouse, mobile, on the production build:

| | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| Home | 90 | 100 | 100 | 100 | 0 |
| Menu | 90 | 100 | 100 | 100 | 0 |

LCP is 2.1s (Home) and 1.8s (Menu) under real 4G throttling, and ~3.7s under Lighthouse's simulated pipe, which serialises the whole page against a 1.6 Mbps link.

Performance is short of the ≥95 target, and the gap is almost entirely the Newsreader variable font: carrying the optical-size axis costs 81KB and about three Lighthouse points. Dropping the axis was measured — it reaches 93 — but it visibly coarsens the hero statement, which is the single most prominent piece of typography on the site. The axis was kept. Deferring its preload instead was also measured and is worse: FCP goes from 0.8s to 1.7s. Recovering the remaining points means giving up one of the two specified typefaces or the photography itself.

## Launch checklist

- `robots.txt` and `sitemap.xml` are generated from the route list at build time.
- The social card is a real 1200x630 landscape at `public/og.jpg`, composed in the asset pipeline. A 3:4 photograph crops its subject out of a link preview, and for this bakery most inbound traffic is a link pasted into Instagram.
- Canonical and OG URLs default to `sweetbeebakehouse.com`. **Set `NEXT_PUBLIC_SITE_URL` on any preview deployment** so it does not advertise itself as the canonical copy of the live site.
- `/404` renders in the design language rather than Next's default.
- A skip-to-content link is the first tab stop on every page.

## Still needed from the client

- Confirmation of both press lines. They carry `confirmed: false`, so the rows render as plain text with a visible note rather than as citations, and no URLs are invented.
- Confirmation of the menu items and prices, which were carried over from the previous build and re-cut into four categories.
- A public email address and phone number. Both are `null` in `src/data/site.ts` and nothing is shown in their place.
- Confirmation that Tuesday / Thursday / Saturday hours are current.
