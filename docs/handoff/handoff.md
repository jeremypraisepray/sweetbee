# Handoff: Sweet Bee Bakehouse — Website Redesign

## The prompt to paste into Claude Code

> Build the Sweet Bee Bakehouse website from the design references in this folder.
>
> `Sweet Bee Bakehouse.dc.html` is a **high-fidelity design reference** — a working HTML prototype of the intended look and behavior. Do not ship it or copy its markup. Recreate it in a production stack: if this repo already has a framework and component conventions, use those. If it does not, use **Next.js (App Router) + TypeScript + Tailwind**, statically rendered, with content in typed data files so the menu and the "in the case today" line can be edited without touching layout code.
>
> `Sweet Bee Design Blueprint.pdf`/`.dc.html` is the creative direction: read it for intent, pacing and motion rules. `README.md` (this file) is the authority on exact values.
>
> Scope: three routes — Home (`/`), Menu (`/menu`), and anchored Story/Visit sections on Home. No CMS, no auth, no cart. Online ordering is an outbound link to Hotplate. Photography and video are supplied by the client; see the Assets section for the manifest and the required derivatives.
>
> Ship: semantic HTML, keyboard-accessible, AA contrast, `prefers-reduced-motion` honored, Lighthouse ≥95 on performance and accessibility, LCP < 2.0s on 4G mobile, responsive at 375 / 768 / 1024 / 1440 / 1920.

---

## Overview

A complete redesign of sweetbeebakehouse.com for Sweet Bee Bakehouse, a croissant-focused bakery in Pearland, TX. The organizing idea is **the pastry case**: a small number of extraordinary objects, deliberately arranged, described on tiny paper labels, rotating without warning. The site is photography-led and editorial in pacing; the menu is the signature experience.

Business facts (canonical — anything conflicting on the current WordPress site is outdated):

- Sweet Bee Bakehouse, 2540 E Broadway St., Suite A, Pearland, TX 77581
- Thursday 10 AM–6 PM · Friday 10 AM–6 PM · Saturday 10 AM–4 PM · Sun–Wed closed
- Online ordering: Hotplate — `https://www.hotplate.com/sweetbeebakehouse`
- Instagram: `https://www.instagram.com/sweetbeebakehouse/`
- Owner/baker: Ally B.
- Email and phone: **not yet confirmed — do not invent.** Leave the marked placeholders in place.

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy. The `.dc.html` files use a proprietary component runtime (`support.js`, `doc-page.js`) purely so the prototype could be authored quickly; **none of that runtime belongs in the production build**. Open them in a browser to see the design; read this README for the values.

The task is to recreate these designs in the target codebase's environment using its established patterns and libraries — or, if no environment exists, to pick the appropriate framework (recommendation above) and implement there.

## Fidelity

**High-fidelity.** Colors, typography, spacing, imagery treatment and interactions are final and should be matched closely. Where this README gives a pixel value, use it. Copy text is final unless flagged.

---

## Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `ink` | `#17130F` | All primary type |
| `body` | `#4A423B` | Body copy, secondary type |
| `muted` | `#6C645C` | Menu descriptions |
| `subtle` | `#8A8078` | Eyebrows on light, captions |
| `faint` | `#B0A79E` | Notes, disclaimers |
| `cream` | `#FBF7F1` | Page background |
| `paper` | `#FFFDFA` | Labels, alternate section background |
| `teal` | `#00707A` | Primary CTA fill, eyebrows, active chip, accents |
| `teal-deep` | `#0F4E56` | Full-bleed statement panels, footer, CTA hover |
| `teal-mid` | `#3AA1A8` | Reserved; unused in current comps |
| `gold` | `#F4E07B` | Hairline rules, on-teal CTA fill, underlines, selection |
| `gold-warm` | `#FFAE32` | **Hover only** — never a resting state |

