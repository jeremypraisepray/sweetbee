import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Photo } from '@/components/Photo';
import { Wordmark } from '@/components/Wordmark';
import { SectionLabel } from '@/components/Bee';
import { Reveal } from '@/components/Reveal';
import { HeroVideo } from '@/components/HeroVideo';
import { site, hoursLine, hoursLineShort, addressLine, cityLine, press } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <Definition />
        <TheCase />
        <Pair />
        <Story />
        <Press />
        <ClosingImage />
      </main>
      <SiteFooter variant="home" />
    </>
  );
}

/* Hero ------------------------------------------------------------------ */

function Hero() {
  return (
    <header className="relative h-[720px] overflow-hidden bg-ink lg:h-[900px]">
      <HeroVideo />

      {/* Darkens the top and bottom bands so the nav and hours read; the middle
          stays nearly clear so the pastry does the work. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(29,28,25,.45) 0%, rgba(29,28,25,.1) 35%, rgba(29,28,25,.1) 62%, rgba(29,28,25,.55) 100%)',
        }}
      />

      <Nav placement="hero" current="/" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1>
          {/* 300px on a phone, growing through the tablet range, then pinned to
              the handoff's 132px height from 1024 up. */}
          <Wordmark
            variant="light"
            className="h-auto w-[300px] max-w-[82vw] md:w-[460px] lg:h-[132px] lg:w-auto lg:max-w-none"
            style={{ filter: 'drop-shadow(0 2px 18px rgba(0,0,0,.25))' }}
            alt={site.name}
            priority
          />
        </h1>
      </div>

      {/* Mobile keeps only the hours line; desktop gets the full three-part row. */}
      <p className="statement absolute inset-x-[var(--gutter)] bottom-[26px] text-center text-[17px] leading-[1.35] text-dark lg:hidden">
        {hoursLineShort}
      </p>

      <div className="absolute inset-x-[var(--gutter)] bottom-9 hidden items-end justify-between gap-8 text-[11px] font-medium uppercase tracking-[.18em] text-dark lg:flex">
        <p className="leading-[1.9]">
          {addressLine}
          <br />
          {cityLine}
        </p>
        <p className="statement text-[20px] normal-case tracking-normal">{hoursLine}</p>
        <p>Est. {site.established}</p>
      </div>
    </header>
  );
}

/* Definition ------------------------------------------------------------ */

function Definition() {
  return (
    <Reveal className="gutter flex flex-col items-center pb-[76px] pt-[84px] text-center lg:pb-[150px] lg:pt-[170px]">
      <SectionLabel on="light">Sweet Bee</SectionLabel>
      <h2 className="statement mt-7 max-w-[18ch] text-[38px] leading-[1.1] lg:mt-11 lg:text-[70px] lg:leading-[1.08] lg:tracking-[-.02em]">
        Your neighborhood croissant maker.
      </h2>
      <p className="mt-6 text-[12px] tracking-[.06em] text-muted lg:mt-[38px] lg:text-[13px]">
        /swēt bē/ · noun
      </p>
      <p className="prose-body mt-[14px] max-w-[52ch] lg:mt-[18px] lg:text-[18px]">
        A croissant-focused bakehouse in Pearland. Six years in a home kitchen, now a storefront on
        Broadway. Three days per batch of dough, a small case, and a menu that changes without
        warning.
      </p>
    </Reveal>
  );
}

/* The Case -------------------------------------------------------------- */

function TheCase() {
  return (
    <>
      <Reveal as="div" className="lg:gutter">
        <Photo
          name="choc-croissants"
          alt="A sheet tray of bi-color chocolate croissants, glazed and striped dark against burnished pastry."
          sizes="(max-width: 1023px) 100vw, calc(100vw - 96px)"
          width={1344}
          height={820}
          className="h-[470px] w-full object-cover lg:h-[820px]"
          style={{ objectPosition: '50% 60%' }}
        />
      </Reveal>

      <Reveal className="gutter flex flex-col items-center pt-11 text-center lg:pt-24">
        <SectionLabel on="light">The Case</SectionLabel>
        <h2 className="statement mt-[22px] text-[32px] lg:mt-9 lg:text-[46px]">
          Six things worth driving for.
        </h2>
        <p className="prose-body mt-5 max-w-[50ch] lg:mt-[30px]">
          The traditional butter croissant is always here. Everything around it rotates — what&rsquo;s
          in the case Thursday morning may be gone by Saturday noon.
        </p>
        <Link href="/menu" className="rule-link mt-[26px] border-ink transition-colors hover:border-teal hover:text-teal lg:mt-[34px]">
          See the menu
        </Link>
      </Reveal>
    </>
  );
}

/* Pair ------------------------------------------------------------------ */

