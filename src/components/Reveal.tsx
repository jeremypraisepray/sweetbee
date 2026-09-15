'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The site's only motion: each section fades up 16px once, when it first comes
 * into view. Reduced motion is handled in CSS, which pins `.reveal` to its
 * final state, so nothing here is animation-gated.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'section',
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'footer';
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(true);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} id={id} style={style} className={`reveal ${shown ? 'reveal-in' : ''} ${className ?? ''}`}>
      {children}
    </Component>
  );
}