Overlay values used verbatim in the comps: `rgba(23,19,15,.10/.12/.13/.14/.16/.18/.20/.22)` for hairlines and dividers on light; `rgba(251,247,241,.14/.16/.18/.35/.45/.50/.72/.74/.76/.82)` for type and rules on teal; `rgba(244,224,123,.45/.5/.8/.85)` for gold at reduced strength; `rgba(0,112,122,.05)` row wash, `rgba(0,112,122,.07)` note background, `rgba(0,112,122,.35/.55)` hairline frames.

Balance target: ~75% cream/paper/photography, ~15% teal family, ~8% gold. Teal appears as whole panels, never as tints scattered everywhere. Gold never fills a large area except a CTA on deep teal.

Contrast (verified): ink/cream 15.6:1 · cream/teal-deep 8.7:1 · ink/gold 12.4:1 · body/cream 9.4:1. All AA at body size.

### Typography

- **Display — Newsreader** (Google Fonts), weights 200–700, roman + italic, optical sizing on. Used for all headlines, prices, menu item names, addresses, stat figures, and pull quotes.
- **Utility — Archivo** (Google Fonts), 400/500/600. Body copy, navigation, eyebrows, labels, descriptions, buttons.
- **Script** — the existing Sweet Bee wordmark, **image asset only**, never set as live text. Max three appearances per page.

Load exactly: `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&family=Archivo:wght@400;500;600;700&display=swap` with `preconnect` to both font hosts. Self-hosting with `font-display: swap` is preferred in production.

Scale (desktop → mobile):

| Role | Desktop | Mobile | Spec |
|---|---|---|---|
| Hero H1 | 90px | 44px | Newsreader 400, line-height .96, tracking −.025em |
| Menu H1 | 112px | 46px | Newsreader 400, .92, −.03em |
| Statement | 118px | 50px | Newsreader 300, .94, −.03em |
| Section H2 | 78 / 66 / 62 / 56px | 38–46px | Newsreader 400, .98–1, −.02 to −.024em |
| Sub-head H3 | 44 / 30px | 22–30px | Newsreader 400, 1–1.15 |
| Item name | 27px | 22px | Newsreader 400, 1.15 |
| Price | 20px | 17px | Newsreader 400 |
| Body lead | 17px | 14.5px | Archivo 400, 1.66–1.72 |
| Body | 15–16.5px | 13–14.5px | Archivo 400, 1.6–1.7 |
| Eyebrow | 10.5px | 9–9.5px | Archivo 600, .2em tracking, uppercase |
| Nav / button | 11–11.5px | 11px | Archivo 600, .14–.15em, uppercase |
| Label eyebrow | 8.5px | 7.5px | Archivo 600, .17em, uppercase |

Never below 14px for body on any breakpoint. Headline line breaks are authored by hand (`<br>`) plus `text-wrap: balance`; body copy gets `text-wrap: pretty`.

### Spacing, radius, shadow

- 8px base. Section rhythm: 104–152px vertical desktop, 56–72px mobile. Page gutter 48px desktop / 36px laptop / 20px mobile. Content measure `max-width: 1440px`, centered.
- Border radius: **2px everywhere** — images, buttons, panels, chips. No pills, no cards with 12px+ radius.
- Shadows only on the label object and phone frames: `0 8px 20px rgba(23,19,15,.10)`, `0 12px 30px rgba(23,19,15,.11)`, `0 14px 34px rgba(23,19,15,.14)`, `0 26px 60px rgba(23,19,15,.24)` for the breakout crop.
- Hairlines are 1px at 10–22% ink on light, 14–18% cream on teal. Section-heading rules under numbered headings are 1.5px solid ink.

### Buttons — three treatments only

1. **Primary (on light):** teal fill, cream type, 11.5px/600/.14em uppercase, padding 17px 28px, radius 2px, trailing `→`. Hover → `teal-deep`, 240ms ease.
2. **Secondary:** ink type, no fill, `padding-bottom: 7px`, `border-bottom: 1.5px solid gold`, trailing `↗` for external. Hover → border `gold-warm`.
3. **Primary (on teal):** gold fill, ink type, same metrics. Hover → `gold-warm`.

