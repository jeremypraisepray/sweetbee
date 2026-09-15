'use client';

import { useEffect, useRef, useState } from 'react';
import { Photo } from './Photo';

/**
 * Full-bleed silent loop behind the wordmark.
 *
 * The poster is a real <picture> rather than the video's `poster` attribute, so
 * the first paint is an AVIF the browser already knows how to pick, and there
 * is only ever one poster download. The video attaches once the hero is in view
 * and the browser is idle, and is skipped altogether under reduced motion, Save
 * Data, or a slow connection — those visitors keep the still and lose nothing.
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [attached, setAttached] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$|^3g$/.test(conn.effectiveType)) return;

    const el = ref.current;
    if (!el) return;

    const ric =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback.bind(window)
        : null;
    let idle = 0;
    const schedule = () => {
      const run = () => setAttached(true);
      idle = ric ? ric(run, { timeout: 4000 }) : window.setTimeout(run, 1500);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (document.readyState === 'complete') schedule();
      else window.addEventListener('load', schedule, { once: true });
    });
    io.observe(el);

    return () => {
      io.disconnect();
      if (ric) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={ref} className={`group/video absolute inset-0 overflow-hidden bg-ink ${className ?? ''}`}>
      <Photo
        name="choc-croissants"
        alt="Bi-color chocolate croissants on a sheet tray."
        sizes="100vw"
        width={1280}
        height={1707}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
      >
        {attached ? <source src="/video/bakery.mp4" type="video/mp4" /> : null}
      </video>

      {attached ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-4 right-[var(--gutter)] z-10 border-b border-transparent pb-1 text-[10px] font-semibold uppercase tracking-[.16em] text-canvas opacity-0 transition-opacity duration-200 hover:border-gold hover:opacity-100 focus-visible:opacity-100 group-hover/video:opacity-100"
        >
          {playing ? 'Pause' : 'Play'}
          <span className="sr-only"> background video</span>
        </button>
      ) : null}
    </div>
  );
}
