# Handoff: Sweet Bee Bakehouse — Direction 4 "The Quiet Case"

## The prompt to paste into Claude Code

> Rebuild the Sweet Bee Bakehouse site to match the design reference in this folder and redeploy to Vercel.
>
> `Sweet Bee - Design Direction 4.dc.html` is a **high-fidelity design reference** — a working HTML prototype showing exactly what to ship. Do not copy its markup or its runtime (`support.js`); recreate it in this repo's existing Next.js/Tailwind stack, reusing the current data files and components where they fit. Read this README as the authority on values; open the HTML in a browser to see the result. **This replaces the previous design entirely** — remove the previous home layout, the horizontal case browser, the counter annotations, the menu preview panel, the category tabs, the hero parallax, and any accent-bordered cards.
>
> Scope: two routes — Home (`/`) on a light ground and Menu (`/menu`) on a dark ground — plus a mobile nav overlay you may carry over from the current build restyled to these tokens. No prices anywhere except `/menu`. Ordering is an outbound link to Hotplate. Photography and video already live in the repo's `/public` (same filenames as `/assets` here).
>
> Ship: semantic HTML, keyboard-accessible, AA contrast, `prefers-reduced-motion` honored (disables the scroll reveal), Lighthouse ≥95 performance + accessibility, responsive at 390 / 768 / 1024 / 1440 / 1920. Commit, push, confirm the Vercel preview, then promote to production.

---

## Overview

Direction 4 is a **restrained, editorial** redesign modeled on the client's references (sushidoko.com, aikohtx.com, tatemohtx.com, maximo-htx.com): one photograph per screen, one italic statement, one paragraph, generous whitespace, 1px rules instead of cards. The only interaction is scrolling. A small bee glyph recurs beside every section label (the "spine" motif). Home is light; Menu is dark; the dark footer on Home bridges the two.

Business facts (canonical):

- Sweet Bee Bakehouse, 2540 E Broadway St, Ste A, Pearland, TX 77581
- Hours: **Tuesday 10–6 · Thursday 10–6 · Saturday 10–4** · otherwise closed
- Ordering: Hotplate — `https://www.hotplate.com/sweetbeebakehouse`
- Instagram: `https://www.instagram.com/sweetbeebakehouse/`
- Owner/baker: Ally B. · Est. 2020
- Press lines are **placeholders** — confirm with client before shipping: "CultureMap — Tastemaker Awards 2026", "Texas Monthly — The 50 Best Bakeries in Texas".
- Menu items and prices are **carried over from the previous build** — confirm with client.

## About the design file

`Sweet Bee - Design Direction 4.dc.html` renders two turn-sections on one canvas: **4b** (Menu desktop + mobile, dark) at the top and **4a** (Home desktop + mobile, light) below it. Each frame is an inline-styled artboard: desktop 1440px wide, mobile 390px. All values below are read directly from it. The proprietary runtime (`support.js`) is only for authoring — none of it ships.

## Fidelity

**High-fidelity.** Match colors, type, spacing and image crops. Copy is final except where flagged above.

---

## Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FAF8F2` | Home page ground; type on dark |
| `ink` | `#1D1C19` | Primary type on light; Menu page ground; Home footer |
| `body` | `#3F3C36` | Paragraph copy on light |
| `muted` | `#6E6A61` | Captions, phonetic line, price/secondary on light |
| `teal` | `#00707A` | Section labels + bee glyph on light; link hover on light |
| `gold` | `#F4E07B` | Nav underline, one italic footer line, section labels on dark, link hover on dark |
| rules on light | `rgba(29,28,25,.20)` / `.18` / `.12` | Section rule / list rule / row rule |
| rules on dark | `rgba(250,248,242,.22)` / `.16` / `.14` | List top / footer / row |
| type on dark | `rgba(250,248,242,.92)` body · `.72` descriptions · `.68` lede · `.62` category notes · `.55` footer headings · `.50` captions · `.45` tags |

Teal and gold are used **sparingly** — never as fills or backgrounds. No other colors. `::selection` is gold on ink.

### Typography

- **Schibsted Grotesk** 400/500/600 — everything not italic.
- **Newsreader** italic, optical size axis, weight 200–500 — statements, captions, descriptions, category notes. Load: `Newsreader:ital,opsz,wght@1,6..72,200..500`.

