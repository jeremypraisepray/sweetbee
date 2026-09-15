import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Photo } from '@/components/Photo';
import { SectionLabel } from '@/components/Bee';
import { JsonLd } from '@/components/JsonLd';
import { menuSchema } from '@/lib/schema';
import { menu } from '@/data/menu';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'The Menu',
  description:
    'What’s in the case this week: croissant originals, seasonal rotations, savory, and sweets, with prices. Pre-order on Hotplate for pickup in Pearland, Texas.',
  alternates: { canonical: '/menu' },
};

/** The dark page. Prices appear here and nowhere else on the site. */
export default function MenuPage() {
  return (
    <div className="bg-ink text-canvas">
      <JsonLd data={menuSchema} />
      <Nav placement="dark" current="/menu" />

      <main id="main">
        <div className="gutter flex flex-col items-center pb-14 pt-16 text-center lg:pb-[110px] lg:pt-[130px]">
          <SectionLabel on="dark">The Menu</SectionLabel>
          <h1 className="statement mt-[26px] max-w-[20ch] text-[36px] leading-[1.1] lg:mt-10 lg:text-[64px] lg:leading-[1.08] lg:tracking-[-.02em]">
            What&rsquo;s in the case this week.
          </h1>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.7] text-dark-lede lg:mt-[30px] lg:text-[16px]">
            Updated Tuesday morning. Seasonal items rotate without notice; when something&rsquo;s
            gone, it&rsquo;s gone.
          </p>

          <nav aria-label="Menu categories" className="mt-10 flex flex-wrap justify-center gap-x-[26px] gap-y-[14px] lg:mt-14 lg:gap-x-11">
            {menu.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="border-b border-transparent pb-[5px] text-[10.5px] font-semibold uppercase tracking-[.16em] text-[rgba(250,248,242,.6)] transition-colors hover:border-gold hover:text-canvas lg:pb-[6px] lg:text-[11px] lg:tracking-[.18em]"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="gutter flex flex-col gap-20 pb-20 lg:gap-[150px] lg:pb-[140px]">
          {menu.map((cat, i) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-6 lg:scroll-mt-10">
              <figure>
                <Photo
                  name={cat.img}
                  alt={cat.alt}
                  sizes="(max-width: 1023px) 100vw, calc(100vw - 96px)"
                  width={1344}
                  height={620}
                  // The first category photo is at the fold on a phone and was
                  // being lazy-loaded into the LCP slot.
                  priority={i === 0}
                  className="h-[300px] w-full object-cover lg:h-[620px]"
                  style={{ objectPosition: cat.pos }}
                />
                <figcaption className="mt-3 flex justify-between gap-4 text-[11px] font-semibold uppercase tracking-[.18em] text-dark-cap lg:mt-[14px]">
                  <span className="hidden lg:inline">{cat.label}</span>
                  <span className="font-serif text-[13.5px] font-normal normal-case italic tracking-normal lg:text-[14px]">
                    {cat.caption}
                  </span>
                </figcaption>
              </figure>

              <div className="mt-9 lg:mt-[72px] lg:grid12">
                <div className="self-start lg:col-span-3">
                  <SectionLabel on="dark" as="h2">
                    {cat.label}
                  </SectionLabel>
                  <p className="statement mt-4 max-w-[20ch] text-[19px] leading-[1.35] text-dark-note lg:mt-[22px] lg:text-[22px]">
                    {cat.note}
                  </p>
                </div>

                <div className="mt-7 border-t border-rule-dark lg:col-span-8 lg:col-start-4 lg:mt-0">
                  <ul>
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="border-b border-rule-dark-row py-5 lg:grid lg:grid-cols-[1fr_2fr_auto] lg:items-baseline lg:gap-10 lg:py-[26px]"
                      >
                        {/* Phone puts name and price on one line; desktop uses
                            the three-column grid with the price flush right. */}
                        <div className="flex items-baseline justify-between gap-5 lg:flex-col lg:items-start lg:gap-[6px]">
                          <h3 className="text-[18px] font-medium tracking-[-.01em] lg:text-[22px]">
                            {item.name}
                          </h3>
                          <p className="tabular whitespace-nowrap text-[16px] lg:hidden">{item.price}</p>
                          <p className="hidden text-[10.5px] font-semibold uppercase tracking-[.16em] text-dark-tag lg:block">
                            {item.tag}
                          </p>
                        </div>

                        <p className="mt-[6px] font-serif text-[15.5px] italic leading-[1.5] text-dark-desc lg:mt-0 lg:text-[18px]">
                          {item.desc}
                        </p>

                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.16em] text-dark-tag lg:hidden">
                          {item.tag}
                        </p>
                        <p className="tabular hidden min-w-[44px] text-right text-[18px] text-canvas lg:block">
                          {item.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="gutter flex flex-col items-center gap-5 pb-20 text-center lg:gap-[26px] lg:pb-[140px]">
          <p className="statement max-w-[26ch] text-[26px] leading-[1.2] text-gold lg:text-[34px]">
            Pre-orders open Sunday night. Walk-ins until the case is empty.
          </p>
          <a
            href={site.hotplate}
            target="_blank"
            rel="noopener noreferrer"
            className="rule-link border-gold text-canvas transition-colors hover:text-gold"
          >
            Order on Hotplate ↗
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </main>

      <SiteFooter variant="menu" />
    </div>
  );
}
