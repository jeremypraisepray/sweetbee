import manifest from '@/lib/image-manifest.json';

type Entry = { widths: number[]; ratio: number; width: number; height: number };
// The manifest also holds the brand marks, which carry no width ladder.
const photos = manifest as unknown as Record<string, Entry | undefined>;

type Props = {
  /** Base name in /public/assets, e.g. "pistachio". */
  name: string;
  alt: string;
  /** The `sizes` attribute — what CSS width this slot actually paints at. */
  sizes: string;
  className?: string;
  /** Rendered box, used for the intrinsic width/height that prevents CLS. */
  width: number;
  height: number;
  priority?: boolean;
  style?: React.CSSProperties;
};

/**
 * Pre-derived AVIF/WebP/JPEG from scripts/build-assets.mjs. No runtime
 * optimizer, so the whole site stays static and the browser picks the format.
 */
export function Photo({ name, alt, sizes, className, width, height, priority, style }: Props) {
  const entry = photos[name];
  if (!entry?.widths) throw new Error(`Photo "${name}" is not in the image manifest — run npm run assets.`);
  const set = (ext: string) =>
    entry.widths.map((w) => `/assets/${name}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/assets/${name}-${entry.widths[entry.widths.length - 1]}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}

/** Every URL for one photo, for preloading the menu panel's next image. */
export function photoSources(name: string) {
  const entry = photos[name];
  if (!entry?.widths) return null;
  return {
    avif: entry.widths.map((w) => `/assets/${name}-${w}.avif ${w}w`).join(', '),
    webp: entry.widths.map((w) => `/assets/${name}-${w}.webp ${w}w`).join(', '),
    jpg: entry.widths.map((w) => `/assets/${name}-${w}.jpg ${w}w`).join(', '),
    fallback: `/assets/${name}-${entry.widths[entry.widths.length - 1]}.jpg`,
  };
}
