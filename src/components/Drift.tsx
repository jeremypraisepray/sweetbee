'use client';

import { useEffect, useRef } from 'react';

/**
 * The single parallax on the site: the breakout crop drifts ~24px against the
 * large seasonal image. Skipped entirely under reduced motion and below the
 * breakpoint where the overlap exists at all.
 */
export function Drift({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 1023px)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // -1 to 1 across the viewport, so the crop is centred when the section is.
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty('--drift', `${Math.max(-1, Math.min(1, progress)) * 24}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ ...style, translate: '0 var(--drift, 0px)' }}>
      {children}
    </div>
  );
}
