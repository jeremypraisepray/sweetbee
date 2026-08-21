import { site } from '@/data/site';

/**
 * The signature object: a paper price card, slightly rotated, always
 * overlapping the photograph it names. Rotation is allowed nowhere else.
 */
const TILTS = [-1.4, -0.9, 0.6, 1.1, -0.6, 1.4, -1.1, 0.9];

export function CaseLabel({
  category,
  name,
  price,
  index = 0,
  seasonal = true,
  className,
  style,
}: {
  category: string;
  name: string;
  price?: string;
  /** Picks a tilt from the fixed set so the angles don't look mechanical. */
  index?: number;
  seasonal?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`case-label ${className ?? ''}`}
      style={{ ...style, ['--tilt' as string]: `${TILTS[index % TILTS.length]}deg` }}
    >
      <div className={`case-label__cat ${seasonal ? 'text-teal' : 'text-subtle'}`}>{category}</div>
      <div className="case-label__rule" />
      <div className="flex items-baseline gap-3 font-display text-[19px] leading-none text-body">
        <span>{name}</span>
        {price ? <span className="text-[17px] text-subtle">{price}</span> : null}
      </div>
    </div>
  );
}

/** Outbound links to Hotplate always carry the external mark and rel guards. */
export function OrderLink({
  children,
  className,
  label,
}: {
  children?: React.ReactNode;
  className: string;
  label?: string;
}) {
  return (
    <a
      href={site.hotplate}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