| Role | Face | Size / line / tracking |
|---|---|---|
| Nav links | Schibsted 500 caps | 11.5px, tracking .18em (mobile 11px) |
| Section label (eyebrow) | Schibsted 600 caps | 11px, tracking .22em, teal on light / gold on dark (mobile 10.5px) |
| Hero definition statement | Newsreader italic 300 | 70px / 1.08 / −.02em, max 18ch, balanced (mobile 38px / 1.1) |
| Menu page title | Newsreader italic 300 | 64px / 1.08 / −.02em (mobile 36px) |
| Section statement | Newsreader italic 300 | 46px / 1.15 / −.015em (mobile 32px) |
| Footer statement (gold) | Newsreader italic 300 | 30px / 1.2 (mobile 24px); menu CTA 34px (mobile 26px) |
| Paragraph | Schibsted 400 | 17px / 1.7, max 50–52ch, `text-wrap: pretty` (mobile 15.5px) |
| Phonetic line | Schibsted 400 | 13px, tracking .06em, muted |
| Press publication | Schibsted 500 | 26px / −.01em (mobile 20px) |
| Press award | Newsreader italic | 19px muted (mobile 16px) |
| Photo caption | Newsreader italic 400 | 14px muted (mobile 13.5px) |
| Photo caption label | Schibsted 600 caps | 11px, tracking .18em, muted |
| Menu item name | Schibsted 500 | 22px / −.01em (mobile 18px) |
| Menu item tag | Schibsted 600 caps | 10.5px, tracking .16em, 45% (mobile 10px) |
| Menu description | Newsreader italic | 18px / 1.5, 72% (mobile 15.5px) |
| Menu price | Schibsted 400 tabular | 18px, right-aligned, min-width 44px (mobile 16px, nowrap) |
| Category note | Newsreader italic 300 | 22px / 1.35, 62%, max 20ch (mobile 19px) |
| Footer heading | Schibsted 600 caps | 10.5px, tracking .2em, 55% |
| Footer body | Schibsted 400 | 14.5px / 2.1 (hours) or 1.7 (address); mobile 14px / 2 and 1.7 |
| Footer legal | Schibsted caps | 10.5px, tracking .16em, 50% (mobile 9.5px) |

### Spacing & layout

- Desktop gutter **48px**; mobile **20px**. 12-column grid, 24px gap, on desktop.
- Media corners **0px**. No shadows, no borders, no cards. Framing is done by 1px rules only.
- Vertical rhythm (desktop): section-to-section 170–180px; image-to-text 88–96px; label-to-statement 36–44px; statement-to-paragraph 30px; paragraph-to-link 34px. Mobile: 96px / 44px / 22px / 20px / 26px.
- Text sits **beside** photos, never over them — except the hero.

### Motion

- Scroll reveal on every home section (`[data-reveal]`): opacity 0→1, translateY 16px→0, 900ms `cubic-bezier(.2,.7,.2,1)`, IntersectionObserver threshold .12, fires once. Disable under `prefers-reduced-motion`.
- Link hovers: color to teal (light) / gold (dark), or underline gold; no transitions longer than 200ms.
- Nothing else moves. No parallax, no carousels, no crossfades.

---

## Screens

### 1 · Home — Desktop (1440)

**Hero** — full-bleed, height 900px, `background:#1D1C19`. `bakery.mp4` autoplay/muted/loop/playsinline, `object-fit:cover`, poster `choc-croissants.jpg`. Overlay gradient: `to bottom, rgba(29,28,25,.42) 0%, .08 35%, .08 65%, .5 100%`.
- Nav (absolute top, padding 34px 48px, flex space-between, canvas type 11.5px caps .18em): left group gap 36px — Menu / Story / Visit (hover: 1px gold underline); right — "Order ahead ↗" with a resting gold underline (hover: text gold).
- Center: `wordmark-light.png` height 132px, `drop-shadow(0 2px 18px rgba(0,0,0,.25))`.
- Bottom row (left/right 48px, bottom 36px, flex space-between, align end, canvas 92%, 11px caps .18em): left — "2540 E Broadway St, Ste A / Pearland, TX 77581" (line-height 1.9); center — Newsreader italic 300 20px normal-case "Tuesday & Thursday 10–6 · Saturday 10–4"; right — "Est. 2020".

**Definition** — padding 170px 48px 150px, centered column. Label row (bee glyph 15px teal + "Sweet Bee"), statement "Your neighborhood croissant maker." (70px), phonetic "/swēt bē/ · noun", paragraph (18px, max 52ch): "A croissant-focused bakehouse in Pearland. Six years in a home kitchen, now a storefront on Broadway. Three days per batch of dough, a small case, and a menu that changes without warning."

**The Case** — `choc-croissants.jpg` inside 48px gutters, height 820px, cover, position 50% 60%. Below (96px), centered column: label "The Case", statement "Six things worth driving for.", paragraph "The traditional butter croissant is always here. Everything around it rotates — what's in the case Thursday morning may be gone by Saturday noon.", link "SEE THE MENU" (11.5px caps .18em, 1px ink underline, hover teal) → `/menu`.

