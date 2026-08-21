/* eslint-disable @next/next/no-img-element */

/** The script wordmark. Image only — it is never set as live text. */
export function Wordmark({ variant, height, className, alt = '', lazy }: {
  variant: 'dark' | 'light';
  height: number;
  className?: string;
  alt?: string;
  /** Below the fold: keeps the mark out of the head as a competing preload. */
  lazy?: boolean;
}) {
  // Native aspect of the trimmed marks, so width is reserved before load.
  const ratio = variant === 'dark' ? 1292 / 189 : 1363 / 199;
  return (
    <img
      src={`/assets/wordmark-${variant}.png`}
      alt={alt}
      width={Math.round(height * ratio)}
      height={height}
      style={{ height, width: 'auto' }}
      className={className}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
    />
  );
}

/** The bee. `disc` is the ink lockup for cream; `glyph` is the bee alone for teal. */
export function Bee({ variant = 'disc', size, className, lazy }: {
  variant?: 'disc' | 'glyph';
  size: number;
  className?: string;
  lazy?: boolean;
}) {
  return (
    <img
      src={`/assets/bee-${variant}.png`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={className}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
    />
  );
}
