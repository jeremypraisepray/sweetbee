/**
 * Derives every production asset from assets-source/.
 * Photography -> AVIF + WebP + JPEG at 1x/2x for the widths each slot needs.
 * Brand marks -> trimmed, background keyed out to transparency.
 * Run with `npm run assets`. Output is committed, so the site builds without sharp.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = 'assets-source';
const OUT = 'public/assets';

// Slot widths come from the layout: the largest CSS width each photo is ever
// painted at, doubled for 2x. Anything wider is wasted bytes.
// One ladder for every photo; `sizes` at each call site picks from it. Capped
// at the source width by the loop below, so nothing is ever upscaled.
const LADDER = [320, 480, 640, 800, 1000, 1280];

const PHOTOS = [
  { src: 'IMG_2603.jpeg', name: 'pistachio',       widths: [...LADDER, 1520] },
  { src: 'IMG_2604.jpeg', name: 'crab-rangoon',    widths: LADDER },
  { src: 'IMG_2569.jpeg', name: 'fig-ricotta',     widths: LADDER },
  { src: 'IMG_1658.jpeg', name: 'choc-croissants', widths: LADDER },
  { src: 'IMG_2553.jpeg', name: 'buckeye-buns',    widths: LADDER },
  { src: 'IMG_2548.jpeg', name: 'macarons',        widths: LADDER },
  { src: 'IMG_2497.jpeg', name: 'sandwiches',      widths: LADDER },
  { src: 'IMG_9502-817x1024 (1).jpg', name: 'ally', widths: [320, 480, 640, 817] },
  { src: 'IMG_2207.jpeg', name: 'case-counter',    widths: [...LADDER, 1520] },
  { src: 'IMG_2415.jpeg', name: 'case-overhead',   widths: LADDER },
];

await mkdir(OUT, { recursive: true });

const manifest = {};

for (const p of PHOTOS) {
  const input = sharp(`${SRC}/${p.src}`).rotate();
  const meta = await input.metadata();
  const ratio = meta.height / meta.width;
  const widths = [...new Set(p.widths)].filter((w) => w <= meta.width).sort((a, b) => a - b);
  for (const w of widths) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 38, effort: 4 }).toFile(`${OUT}/${p.name}-${w}.avif`);
    await base.clone().webp({ quality: 68 }).toFile(`${OUT}/${p.name}-${w}.webp`);
    await base.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(`${OUT}/${p.name}-${w}.jpg`);
  }
  manifest[p.name] = { widths, ratio: Number(ratio.toFixed(4)), width: meta.width, height: meta.height };
  console.log(`photo  ${p.name.padEnd(16)} ${meta.width}x${meta.height} -> ${widths.join(', ')}`);
}

/**
 * The wordmark files ship as opaque squares with the script centred in a sea of
 * background. Key the background out by luminance, trim to the ink, and emit a
 * transparent PNG so the mark can sit on cream or teal.
 * `light` inverts the test: keep the bright strokes, drop the black field.
 */