**Pair** — margin-top 170px, 48px gutters, 2 equal columns gap 24px. Left `pistachio.jpg`, right `buckeye-buns.jpg`, both height 760px cover. Under each (14px), flex space-between: caps label ("Pistachio" / "Buckeye Bun") and italic 14px note ("Spring" / "Always").

**Our story** — margin-top 180px, 12-col grid align center. Cols 1–6: `ally.jpg` height 840px cover, position 50% 22%. Cols 8–11 (padding-right 24px): label "Our story", statement "Hi, I'm Ally.", two paragraphs (17px): "Sweet Bee started in my kitchen at home — six years of baking for friends, neighbors, and anyone who'd take a box off my hands. Now there's a storefront, a case, and a line on Saturdays." / "Croissants are the thing I care most about. Three days of folding, an unreasonable amount of butter, and then whatever flavor I couldn't stop thinking about that week." Then `wordmark-dark.png` height 30px, opacity .9, margin-top 40px.

**Press** — margin-top 180px, 12-col grid. Cols 1–3 label "Press". Cols 4–11: rows separated by 1px `rgba(29,28,25,.18)` top rules plus a closing rule; each row is a link, padding 26px 0, flex space-between: publication (26px/500) left, award (Newsreader italic 19px muted) right; whole row hover → teal.

**Closing image** — margin-top 170px, full-bleed `case-counter.jpg` height 760px cover, position 50% 45%.

**Footer** — `#1D1C19`, padding 120px 48px 44px. 12-col grid: cols 1–5 `wordmark-light.png` h58 + gold italic 30px "Get here before they're gone." (margin-top 34px); cols 7–8 HOURS (Tuesday 10 – 6 / Thursday 10 – 6 / Saturday 10 – 4 / "Otherwise closed" at 45%); cols 9–10 FIND US (address 2 lines + "DIRECTIONS ↗" gold-underlined link); cols 11–12 ELSEWHERE (Instagram ↗ / Order on Hotplate ↗ / Menu, gap 12px, hover gold). Bottom bar margin-top 96px, 1px rule 16%, flex space-between 10.5px caps 50%: bee glyph (white, opacity .7) + "Sweet Bee Bakehouse — 2540 E Broadway St, Ste A, Pearland, TX 77581" / "© 2026".

### 2 · Home — Mobile (390)

Same order, single column, 20px gutters.
- Hero 720px: hamburger (two 1px lines, 22px wide) left, "ORDER ↗" right, wordmark centered **width 300px / max-width 82%**, bottom italic 17px centered "Tue & Thu 10–6 · Sat 10–4".
- Definition padding 84px 20px 76px; statement 38px.
- Case image 470px (pos 50% 60%); text block **centered**.
- Pair: 2-col grid gap 12px, images 240px, caps labels 10px .16em.
- Ally image 520px (pos 50% 20%), text left-aligned, wordmark-dark h24.
- Press rows stack pub (20px) over award (16px), padding 20px 0.
- Closing image 420px.
- Footer padding 72px 20px 30px: wordmark h44, gold italic 24px, 2-col grid (Hours / Find us — address on **three lines**: "2540 E Broadway St / Ste A / Pearland, TX 77581"), link row gap 24px, bottom bar.

### 3 · Menu — Desktop (1440), dark

Ground `#1D1C19`, type canvas.
- Nav padding 34px 48px, three-part: links left ("Menu" active with gold underline; Story / Visit at 70% → hover 100% + gold underline), `wordmark-light.png` h34 centered, "Order ahead ↗" right.
- Title block padding 130px 48px 110px centered: gold label (white bee glyph 14px + "The Menu"), statement 64px "What's in the case this week.", lede 16px 68% max 48ch "Updated Tuesday morning. Seasonal items rotate without notice; when something's gone, it's gone.", then category jump links (gap 44px, 11px caps .18em at 60%, hover 100% + gold underline): Originals / Seasonal / Savory / Sweets.
- Categories: container padding 0 48px 140px, gap **150px** between categories. Each category = photo block + list, gap 72px:
  - Photo: full width inside gutters, height 620px cover; caption row 14px below, flex space-between: caps category name 11px 50% / italic 14px caption.
  - List: 12-col grid. Cols 1–3: gold label (white glyph + name) + italic 22px note (62%, max 20ch). Cols 4–11: 1px top rule 22%, then rows — grid `1fr 2fr auto` gap 40px, padding 26px 0, 1px bottom rule 14%: [name 22px + tag 10.5px caps 45%] · [description italic 18px 72%] · [price 18px tabular right].
