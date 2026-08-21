'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Wordmark } from './Mark';
import { OrderLink } from './CaseLabel';
import { site } from '@/data/site';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Visit', href: '/#visit' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The hairline appears past 8px. The bar never shrinks, hides, or reacts to
  // scroll direction — it is furniture, not an effect.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Mobile sheet: lock the page, trap the tab ring, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
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
    sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : href === '/menu' ? pathname === '/menu' : false;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[90] h-[78px] backdrop-blur-[14px]"
        style={{
          background: 'rgba(251,247,241,.92)',
          borderBottom: scrolled ? '1px solid rgba(23,19,15,.10)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-full max-w-measure items-center justify-between px-[var(--gutter)]">
          <Link href="/" aria-label={`${site.name} — home`} className="flex items-center">
            <Wordmark variant="dark" height={30} className="hidden sm:block" alt={site.name} />
            <Wordmark variant="dark" height={19} className="sm:hidden" alt={site.name} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isCurrent(n.href) ? 'page' : undefined}
                className="nav-type border-b-[1.5px] py-1.5 text-ink transition-colors duration-200 hover:border-gold"
                style={{ borderColor: isCurrent(n.href) ? '#F4E07B' : 'transparent' }}
              >
                {n.label}
              </Link>
            ))}
            <span aria-hidden="true" className="h-5 w-px" style={{ background: 'rgba(23,19,15,.14)' }} />
            <OrderLink className="btn btn-primary min-h-0 px-5 py-[13px] text-[11px]">
              Order Online
            </OrderLink>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 flex-col items-end justify-center gap-[5px] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="block h-[1.5px] w-5 bg-ink" />
            <span aria-hidden="true" className="block h-[1.5px] w-5 bg-ink" />
          </button>
        </div>
      </header>

      {/* Full-height cream sheet. Cross-fades in; the list rises 12px behind it. */}
      <div
        id="mobile-nav"
        ref={sheetRef}
        hidden={!open}
        className="fixed inset-0 z-[95] bg-cream lg:hidden"
        style={{ animation: open ? 'sheetIn 260ms ease both' : undefined }}
      >
        <div className="flex h-[78px] items-center justify-between px-[var(--gutter)]">
          <Wordmark variant="dark" height={19} alt={site.name} />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-[22px] leading-none text-ink"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <span className="sr-only">Close menu</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="flex flex-col px-[var(--gutter)] pt-6">
          <nav aria-label="Primary (mobile)" className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-2 font-display text-[32px] leading-tight text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="my-8 h-px w-full bg-gold" />
          <OrderLink className="btn btn-primary w-full justify-center">Order Online</OrderLink>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-type mt-7 text-subtle"
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </>
  );
}
