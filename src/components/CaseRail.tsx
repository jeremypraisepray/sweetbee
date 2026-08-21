'use client';

import { useEffect, useRef } from 'react';

/**
 * Drag-to-scroll with momentum on top of native overflow, so trackpad, wheel,
 * touch and keyboard all keep working. Pointer drag is an addition, never the
 * only way to reach an item.
 */
export function CaseRail({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let raf = 0;

    const glide = () => {
      velocity *= 0.94;
      el.scrollLeft -= velocity * 16;
      if (Math.abs(velocity) > 0.02) raf = requestAnimationFrame(glide);
    };

    const onDown = (e: PointerEvent) => {
      // Let links and buttons inside the rail behave normally.
      if ((e.target as HTMLElement).closest('a, button')) return;
      down = true;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastT = e.timeStamp;
      velocity = 0;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) el.classList.add('rail-dragging');
      el.scrollLeft = startScroll - dx;
      const dt = e.timeStamp - lastT;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };

    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove('rail-dragging');
      if (Math.abs(velocity) > 0.05) raf = requestAnimationFrame(glide);
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div ref={ref} className={`rail ${className ?? ''}`} tabIndex={0} role="group" aria-label="A few things from the case, scroll sideways">
      {children}
    </div>
  );
}