- CTA block padding 0 48px 140px centered: gold italic 34px "Pre-orders open Sunday night. Walk-ins until the case is empty." + "ORDER ON HOTPLATE ↗" (gold-underlined, hover gold).
- Footer: same grid as Home footer but starts with a 1px rule 16% and padding-top 60px; "Elsewhere" third link is "Home".

**Category data** (image · pos · caption · note · items name / tag / description / price):

Originals · `choc-croissants.jpg` · 50% 60% · "Chocolate, bi-color lamination" · "Always in the case. Three days per batch."
- Traditional Butter / Every day / Three days of folding. Nothing added. / $5
- Chocolate / Every day / Bi-color dough, Callebaut center. / $6
- Almond Raspberry / Every day / Twice baked with frangipane and raspberry gel. / $6
- Croissant Loaf / Saturday only / A whole laminated loaf. Six per Saturday. / $14

Seasonal · `pistachio.jpg` · 50% 50% · "Pistachio cream, this week" · "Rotates without notice. Gone when it's gone."
- Pistachio Cream / This week / Pistachio pastry cream, laminated green and gold. / $7
- Fig & Ricotta / This week / Whipped ricotta, roasted fig, honey, black pepper. / $7
- Strawberry Shortcake / Under glass / Macerated strawberries, vanilla bean cream. / $7

Savory · `crab-rangoon.jpg` · 50% 45% · "Crab rangoon, cooling" · "Good at ten in the morning. Better at noon."
- Ham & Gruyère / Every day / Béchamel, shaved ham, aged gruyère on top. / $8
- Crab Rangoon / This week / Cream cheese, scallion, sweet chili. Yes, really. / $8
- Pepperoni Hot Honey / This week / Cup-and-char pepperoni, mozzarella, hot honey. / $8
- Focaccia Sandwich / Every day / House focaccia, turkey, herb aioli. / $12

Sweets · `macarons.jpg` · 50% 50% · "Macarons, four flavors" · "For the box on the way out."
- Macarons / Four flavors / Biscoff, coconut ube, birthday cake, chocolate ganache. / $3
- Buckeye Buns / Every day / Peanut butter filling, dark chocolate glaze. / $4
- Cookie of the Week / Rotating / Whatever Ally can't stop thinking about. / $4

Keep this in a typed data file so the client can edit items without touching layout.

### 4 · Menu — Mobile (390), dark

- Nav padding 22px 20px: hamburger / wordmark h24 / "ORDER ↗".
- Title padding 64px 20px 56px centered; statement 36px; jump links wrap, gap 14px 26px.
- Categories gap 88px. Each: photo 300px cover, italic caption 13.5px 50% (12px below, 36px above label), gold label, note 19px (28px below), 1px rule, rows padding 20px 0: name 18px + price 16px nowrap on one line, description 15.5px, tag 10px.
- CTA 26px gold italic; footer 2-col with the same three-line address.

### 5 · Mobile nav overlay (not drawn — carry over)

Reuse the existing overlay; restyle: ink ground, canvas type, Newsreader italic 300 for the three links (Menu / Story / Visit) at ~40px, "Order ahead ↗" with gold underline, hours + address in 11px caps at the bottom. No animation beyond a 200ms fade.

---

## Bee glyph rule

`bee-glyph.png` is **white on transparent**. On dark ground use it as-is (`<img>`, height 14px desktop / 12px mobile). On light ground it must be **teal** — render via CSS mask: a 15px (13px mobile) span with `background:#00707A; mask:url(bee-glyph.png) center/contain no-repeat`. Never apply `filter:invert`.

## Assets (already in repo `/public`, mirrored in `/assets` here)

Used: `bakery.mp4`, `choc-croissants.jpg`, `pistachio.jpg`, `buckeye-buns.jpg`, `ally.jpg`, `case-counter.jpg`, `crab-rangoon.jpg`, `macarons.jpg`, `wordmark-light.png`, `wordmark-dark.png`, `bee-glyph.png`.
Not used in this direction (leave in repo, don't render): `case-overhead.jpg`, `fig-ricotta.jpg`, `sandwiches.jpg`, `bee-disc.png`.
Serve images via `next/image` with the `object-position` values above; video gets a poster and `preload="metadata"`.

## Files in this bundle

- `Sweet Bee - Design Direction 4.dc.html` — the design reference (open in a browser; 4b Menu on top, 4a Home below)
- `support.js` — prototype runtime only; do not ship
- `assets/` — photography, video, wordmarks, glyph
- `README.md` — this document
