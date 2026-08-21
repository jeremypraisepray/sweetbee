# Sweet Bee Bakehouse

The website for Sweet Bee Bakehouse — a croissant-focused bakery at 2540 E Broadway St., Suite A, Pearland, TX.

Built from the design handoff in `docs/handoff/`. Next.js (App Router) + TypeScript + Tailwind, statically rendered, no CMS and no server state.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static prerender of / and /menu
npm run assets       # re-derive everything in public/assets from assets-source/
npm run typecheck
```

## Editing content

Every piece of copy the bakery changes lives in one typed file. Nothing below requires touching layout code.

| What | Where |
|---|---|
| **"In the case today"** — the weekly line under the hero | `src/data/menu.ts` → `inTheCaseToday` |
| Menu items, prices, descriptions, seasonal flags, photos | `src/data/menu.ts` → `menuItems` |
| The six-item Home rail | `src/data/menu.ts` → `caseRail` |
| "Current favorites" on the menu | `src/data/menu.ts` → `currentFavorites` |
| Press mentions | `src/data/menu.ts` → `press` |
| Hours, address, ordering and social links | `src/data/site.ts` |

Adding a photo to a menu item: put the original in `assets-source/`, add it to the `PHOTOS` list in `scripts/build-assets.mjs`, run `npm run assets`, then set `img` on the item to the base name. Items with `img: null` render the designed "Photograph coming" panel — that is intentional voice, not a gap to paper over with stock imagery.

## Assets

`assets-source/` holds the client's originals. `npm run assets` derives everything the site actually serves into `public/assets/`, and writes `src/lib/image-manifest.json`, which the `Photo` component reads to build `srcset`. Derivatives are committed, so a deploy never needs `sharp`.

- Photography → AVIF + WebP + JPEG at 320/480/640/800/1000/1280 px
- Wordmarks and bee marks → background keyed out to transparency, trimmed, and (for the glyph) lifted off its disc so it reads on teal
- Favicon and apple-touch-icon

The hero video was cut once, by hand, from the client's 29-second reel — a 5.7-second silent loop of the single continuous pan along the pastry case (source 4.6s–10.9s), cross-dissolved tail-to-head so it loops without a visible cut:

```sh
ffmpeg -ss 4.6 -t 6.3 -i <source>.mp4 -an -vf "scale=720:1280:flags=lanczos" \
  -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p seg.mp4
ffmpeg -i seg.mp4 -filter_complex "\
  [0:v]trim=0.6:5.7,setpts=PTS-STARTPTS[body];\
  [0:v]trim=5.7:6.3,setpts=PTS-STARTPTS[tail];\
  [0:v]trim=0:0.6,setpts=PTS-STARTPTS[head];\
  [tail][head]blend=all_expr='A*(1-(T/0.6))+B*(T/0.6)'[seam];\
  [seam][body]concat=n=2:v=1:a=0[out]" -map "[out]" -an \
  -c:v libx264 -crf 32 -preset veryslow -pix_fmt yuv420p -movflags +faststart \
  public/video/bakery.mp4
```

The poster is a mid-loop frame, not frame zero: it is the LCP image, so it should be the most appetising frame, and the frames at the head of the clip have customers' faces in them.

## Deviations from the handoff

Three, all deliberate:

1. **`subtle` and `faint` were darkened.** The handoff's `#8A8078` and `#B0A79E` measure 3.6:1 and 2.2:1 on cream. Both are used for text under 18.66px, where AA needs 4.5:1, and the handoff's own acceptance criteria call for AA throughout. They are now `#726A63` (4.97:1) and `#786F68` (4.61:1) — same warm grey, three tiers preserved.
2. **Closed days are no longer dimmed with `opacity`.** 45% opacity on the Visit panel and 55% in the footer dragged cream on teal below 3.1:1. Closed rows now carry their own quieter colour (`rgba(251,247,241,.66)`, 4.7:1) so they still read as secondary — the point of stating them rather than omitting them.
3. **No WebM.** At matched quality the VP9 cut came out the same size as H.264, so the second file bought nothing but a larger download in Chrome. The hero ships one 668KB MP4, and it is skipped entirely under `prefers-reduced-motion`, Save-Data, or a 2G/3G connection.

## Still needed from the client

- Exact CultureMap and Texas Monthly citation titles, dates and URLs. Until `confirmed: true` is set on those entries, the press section renders a visible note and no fabricated citations.
- A public email address and phone number. Both are `null` in `src/data/site.ts` and the Visit panel shows the "to be confirmed" placeholder rather than inventing contact details.
- Photographs for the eight unshot menu items and most of the Sweets.
- Confirmation that Thu–Sat hours are current.