Min 48px tall on touch. Focus: 2px gold ring, 2px offset (on teal, gold ring reads; on light, gold ring + 1px ink inner edge).

### The label object (signature component)

```
background: #FFFDFA; border: 1px solid rgba(23,19,15,.13);
padding: 11–13px 15–17px; box-shadow: 0 10px 26px rgba(23,19,15,.10);
transform: rotate(±0.6deg … ±1.4deg);
```
Contents: 8.5px/600/.17em uppercase category in teal (or `subtle` for non-seasonal) → 1px gold rule → Newsreader 18–21px name + price in `body`. Always overlaps the photograph it names. **Rotation is allowed nowhere else on the site.** Randomize the angle per instance from a fixed set so it doesn't look mechanical.

---

## Screens / views

### Global — header

Fixed, full width, `z-index: 90`, height 78px. `background: rgba(251,247,241,.92)` + `backdrop-filter: blur(14px)`, `border-bottom: 1px solid rgba(23,19,15,.10)` (the border appears once the page has scrolled >8px; the bar never shrinks, hides, or re-animates on scroll direction).

Inner: `max-width:1440px`, `padding: 0 48px`, flex space-between.
- Left: `wordmark-dark.png` at 30px height, links to `/`.
- Right: `Home · Menu · Our Story · Visit` — Archivo 11px/600/.15em uppercase ink, `padding: 6px 0`, `border-bottom: 1.5px solid transparent`; hover and current-page draw the gold underline. Then a 1px × 20px `rgba(23,19,15,.14)` divider, then **Order Online** as the primary teal button at reduced size (13px 20px padding, 11px type, trailing `↗`, `target="_blank" rel="noopener noreferrer"`).
- "Our Story" and "Visit" scroll to `#story` / `#visit` on Home (offset −78px, smooth).

**Mobile header:** wordmark 19px + a two-line 20×1.5px ink mark. Tapping cross-fades in a full-height cream sheet: four 32px Newsreader links stacked, a gold rule, Order Online as a full-width teal button, Instagram beneath. Sheet fades 260ms while the list rises 12px. No slide-in drawer, no hamburger→X rotation. Trap focus; `Esc` closes.

### Home

Nine movements. Full-bleed teal appears exactly twice on the page.

**1 · Hero — asymmetric split.** `padding: 96px 48px 88px` under the 78px header. Grid `1fr 470px`, gap 72px, `align-items: center`.
- Left: bee eyebrow row (`bee-disc.png` 19px + "A bakehouse in Pearland, Texas" eyebrow, gap 12px, margin-bottom 34px) → H1 90px `Your neighborhood` / `<em>croissant maker.</em>` (second line italic, `teal-deep`) → lead paragraph 17px, `max-width: 46ch`, margin-top 34px: "Six years a home baker, turned storefront." → CTA row (gap 30px, margin-top 44px): primary "Explore the Menu →" + secondary "Order Online ↗" → metadata row at margin-top 64px: `Thu – Sat` · 22px×1px rule · `2540 E Broadway St., Suite A`, 11px/500/.13em uppercase in `subtle`.
- Right: 470×626 vertical video, `object-fit: cover`, autoplay/muted/loop/playsinline, no controls, poster frame required. A 1px `rgba(244,224,123,.85)` frame sits offset `left:-16px; top:18px` behind it. A label ("In the case today / Pistachio Cream / $7") overlaps at `left:-42px; bottom:52px`, rotate −1.4deg.
- Load: left column `translateY(18px)→0` + fade, 900ms `cubic-bezier(.2,.7,.2,1)`; video fades in over 1200ms.
- Mobile: video becomes a full-bleed 430px block; H1 44px sits over its lower third on `linear-gradient(to top, rgba(15,20,18,.82), rgba(15,20,18,0))` with the eyebrow in gold; lead + two stacked full-width CTAs below.

