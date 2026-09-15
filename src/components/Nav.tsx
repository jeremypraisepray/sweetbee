'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Wordmark } from './Wordmark';
import { site, hoursLineShort, addressLine, cityLine } from '@/data/site';

const LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Story', href: '/#story' },
  { label: 'Visit', href: '/#visit' },
];

/**
 * Two placements, one component.
 *
 * `hero` sits absolutely over the Home video — no ground of its own, links on
 * the left, order on the right. `dark` is the Menu page's own bar, with the
 * wordmark centred between the two link groups. Both open the same overlay on
 * a phone.
 */
export function Nav({ placement, current }: { placement: 'hero' | 'dark'; current?: string }) {
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !sheet.current) return;
      const focusable = sheet.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    sheet.current?.querySelector<HTMLElement>('a[href]')?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkTone = (href: string) =>
    placement === 'dark' && current !== href ? 'text-[rgba(250,248,242,.7)]' : 'text-canvas';

  return (
    <>
      <nav
        aria-label="Primary"
        className={
          placement === 'hero'
            ? 'absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-6 px-[var(--gutter)] py-[22px] lg:py-[34px]'
            : 'flex items-center justify-between gap-6 px-[var(--gutter)] py-[22px] lg:py-[34px]'
        }
      >
        {/* Desktop: link group. Mobile: the two-line mark that opens the sheet. */}
        <div className="hidden lg:flex lg:gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current === l.href ? 'page' : undefined}
              className={`nav-link hover:border-gold ${linkTone(l.href)} ${
                current === l.href ? 'border-gold' : ''
              } hover:text-canvas`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          ref={toggle}
          type="button"
          className="flex w-[22px] flex-col gap-[5px] py-2 lg:hidden"
          aria-expanded={open}
          aria-controls={open ? 'site-nav-sheet' : undefined}
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden="true" className="block h-px w-full bg-canvas" />
          <span aria-hidden="true" className="block h-px w-full bg-canvas" />
        </button>

        {/* The Menu page carries the wordmark in the bar; the hero has its own. */}
        {placement === 'dark' ? (
          <Link href="/" aria-label={`${site.name} — home`} className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Wordmark variant="light" height={24} className="lg:hidden" alt={site.name} priority />
            <Wordmark variant="light" height={34} className="hidden lg:block" alt={site.name} priority />
          </Link>
        ) : (
          <span className="lg:hidden" aria-hidden="true" />
        )}

        <a
          href={site.hotplate}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link border-gold text-canvas transition-colors hover:text-gold"
        >
          <span className="lg:hidden">Order ↗</span>
          <span className="hidden lg:inline">Order ahead ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>

      {/* Mobile overlay — ink ground, italic links, no motion beyond the fade. */}
      {open ? (
      <div
        id="site-nav-sheet"
        ref={sheet}
        className="fixed inset-0 z-50 flex flex-col bg-ink px-[var(--gutter)] pb-10 pt-[22px] text-canvas lg:hidden"
        style={{ animation: 'fadeIn 200ms ease both' }}
      >
        <div className="flex items-center justify-between">
          <Wordmark variant="light" height={24} alt={site.name} />
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-[22px] leading-none"
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
          >
            <span className="sr-only">Close menu</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="statement text-[40px] leading-none text-canvas"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.hotplate}
            target="_blank"
            rel="noopener noreferrer"
            className="rule-link mt-4 self-start border-gold text-canvas"
          >
            Order ahead ↗
          </a>
        </div>

        <div className="text-[11px] uppercase leading-[2] tracking-[.16em] text-dark-cap">
          <p>{hoursLineShort}</p>
          <p>
            {addressLine} · {cityLine}
          </p>
        </div>
      </div>
      ) : null}
    </>
  );
}