async function keyOut(file, name, { light = false, height = 240 } = {}) {
  const img = sharp(`${SRC}/${file}`).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8Array(data);
  for (let i = 0; i < px.length; i += info.channels) {
    const lum = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
    // Alpha tracks how far the pixel is from the background, so antialiased
    // stroke edges stay soft instead of turning into stair-steps.
    const alpha = light ? lum : 1 - lum;
    px[i] = light ? 255 : 0;
    px[i + 1] = px[i];
    px[i + 2] = px[i];
    px[i + 3] = Math.round(Math.min(1, Math.max(0, (alpha - 0.06) / 0.88)) * 255);
  }
  const out = `${OUT}/${name}.png`;
  await sharp(px, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .trim({ threshold: 1 })
    .resize({ height, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const m = await sharp(out).metadata();
  manifest[name] = { width: m.width, height: m.height };
  console.log(`mark   ${name.padEnd(16)} -> ${m.width}x${m.height}`);
}

await keyOut('BEE ONLY - 2.png', 'wordmark-dark', { light: false, height: 220 });
await keyOut('BEE ONLY.png', 'wordmark-light', { light: true, height: 220 });

/**
 * bee-disc is the supplied lockup (white bee, ink disc) with its white page
 * background removed. bee-glyph is the same bee lifted off the disc so it can
 * sit on teal — the disc is masked to a circle first, then the ink field is
 * dropped and the bee kept.
 */
async function beeMarks() {
  const src = sharp(`${SRC}/IMG_2108.jpeg`).ensureAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Find the ink disc: the bounding box of everything darker than mid grey.
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
      if (lum < 0.5) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const r = Math.min(w, h) / 2;

  const disc = new Uint8Array(w * h * 4);
  const glyph = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = ((y + y0) * width + (x + x0)) * channels;
      const di = (y * w + x) * 4;
      const lum = (data[si] * 0.299 + data[si + 1] * 0.587 + data[si + 2] * 0.114) / 255;
      // Distance from the disc centre, feathered over one pixel at the rim.
      const d = Math.hypot(x - (cx - x0), y - (cy - y0));
      const inside = Math.min(1, Math.max(0, (r - d + 1) / 2));

      // Disc: keep the supplied artwork, drop the page around it.
      disc[di] = data[si]; disc[di + 1] = data[si + 1]; disc[di + 2] = data[si + 2];
      disc[di + 3] = Math.round(inside * 255);

      // Glyph: white bee only. Inside the disc the bee is the bright pixels.
      glyph[di] = 255; glyph[di + 1] = 255; glyph[di + 2] = 255;
      glyph[di + 3] = Math.round(inside * Math.min(1, Math.max(0, (lum - 0.35) / 0.5)) * 255);
    }
  }

  for (const [name, buf, size] of [['bee-disc', disc, 128], ['bee-glyph', glyph, 128]]) {
    const out = `${OUT}/${name}.png`;
    await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
      .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
    manifest[name] = { width: size, height: size };
    console.log(`mark   ${name.padEnd(16)} -> ${size}x${size}`);
  }

  // Favicon + apple touch icon from the disc, at true source resolution.
  await sharp(disc, { raw: { width: w, height: h, channels: 4 } })
    .resize(180, 180, { fit: 'contain', background: { r: 251, g: 247, b: 241, alpha: 1 } })
    .flatten({ background: '#FBF7F1' })
    .png()
    .toFile('public/apple-touch-icon.png');
  await sharp(disc, { raw: { width: w, height: h, channels: 4 } })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/icon.png');
  console.log('mark   favicons        -> icon.png, apple-touch-icon.png');
}
await beeMarks();

/**
 * The social card. Link previews are 1.91:1, so pointing them at a 3:4
 * photograph crops the subject out — and for this bakery most inbound traffic
 * is a link pasted into Instagram. Composed here: a landscape crop of the
 * croissant tray, darkened from the bottom, with the wordmark sitting on it.
 */
async function socialCard() {
  const W = 1200;
  const H = 630;

  const photo = await sharp(`${SRC}/IMG_1658.jpeg`)
    .rotate()
    .resize({ width: W, height: H, fit: 'cover', position: 'attention' })
    .toBuffer();

  // A bottom-weighted scrim so the mark reads without flattening the pastry.
  const scrim = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stop-color="#1D1C19" stop-opacity="0.20"/>
           <stop offset="45%" stop-color="#1D1C19" stop-opacity="0.34"/>
           <stop offset="100%" stop-color="#1D1C19" stop-opacity="0.72"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
     </svg>`
  );

  const markW = 620;
  const mark = await sharp(`${OUT}/wordmark-light.png`)
    .resize({ width: markW, withoutEnlargement: false })
    .toBuffer();
  const markMeta = await sharp(mark).metadata();

  await sharp(photo)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: mark, top: Math.round((H - markMeta.height) / 2), left: Math.round((W - markW) / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile('public/og.jpg');

  const m = await sharp('public/og.jpg').metadata();
  console.log(`card   og.jpg           -> ${m.width}x${m.height}`);
}
await socialCard();

await writeFile('src/lib/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('\nwrote src/lib/image-manifest.json');