**2 · "In the case today" band.** `teal-deep`, `padding: 17px 48px`, centered flex wrap, gap 22px, 10.5px/600/.19em uppercase `rgba(251,247,241,.72)`, first item gold, `/` separators at `rgba(244,224,123,.5)`. Five items. **This is the one piece of content the client edits weekly** — put it in a single editable data field. Not a marquee. Horizontally scrollable on mobile at 9px.

**3 · What's in the case?** `padding: 118px 0 104px`. Header row: left = teal eyebrow "Product discovery" + H2 78px "What's in the case?"; right = 15px prose ("Six things worth driving for. Drag sideways — the real case is longer than this.") + "See the full menu →" secondary link, `align-items: flex-end`.
- Rail at margin-top 74px, `padding: 0 48px 22px`, `overflow-x: auto`, flex `align-items: flex-end`, gap 34px, `min-width: max-content`. **Every image a different size** — 392×522, 308×412, 344×344, 368×462, 280×374, 332×436 — bottom-aligned so the tops stagger. Each: image → 1px `rgba(23,19,15,.22)` rule at margin-top 22px → label overlapping the rule by 1px, alternating rotation.
- Scrollbar: 3px track `rgba(23,19,15,.06)`, thumb `rgba(23,19,15,.22)`.
- Drag-to-scroll with momentum + wheel/trackpad. Label lifts 2px and deepens shadow on hover. Rail deliberately overflows the right gutter.
- Mobile: same rail, ~230/190px crops, CSS scroll-snap, next item peeking at the edge.

**4 · Brand statement.** `teal-deep`, `padding: 152px 48px 148px`. Gold eyebrow "The Sweet Bee theory" (margin-bottom 52px) → 118px Newsreader **300** cream: "We could have / stopped at butter." → right-aligned block (`margin-right: 60px`) 118px gold italic: "We didn't." → at margin-top 76px, `bee-glyph.png` 26px + 15px `rgba(251,247,241,.74)` paragraph, `max-width: 52ch`: "Somewhere between the traditional and the frankly unhinged is a croissant filled with crab rangoon. That's where we live."
- Two-stage reveal on enter: line 1 clip-reveals upward 520ms, "We didn't." follows 160ms later. Nothing else moves.

**5 · The seasonal board.** `padding: 130px 0 120px`, grid `1.15fr .85fr`, gap 70px, `align-items: start`.
- Left: pistachio image 100% × 760px. A 266×332 crab-rangoon crop breaks out at `right:-58px; bottom:-56px` with the deep shadow.
- Right (`padding-top: 34px`): teal eyebrow "The seasonal board" → H2 62px "Seasonal flavors, / zero restraint." → two 16.5px paragraphs → stat rule at margin-top 44px (`border-top` 1px, `padding-top` 30px, gap 44px): "3 days / Per batch of dough" and "Thu – Sat / Then it's gone", figures 44px Newsreader, labels 10px/600/.16em → a 240×300 fig-ricotta crop at margin-top 52px with a 9.5px uppercase caption.
- Motion: the breakout crop drifts ~24px against the large image on scroll. No hover state.
- Mobile/tablet: recomposes — full-bleed crab rangoon image, then text, then the fig crop inline. The overlap is dropped, not scaled.

**6 · Hi, I'm Ally** (`id="story"`). `paper` background, `border-top: 1px solid rgba(23,19,15,.08)`, `padding: 130px 0`. Grid `520px 1fr`, gap 88px, centered. Portrait 520×650, `object-position: 50% 22%`, with a 1px `rgba(0,112,122,.55)` frame offset `left:18px; top:-18px` behind it. Right: teal eyebrow "Owner & baker" → H2 82px "Hi, I'm Ally." → three 17px paragraphs at `max-width: 52ch` → `wordmark-dark.png` 34px at 90% opacity as a sign-off. First person, verbatim copy in the prototype. Mobile: full-bleed portrait, then type; frame offset removed.

