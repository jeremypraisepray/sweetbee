'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Adds `activeClass` once the element has been on screen. One-shot: nothing
 * re-animates on the way back up, and reduced-motion users get the final
 * state immediately because the CSS zeroes the transition.
 */
export function Reveal({
  children,
  activeClass,
  className,
  delay = 0,
  as: Tag = 'div',
  style,
}: {
  children: React.ReactNode;
  activeClass: string;
  className?: string;
  delay?: number;
  as?: 'div' | 'span' | 'p';
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (delay) window.setTimeout(() => setOn(true), delay);
        else setOn(true);
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={`${className ?? ''} ${on ? activeClass : ''}`} style={style}>
      {children}
    </Component>
  );
}
