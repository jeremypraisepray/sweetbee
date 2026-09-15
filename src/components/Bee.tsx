/**
 * The spine motif: a bee beside every section label.
 *
 * The supplied glyph is white on transparent, so on the dark ground it ships
 * as-is. On the light ground it has to be teal — done with a CSS mask rather
 * than a filter, because `invert` on a white glyph gives black, not teal.
 */
export function Bee({ on, size }: { on: 'light' | 'dark'; size?: number }) {
  if (on === 'dark') {
    return (
      <img
        src="/assets/bee-glyph.png"
        alt=""
        aria-hidden="true"
        width={size ?? 14}
        height={size ?? 14}
        style={{ height: size ?? 14, width: 'auto' }}
        decoding="async"
      />
    );
  }
  const px = size ?? 15;
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: px,
        height: px,
        flex: 'none',
        background: '#00707A',
        WebkitMask: 'url(/assets/bee-glyph.png) center / contain no-repeat',
        mask: 'url(/assets/bee-glyph.png) center / contain no-repeat',
      }}
    />
  );
}

/** Section label — bee plus caps text. Teal on canvas, gold on ink. */
export function SectionLabel({
  on,
  children,
  className,
  as: Tag = 'div',
}: {
  on: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'h2';
}) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={`label ${on === 'dark' ? 'text-gold' : 'text-teal'} ${className ?? ''}`}>
      <Bee on={on} size={on === 'dark' ? 14 : 15} />
      {children}
    </Component>
  );
}