**7 · A little buzz** (press). `padding: 110px 0`. Header: H2 56px "A little buzz." + right-aligned 19px Newsreader italic `subtle` "Nice of them to notice." Rows: grid `1fr 2fr auto`, gap 40px, `padding: 30px 0`, 1px dividers; 30px Newsreader publication / 14.5px context / 10px uppercase teal "Press" tag. Hover indents the row 14px (260ms) — the only movement. Rows become links when URLs exist.
- **Open item:** CultureMap Tastemaker and Texas Monthly citations need exact titles, dates and URLs. The section renders a visible `faint` note until they're supplied. No borrowed logos, no star ratings, no fabricated badges.

**8 · Visit** (`id="visit"`). Grid `1fr 1fr`, `min-height: 760px`, full width, no gutter. Left: `case-counter.jpg` absolutely filling its half. Right: `teal-deep`, `padding: 118px 88px`, centered column — gold eyebrow "Visit" → H2 66px cream "Come look / in the case." → 16px `rgba(251,247,241,.76)` paragraph, `max-width: 38ch` → two-column block (gap 44px) of **Hours** (ruled rows, day left / `10 – 6` right in 16px Newsreader, closed days at 45% opacity and **stated, not omitted**) and **Find us** (address in 22px Newsreader, 1.42 line-height, plus the "Email & phone to be confirmed" placeholder) → CTA row at margin-top 56px: gold "Get Directions →" (Google Maps link) + secondary cream "Order Ahead ↗".
- Mobile: photo on top (~330px), teal panel below full width, CTAs stacked full-width.

**9 · Footer.** See Global — footer.

### Menu (`/menu`)

**Hero.** `padding: 88px 48px 76px`, grid `1fr 440px`, gap 72px, `align-items: end`. Left: bee eyebrow "The menu" → H1 112px "Everything / in the case." → 17px lead, `max-width: 50ch`: "The classics, the seasonal experiments, and whatever Ally couldn't stop thinking about this week." Right: `case-overhead.jpg` 440×540 + 9.5px uppercase caption "Thursday, 10:04 a.m." (a timestamp, not a caption — it says the case is a snapshot).

**Current favorites.** Header row (H2 44px + "Three that keep selling out") over a 1px rule, then grid `1.25fr .85fr 1fr`, gap 36px, `align-items: end`, image heights **520 / 404 / 600px** with labels below. Curated, editorially credited, rotates seasonally. Not a bestseller widget.

**Category bar.** `position: sticky; top: 78px; z-index: 40`, height 70px, `rgba(255,253,250,.95)` + 12px blur, 1px bottom hairline. Left: chips `All · Originals · Seasonal · Sweets` — 11px/600/.14em uppercase, `padding: 9px 16px`, radius 2px; active = teal fill / cream type, inactive = `rgba(23,19,15,.05)` / `body`; 220ms transitions. Right: live item count in 10.5px uppercase `subtle` + a compact teal "Pre-order ↗" button.
- Filtering happens in place with a 300ms fade; the photo panel resets to the first item of the new category. Group headings remain in **All**, so filtering is a convenience, not the only navigation. Chips are real buttons, keyboard-focusable, `aria-pressed`; **color is not the only active signal** — the count updates too.
- Mobile: chip row scrolls horizontally, swipeable, sticky beneath a 250px photo strip.

