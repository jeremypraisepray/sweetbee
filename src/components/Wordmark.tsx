/** The script wordmark. Image only — never set as live text. */
export function Wordmark({
  variant,
  height,
  width,
  className,
  style,
  alt = '',
  priority,
}: {
  variant: 'dark' | 'light';
  /** Height in px. Pass `width` instead for the mobile hero, which is width-led. */
  height?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  priority?: boolean;
}) {
  // Native aspect of the trimmed marks, so the box is reserved before load.
  const ratio = variant === 'dark' ? 1292 / 189 : 1363 / 199;
  const w = width ?? Math.round((height ?? 30) * ratio);
  const h = height ?? Math.round((width ?? 300) / ratio);
  // With neither dimension given the caller sizes it in CSS (the hero mark is
  // fluid); the width/height attributes still reserve the box against CLS.
  const sizing = height
    ? { height, width: 'auto' as const }
    : width
      ? { width, height: 'auto' as const }
      : {};
  return (
    <img
      src={`/assets/wordmark-${variant}.png`}
      alt={alt}
      width={w}
      height={h}
      className={className}
      style={{ ...sizing, ...style }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
