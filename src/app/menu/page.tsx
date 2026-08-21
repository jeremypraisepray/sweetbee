import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Bee } from '@/components/Mark';
import { CaseLabel, OrderLink } from '@/components/CaseLabel';
import { MenuBrowser } from '@/components/MenuBrowser';
import { JsonLd } from '@/components/JsonLd';
import { menuSchema } from '@/lib/schema';
import { byId, currentFavorites, labelCat } from '@/data/menu';

export const metadata: Metadata = {
  title: 'The Menu',
  description:
    'Everything in the case: classic croissants, seasonal experiments and sweets, with prices. Pre-order on Hotplate for pickup Thursday through Saturday in Pearland, Texas.',
  alternates: { canonical: '/menu' },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuSchema} />
      <MenuHero />
      <CurrentFavorites />
      <MenuBrowser />
      <OrderBand />
    </>
  );
}

function MenuHero() {
  return (
    <section className="px-[var(--gutter)] pb-12 pt-[110px] lg:pb-[76px] lg:pt-[166px]">
      <div className="mx-auto grid max-w-measure gap-10 lg:grid-cols-[1fr_440px] lg:items-end lg:gap-[72px]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Bee size={19} />
            <p className="eyebrow text-teal">The menu</p>
          </div>
          <h1 className="font-display text-[46px] leading-[.92] tracking-[-.03em] text-ink lg:text-[86px] xl:text-[112px]">
            Everything
            <br />
            in the case.
          </h1>
          <p className="mt-7 max-w-[50ch] text-[14.5px] leading-[1.7] text-body lg:text-[17px] lg:leading-[1.66]">
            The classics, the seasonal experiments, and whatever Ally couldn&rsquo;t stop thinking
            about this week.
          </p>
        </div>

        <figure>
          <Photo
            name="case-overhead"
            alt="The pastry case seen from above: cookies, macarons, alfajores and croissants on white trays along a wood counter."
            width={440}
            height={540}
            sizes="(max-width: 1023px) calc(100vw - 40px), 440px"
            priority
            className="h-[340px] w-full rounded-[2px] object-cover lg:h-[540px]"
          />
          {/* A timestamp, not a caption — the case is a snapshot. */}
          <figcaption className="mt-3 text-[9.5px] font-semibold uppercase tracking-[.16em] text-subtle">
            Thursday, 10:04 a.m.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function CurrentFavorites() {
  return (
    <section className="shell pb-14 lg:pb-20">
      <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-[32px] leading-[1] tracking-[-.02em] text-ink lg:text-[44px]">
          Current favorites
        </h2>
        <p className="text-[14px] text-subtle">Three that keep selling out</p>
      </div>

      <div
        className="grid gap-6 pt-8 sm:grid-cols-3 sm:items-end lg:gap-9"
        style={{ borderTop: '1px solid rgba(23,19,15,.14)' }}
      >
        {currentFavorites.map((fav, i) => {
          const item = byId(fav.id);
          if (!item?.img) return null;
          return (
            <figure key={fav.id} className="case-label-hover">
              <Photo
                name={item.img}
                alt={item.alt ?? item.name}
                width={500}
                height={fav.h}
                sizes="(max-width: 639px) calc(100vw - 40px), 33vw"
                priority={i === 0}
                className="h-[calc(var(--h)*0.62)] w-full rounded-[2px] object-cover lg:h-[var(--h)]"
                style={{ ['--h' as string]: `${fav.h}px` }}
              />
              <figcaption className="mt-5">
                <CaseLabel
                  category={labelCat(item)}
                  name={item.name}
                  price={item.price.replace('.00', '')}
                  seasonal={item.cat !== 'Originals'}
                  index={i + 3}
                  className="inline-block"
                />
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function OrderBand() {
  return (
    <section className="on-teal mt-20 bg-teal-deep px-[var(--gutter)] py-20 text-cream lg:mt-28 lg:py-[118px]">
      <div className="mx-auto flex max-w-measure flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <p className="eyebrow text-gold">Ordering</p>
          <h2 className="mt-5 font-display text-[42px] leading-[1] tracking-[-.024em] text-cream lg:text-[76px]">
            Want it waiting
            <br />
            for you?
          </h2>
        </div>
        <div className="lg:max-w-[420px] lg:text-right">
          <p className="text-[15px] leading-[1.7] lg:text-[16px]" style={{ color: 'rgba(251,247,241,.76)' }}>
            Pre-order on Hotplate and we&rsquo;ll box it up before the Saturday line starts.
          </p>
          <OrderLink className="btn btn-on-teal mt-8 justify-center lg:justify-start">
            Pre-order on Hotplate
          </OrderLink>
        </div>
      </div>
    </section>
  );
}