**List + photo panel.** Grid `1fr 500px`, gap 80px, `padding: 66px 48px 0`, `align-items: start`.
- Group header: teal 10.5px eyebrow (`Croissants — Originals`, `Croissants — Seasonal`, `Sweets`) + flexible 1px rule + item count in 15px Newsreader `subtle`. 60px between groups.
- Item row: `padding: 19px 0`, 1px bottom hairline. Baseline flex: 27px Newsreader name → optional `Seasonal` tag (8.5px/600/.16em uppercase teal, 1px `rgba(0,112,122,.35)` border, `padding: 3px 7px`, radius 2px, `translateY(-3px)`) → dotted leader (`border-bottom: 1px dotted rgba(23,19,15,.3)`, `translateY(-6px)`) → price 20px Newsreader `body`. Description 14px/1.6 `muted`, `max-width: 56ch`, margin-top 7px.
- Active/hover/focus row: `padding-left: 16px` + `background: rgba(0,112,122,.05)`, 300ms `cubic-bezier(.2,.7,.2,1)`.
- Panel: `position: sticky; top: 190px`, 500×640, radius 2px, `overflow: hidden`, `background: #F1EAE0`. **Two stacked `<img>` layers cross-fade opacity over 560ms `cubic-bezier(.3,.7,.2,1)`** as the active item changes, so images dissolve rather than blink. Preload the next likely image; `loading="eager"` for the first, lazy for the rest.
- **No-photo fallback** (about half the menu): a `#F6F0E7` layer with `bee-disc.png` at 34px/50%, the item name in 30px Newsreader, and "Photograph coming — it looks considerably better in person." in 10px uppercase `subtle`. This is intentional voice, not a bug.
- Below the panel: the active item's label + a right-aligned 9.5px `faint` hint "Hover or tap any item".
- Availability note closing the list: `background: rgba(0,112,122,.07)`, `border-left: 2px solid teal`, `padding: 26px 28px`, bee mark 22px + 22px Newsreader "The case changes often." + 14.5px body. Reading size, **not** fine print.
- Mobile: the panel becomes the sticky photo strip above the list; tapping a row updates it and expands the description. Name, price, description and seasonal status are all present with **no hover required**.

**Order CTA band.** `teal-deep`, `padding: 118px 48px`, space-between: H2 76px cream "Want it waiting / for you?" (with gold eyebrow "Ordering") and, right, a 16px paragraph + gold "Pre-order on Hotplate →" button. Hotplate is always an outbound link with an external mark. No cart, no checkout, no invented inventory.

### Global — footer

`teal-deep`, `padding: 96px 48px 40px`.
- Top row over a 1px `rgba(251,247,241,.18)` rule (`padding-bottom: 58px`): `wordmark-light.png` at 52px — the largest the script appears anywhere — and, right, 30px gold Newsreader italic "Get here before they're gone."
- Four columns `1.2fr 1fr 1fr 1fr`, gap 48px, `padding: 56px 0 64px`, each with a 9.5px/600/.18em gold-at-85% heading: **Find us** (address in 20px Newsreader + "Get directions" gold underlined link) · **Hours** (14px, line-height 2, closed days dimmed) · **Explore** (Menu, Our Story, Visit) · **Follow & order** (Instagram, Hotplate ↗).
- Baseline row over a 1px rule: `bee-glyph.png` 22px + "Sweet Bee Bakehouse — Pearland, Texas" in 10px uppercase `rgba(251,247,241,.5)`.
- No newsletter box, no social icon row, no "website by". Links go gold on hover only. Mobile stacks 2 columns then 1, address and hours first.

---

## Interactions & behavior

| # | Moment | Spec |
|---|---|---|
| 1 | Hero settle | Headline `translateY(18px)→0` + fade 900ms; video cross-fades 1200ms. Once, on load. |
| 2 | Menu photo cross-fade | Two stacked layers swap opacity, 560ms `cubic-bezier(.3,.7,.2,1)`. The most important interaction on the site. |
| 3 | Menu row indent | `padding-left: 0→16px` + 5% teal wash, 300ms. |
| 4 | Statement punchline | Clip-reveal line 1 (520ms), then "We didn't." after a 160ms delay. |
| 5 | Case rail drag | Momentum horizontal scroll; labels lift 2px under the cursor. The only horizontal movement on Home. |
| 6 | Page transition | Bee mark fades in centered on cream, ≤400ms. The only place the icon animates. |

Everything else is static. **Explicitly excluded:** scroll hijacking, parallax beyond the one seasonal crop, counters, marquees, spinning or scattered bees, custom cursors, entrance animation on body copy, bouncing, and any hover-only information.

Standard easing `cubic-bezier(.2,.7,.2,1)`; durations 220–560ms. Under `prefers-reduced-motion: reduce` every one of the six becomes an instant state change with zero information loss (the menu panel swaps `src` directly; reveals render in final position).

