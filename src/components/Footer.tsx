import Link from 'next/link';
import { Wordmark, Bee } from './Mark';
import { site, hours, addressLine, cityLine } from '@/data/site';

const HEADING = 'text-[9.5px] font-semibold uppercase tracking-[.18em]';

export function Footer() {
  return (
    <footer className="on-teal bg-teal-deep px-[var(--gutter)] pb-10 pt-24 text-cream">
      <div className="mx-auto max-w-measure">
        <div
          className="flex flex-col gap-8 pb-[58px] md:flex-row md:items-end md:justify-between"
          style={{ borderBottom: '1px solid rgba(251,247,241,.18)' }}
        >
          {/* The largest the script appears anywhere on the site. */}
          <Wordmark variant="light" height={52} alt={site.name} lazy />
          <p className="font-display text-[30px] italic leading-none text-gold md:text-right">
            Get here before they&rsquo;re gone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <h2 className={HEADING} style={{ color: 'rgba(244,224,123,.85)' }}>Find us</h2>
            <address className="mt-5 font-display text-[20px] not-italic leading-[1.42] text-cream">
              {addressLine}
              <br />
              {cityLine}
            </address>
            <a
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[14px] text-gold underline underline-offset-4 transition-colors hover:text-gold-warm"
            >
              Get directions ↗
            </a>
          </div>

          <div>
            <h2 className={HEADING} style={{ color: 'rgba(244,224,123,.85)' }}>Hours</h2>
            <dl className="mt-5 text-[14px] leading-[2]">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between gap-4"
                  style={{ color: h.closed ? 'rgba(251,247,241,.66)' : 'rgba(251,247,241,.82)' }}
                >
                  <dt>{h.day}</dt>
                  <dd>{h.open}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className={HEADING} style={{ color: 'rgba(244,224,123,.85)' }}>Explore</h2>
            <ul className="mt-5 space-y-2 text-[14px]">
              {[
                { label: 'Menu', href: '/menu' },
                { label: 'Our Story', href: '/#story' },
                { label: 'Visit', href: '/#visit' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold" style={{ color: 'rgba(251,247,241,.82)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={HEADING} style={{ color: 'rgba(244,224,123,.85)' }}>Follow &amp; order</h2>
            <ul className="mt-5 space-y-2 text-[14px]">
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer"
                   className="transition-colors hover:text-gold" style={{ color: 'rgba(251,247,241,.82)' }}>
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={site.hotplate} target="_blank" rel="noopener noreferrer"
                   className="transition-colors hover:text-gold" style={{ color: 'rgba(251,247,241,.82)' }}>
                  Hotplate ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-8" style={{ borderTop: '1px solid rgba(251,247,241,.18)' }}>
          <Bee variant="glyph" size={22} lazy />
          <p className="text-[10px] font-semibold uppercase tracking-[.16em]" style={{ color: 'rgba(251,247,241,.66)' }}>
            {site.name} — Pearland, Texas
          </p>
        </div>
      </div>
    </footer>
  );
}