const PAIR = [
  { name: 'pistachio', label: 'Pistachio', note: 'Spring', alt: 'Bi-color pistachio croissants striped green and gold on a sheet tray.' },
  { name: 'buckeye-buns', label: 'Buckeye Bun', note: 'Always', alt: 'Round brioche buns capped with dark chocolate glaze and a fine peanut butter drizzle.' },
] as const;

function Pair() {
  return (
    <Reveal className="gutter mt-24 grid grid-cols-2 gap-3 lg:mt-[170px] lg:gap-6">
      {PAIR.map((p) => (
        <figure key={p.name}>
          <Photo
            name={p.name}
            alt={p.alt}
            sizes="(max-width: 1023px) 50vw, calc((100vw - 120px) / 2)"
            width={660}
            height={760}
            className="h-[240px] w-full object-cover lg:h-[760px]"
          />
          <figcaption className="mt-[10px] flex items-baseline justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.16em] text-muted lg:mt-[14px] lg:text-[11px] lg:tracking-[.18em]">
            <span>{p.label}</span>
            <span className="hidden font-serif text-[14px] font-normal normal-case italic tracking-normal lg:inline">
              {p.note}
            </span>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}

/* Our story ------------------------------------------------------------- */

function Story() {
  return (
    <Reveal id="story" className="mt-24 scroll-mt-8 lg:mt-[180px]">
      <div className="lg:gutter lg:grid12 lg:items-center">
        <div className="lg:col-span-6">
          <Photo
            name="ally"
            alt="Ally B. in the Sweet Bee kitchen, holding a plate of pastries."
            sizes="(max-width: 1023px) 100vw, calc((100vw - 120px) / 2)"
            width={660}
            height={840}
            className="h-[520px] w-full object-cover lg:h-[840px]"
            style={{ objectPosition: '50% 22%' }}
          />
        </div>
        <div className="gutter pt-11 lg:col-span-4 lg:col-start-8 lg:pr-6 lg:pt-0">
          <SectionLabel on="light">Our story</SectionLabel>
          <h2 className="statement mt-[22px] text-[32px] lg:mt-9 lg:text-[46px]">Hi, I&rsquo;m Ally.</h2>
          <p className="prose-body mt-5 lg:mt-[30px]">
            Sweet Bee started in my kitchen at home — six years of baking for friends, neighbors, and
            anyone who&rsquo;d take a box off my hands. Now there&rsquo;s a storefront, a case, and a
            line on Saturdays.
          </p>
          <p className="prose-body mt-[14px] lg:mt-[18px]">
            Croissants are the thing I care most about. Three days of folding, an unreasonable amount
            of butter, and then whatever flavor I couldn&rsquo;t stop thinking about that week.
          </p>
          <Wordmark variant="dark" height={24} className="mt-7 opacity-90 lg:!hidden" alt="" />
          <Wordmark variant="dark" height={30} className="mt-10 hidden opacity-90 lg:!block" alt="" />
        </div>
      </div>
    </Reveal>
  );
}

/* Press ----------------------------------------------------------------- */

function Press() {
  const unconfirmed = press.some((p) => !p.confirmed);
  return (
    <Reveal className="gutter mt-24 lg:mt-[180px]">
      <div className="lg:grid12">
        <SectionLabel on="light" as="h2" className="mb-[22px] self-start lg:col-span-3 lg:mb-0">
          Press
        </SectionLabel>

        <ul className="lg:col-span-8 lg:col-start-4">
          {press.map((p) => {
            const row = (
              <>
                <span className="text-[20px] font-medium tracking-[-.01em] lg:text-[26px]">{p.pub}</span>
                <span className="font-serif text-[16px] italic text-muted lg:text-right lg:text-[19px]">
                  {p.award}
                </span>
              </>
            );
            return (
              <li key={p.pub} className="border-t border-rule-list">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-[6px] py-5 transition-colors hover:text-teal lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 lg:py-[26px]"
                  >
                    {row}
                  </a>
                ) : (
                  <div className="flex flex-col gap-[6px] py-5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 lg:py-[26px]">
                    {row}
                  </div>
                )}
              </li>
            );
          })}
          <li className="border-t border-rule-list" aria-hidden="true" />
        </ul>
      </div>

      {unconfirmed ? (
        <p className="mt-5 text-[12px] leading-[1.6] text-muted lg:ml-[calc(25%+6px)]">
          Citations to be confirmed with the publications before launch.
        </p>
      ) : null}
    </Reveal>
  );
}

/* Closing image --------------------------------------------------------- */

function ClosingImage() {
  return (
    <Reveal as="div" className="mt-24 lg:mt-[170px]">
      <Photo
        name="case-counter"
        alt="The Sweet Bee counter: trays of croissants and hand-lettered price cards running the length of a wood bar."
        sizes="100vw"
        width={1440}
        height={760}
        className="h-[420px] w-full object-cover lg:h-[760px]"
        style={{ objectPosition: '50% 45%' }}
      />
    </Reveal>
  );
}