Hover/focus parity: every hover behavior has an identical `:focus-visible` behavior. Nothing — price, description, seasonal status, hours — exists only in a hover state.

## State management

Minimal; no server state.

- `activeCategory: 'All' | 'Originals' | 'Seasonal' | 'Sweets'` — set by chips. Optionally reflected as `?c=seasonal` for shareable filtered views.
- `activeItemId: string` — set by hover/focus (desktop) or tap (mobile); defaults to the first item with a photo in the current category.
- `panelSlot: 'A' | 'B'` + `imgA` / `imgB` — the two-layer cross-fade. Change the *inactive* layer's `src`, then flip which layer is opaque.
- `mobileNavOpen: boolean` — locks body scroll, traps focus.
- Content data: `menuItems[]` (`id`, `name`, `price`, `category`, `description`, `image | null`, `seasonal`), `inTheCaseToday: string[]`, `currentFavorites: id[]`, `press[]`, `hours[]`. Typed, in the repo, editable without touching layout. 26 items ship in the prototype's `ITEMS` array — copy it verbatim, including prices and descriptions.

## Assets

Supplied by the client (this bundle's `assets/` mirrors what the prototype uses). Filenames are the prototype's; map to whatever the production pipeline names them.

| File | Role | Notes |
|---|---|---|
| `bakery.mp4` | Hero video, desktop + mobile | Needs a 6–10s silent loop cut, H.264 + WebM, poster frame, ≤2.5MB target |
| `pistachio.jpg` | Seasonal-board hero image; case rail; menu panel | The strongest asset supplied |
| `crab-rangoon.jpg` | Breakout crop; case rail; favorites; menu panel | |
| `fig-ricotta.jpg` | Small captioned crop; case rail; menu panel | |
| `choc-croissants.jpg` | Case rail; menu panel (Chocolate); hero photo fallback | |
| `buckeye-buns.jpg` | Case rail; favorites; menu panel | |
| `macarons.jpg` | Case rail; menu panel | |
| `sandwiches.jpg` | Menu panel (Turkey Sandwich) | |
| `ally.jpg` | Story portrait | Crop 4:5, `object-position: 50% 22%` |
| `case-counter.jpg` | Visit panel | |
| `case-overhead.jpg` | Menu hero | |
| `wordmark-dark.png` | Header, story sign-off | Request SVG |
| `wordmark-light.png` | Footer | Request SVG |
| `bee-disc.png` | Eyebrows, menu note | Request SVG |
| `bee-glyph.png` | Statement, footer baseline, favicon | Request SVG |

Treatment: **no filters, no grain, no color overlays, no darkening food to fit text.** Preserve lamination, glaze and natural color. Type sits beside or below photography; the only exception is the mobile hero's bottom-anchored gradient. Ratios deliberately vary (3:4, 1:1, 4:5, full-bleed) — do not normalize them.

Production: AVIF/WebP with JPEG fallback, `srcset` at 1×/2×, explicit `width`/`height` to prevent CLS, `loading="lazy"` below the fold, meaningful `alt` on every food image (the pastry and its treatment, e.g. "Bi-color pistachio croissants on a sheet tray").

**Missing — shot list for the client:** process/lamination sequence, storefront exterior, vertical 9:16 stills for the mobile hero fallback, and photographs for the eight unshot menu items (Traditional Butter, Almond Raspberry, Guava Cream Cheese, Ham & Cheese, Cinnamon Roll, Banoffee, Pepperoni Hot Honey, Raspberry Pain Suisse) plus most of the Sweets. The no-photo fallback means the site can launch before these exist.

## Responsive strategy

Three rules govern every breakpoint: **overlaps are dropped, not scaled**; **side-by-side panels become sequential full-bleed blocks**; **display type drops a step rather than reflowing to five lines.**

- **1440–1920** — content capped at 1440 and centered; full-bleed panels and rails still run edge to edge, so extra width becomes cream margin. Display type at full scale.
- **1024–1440** — the reference design. Gutters 48→36px, hero H1 90→72px, hero video 470→400px wide, menu panel 500→420px. Overlaps intact.
- **768–1024** — hero goes vertical (type above, 16:9 video below). The menu's photo panel becomes a sticky band above the list — the mobile pattern arrives early because two columns stop working before 1024. Seasonal spread loses the breakout crop: image / text / image.
- **375–430** — designed, not derived; most traffic arrives from Instagram. Full-bleed vertical video with the headline over its lower third, stacked full-width CTAs, snap-scrolling case rail, full-bleed teal statement at 50px, menu as photo strip + chips + compact list, Visit stacked photo-over-teal. Body ≥14.5px, tap targets ≥44px.

## Accessibility

Semantic landmarks and one `h1` per page; heading order preserved. AA contrast throughout (values above). Every hover has a focus equivalent; focus rings are gold, 2px, 2px offset, visible on both cream and teal. Chips are `<button>` with `aria-pressed`; the menu list is a real list. Closed days are stated. Mobile nav traps focus and closes on `Esc`. Video is decorative: `muted`, `playsinline`, no autoplay audio, and a pause affordance if it runs longer than 5s. `prefers-reduced-motion` fully honored. Skip-to-content link. Alt text on all photography; empty `alt` on the decorative bee marks.

## Performance & SEO

Static generation; no client JS beyond the menu interaction, the rail, and the mobile nav. Self-hosted fonts, subset, `swap`. Hero video lazy-attached after LCP with the poster as the LCP element. LCP <2.0s on 4G mobile, CLS <0.05, Lighthouse ≥95 performance and accessibility.
`LocalBusiness`/`Bakery` JSON-LD with address, `openingHoursSpecification` (Thu/Fri 10–18, Sat 10–16), `hasMenu` pointing at `/menu`, `sameAs` Instagram, and `Menu`/`MenuSection`/`MenuItem` structured data. Per-page title/description, OG images from the pistachio and case photography. `sweetbeebakehouse.com` canonical; 301 every existing WordPress URL.

## Acceptance criteria

1. Home and Menu match the reference at 1440 and 390 within a few pixels on type scale, spacing rhythm and color.
2. Menu list is fully usable with keyboard only and with hover disabled; every item's name, price, description and seasonal status is visible without interaction.
3. The photo panel cross-fades — never flashes white — and items without photography show the paper fallback with its copy.
4. `prefers-reduced-motion: reduce` removes all six motion moments with no loss of content.
5. The "in the case today" list, menu items, current favorites and press entries are editable in one data location each, with no layout edits required.
6. No invented content: no prices beyond the supplied 26 items, no email/phone, no press citation text, no cake ordering, no cart.
7. Lighthouse ≥95 performance and accessibility on mobile; LCP <2.0s.
8. Order Online / Pre-order / Order Ahead all point to `https://www.hotplate.com/sweetbeebakehouse` and open in a new tab with an external-link affordance.

## Open questions for the client

- Press: exact CultureMap and Texas Monthly citation titles, dates and URLs.
- Public email and phone (currently placeholdered on Visit and in the footer).
- Whether cake ordering returns later as a separate page (removed from this scope at the client's request).
- Confirmation that Thu–Sat hours are current, and how seasonal/daily availability should be updated in practice.

## Files in this bundle

| File | What it is |
|---|---|
| `Sweet Bee Bakehouse.dc.html` | **High-fidelity design reference** — Home, Menu, and a mobile-screens view. Open in a browser. Uses `support.js`; not production code. |
| `Sweet Bee Design Blueprint.dc.html` | The creative direction document: concept, design system, section-by-section blueprints, motion storyboard, asset plan, copy direction, responsive strategy. |
| `support.js`, `doc-page.js` | Runtime needed only to view the two files above. **Do not port.** |
| `assets/` | Photography, video and brand marks used by the prototype. |

To see the mobile compositions in the prototype, use the Desktop / Mobile switch at the bottom-left of the page.
