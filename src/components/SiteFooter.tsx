import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { Bee } from './Bee';
import { site, hours, addressLine, cityLine } from '@/data/site';

const HEADING = 'text-[10px] font-semibold uppercase tracking-[.2em] text-dark-head lg:text-[10.5px]';

/**
 * One dark footer, shared. On Home it arrives on its own ink ground and bridges
 * into the Menu page; on Menu it opens with a rule instead, because the page is
 * already dark.
 */
export function SiteFooter({ variant }: { variant: 'home' | 'menu' }) {
  const onMenu = variant === 'menu';

  return (
    <footer className="bg-ink text-canvas">
      <div className="shell gutter">
        <div
          className={
            onMenu
              ? 'border-t border-rule-dark-mid pb-11 pt-[60px]'
              : 'pb-11 pt-[72px] lg:pt-[120px]'
          }
        >
          <div className="grid12 items-start gap-y-14">
            <div className="col-span-12 lg:col-span-5">
              <Wordmark variant="light" height={44} className="lg:hidden" alt={site.name} />
              <Wordmark
                variant="light"
                height={onMenu ? 44 : 58}
                className="hidden lg:block"
                alt={site.name}
              />
              {/* The one gold line on the page. Menu keeps its gold for the CTA. */}
              {onMenu ? null : (
                <p className="statement mt-6 text-[24px] leading-[1.2] text-gold lg:mt-[34px] lg:text-[30px]">
                  Get here before they&rsquo;re gone.
                </p>
              )}
            </div>

            <div className="col-span-6 lg:col-span-2 lg:col-start-7">
              <h2 className={HEADING}>Hours</h2>
              <dl className="mt-[14px] text-[14px] leading-[2] text-dark lg:mt-[18px] lg:text-[14.5px] lg:leading-[2.1]">
                {hours.map((h) => (
                  <div key={h.day} className="flex gap-2">
                    <dt>
                      <span className="lg:hidden">{h.short}</span>
                      <span className="hidden lg:inline">{h.day}</span>
                    </dt>
                    <dd>{h.open}</dd>
                  </div>
                ))}
              </dl>
              {/* Closed days are stated, not omitted. */}
              <p className="mt-0 text-[14px] leading-[2] text-dark-tag lg:text-[14.5px] lg:leading-[2.1]">
                Otherwise closed
              </p>
            </div>

            <div className="col-span-6 lg:col-span-2 lg:col-start-9">
              <h2 className={HEADING}>Find us</h2>
              <address className="mt-[14px] text-[14px] not-italic leading-[1.7] text-dark lg:mt-[18px] lg:text-[14.5px]">
                {/* Three lines on a phone, two on desktop. */}
                <span className="lg:hidden">
                  {site.address.street}
                  <br />
                  {site.address.unit}
                  <br />
                  {cityLine}
                </span>
                <span className="hidden lg:inline">
                  {addressLine}
                  <br />
                  {cityLine}
                </span>
              </address>
              <a
                href={site.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block border-b border-gold pb-[3px] text-[10.5px] font-semibold uppercase tracking-[.16em] text-canvas transition-colors hover:text-gold lg:mt-[14px] lg:text-[11px]"
              >
                Directions ↗
              </a>
            </div>

            <div className="col-span-12 lg:col-span-2 lg:col-start-11">
              <h2 className={`${HEADING} hidden lg:block`}>Elsewhere</h2>
              <div className="flex gap-6 text-[14px] lg:mt-[18px] lg:flex-col lg:gap-3 lg:text-[14.5px]">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark transition-colors hover:text-gold"
                >
                  Instagram ↗
                </a>
                <a
                  href={site.hotplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark transition-colors hover:text-gold"
                >
                  <span className="lg:hidden">Hotplate ↗</span>
                  <span className="hidden lg:inline">Order on Hotplate ↗</span>
                </a>
                <Link
                  href={onMenu ? '/' : '/menu'}
                  className="text-dark transition-colors hover:text-gold"
                >
                  {onMenu ? 'Home' : 'Menu'}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between gap-4 border-t border-rule-dark-mid pt-[18px] text-[9.5px] uppercase tracking-[.16em] text-dark-cap lg:mt-24 lg:pt-[22px] lg:text-[10.5px]">
            <p className="flex items-center gap-[10px] lg:gap-3">
              <span className="opacity-70">
                <Bee on="dark" size={12} />
              </span>
              <span className="lg:hidden">
                {addressLine} · {site.address.city}, {site.address.region}
              </span>
              <span className="hidden lg:inline">
                {site.name} — {addressLine}, {cityLine}
              </span>
            </p>
            <p>© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
