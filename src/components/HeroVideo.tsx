'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Decorative silent loop over a still poster.
 *
 * The poster is a real <picture> (AVIF/WebP/JPEG) rather than the video's own
 * `poster` attribute, so the LCP paint is a 38KB AVIF instead of an 89KB JPEG
 * and there is only ever one poster download. The video's sources are attached
 * later still — once the hero is on screen and the browser is idle — so the
 * loop never competes with that first paint. A pause control is offered because
 * the loop runs longer than five seconds.
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [attached, setAttached] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // Poster only.

    // Two thirds of a megabyte of decoration is not worth spending on a metered
    // or slow connection — those visitors keep the poster and lose nothing.
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$|^3g$/.test(conn.effectiveType)) return;

    const el = ref.current;
    if (!el) return;

    // requestIdleCallback where it exists, a short timeout everywhere else.
    const ric =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback.bind(window)
        : null;
    let idle = 0;
    const schedule = () => {
      const run = () => setAttached(true);
      idle = ric ? ric(run, { timeout: 4000 }) : window.setTimeout(run, 1500);
    };

    // Off screen means the loop is never worth fetching.
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
    <div ref={ref} className={`group/video relative overflow-hidden bg-[#F1EAE0] ${className ?? ''}`}>
      <picture>
        <source type="image/avif" srcSet="/video/bakery-poster.avif" />
        <source type="image/webp" srcSet="/video/bakery-poster.webp" />
        <img
          src="/video/bakery-poster.jpg"
          alt="The pastry case at Sweet Bee Bakehouse: croissants and pastries on white trays along a wood counter."
          width={720}
          height={1280}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: loaded ? 1 : 0 }}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => setLoaded(true)}
      >
        {attached ? <source src="/video/bakery.mp4" type="video/mp4" /> : null}
      </video>

      {attached ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3 rounded-[2px] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-[.14em] text-cream opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 group-hover/video:opacity-100"
          style={{ background: 'rgba(23,19,15,.55)' }}
        >
          {playing ? 'Pause' : 'Play'}
          <span className="sr-only"> background video</span>
        </button>
      ) : null}
    </div>
  );
}
