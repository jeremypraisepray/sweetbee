import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Bee, Wordmark } from '@/components/Mark';
import { CaseLabel, OrderLink } from '@/components/CaseLabel';
import { HeroVideo } from '@/components/HeroVideo';
import { CaseRail } from '@/components/CaseRail';
import { Reveal } from '@/components/Reveal';
import { Drift } from '@/components/Drift';
import { site, hours, addressLine, cityLine } from '@/data/site';
import { byId, caseRail, inTheCaseToday, labelCat, press } from '@/data/menu';

export default function Home() {
  return (
    <>
      <Hero />
      <CaseTodayBand />
      <WhatsInTheCase />
      <Statement />
      <SeasonalBoard />
      <Story />
      <Buzz />
      <Visit />
    </>
  );
}

/* 1 — Hero ------------------------------------------------------------- */

function Hero() {
  return (
    <section className="pt-[78px] lg:px-[var(--gutter)] lg:pb-[88px] lg:pt-[174px]">
      {/*
        One grid, two compositions. On mobile the media and the headline share
        row 1, so the type sits over the video's lower third; on desktop the
        media spans both rows in its own column and the split reappears. The
        h1 is a single node in both — it moves, it is never duplicated.
      */}
      <div className="mx-auto grid max-w-measure lg:grid-cols-[1fr_470px] lg:grid-rows-[auto_auto] lg:content-center lg:items-start lg:gap-x-[72px]">
        <div className="relative col-start-1 row-start-1 lg:col-start-2 lg:row-span-2 lg:self-center">
          {/* Gold frame offset behind the video. Decorative; dropped on mobile. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block"
            style={{
              left: -16,
              top: 18,
              width: '100%',
              height: '100%',
              border: '1px solid rgba(244,224,123,.85)',
            }}
          />
          <HeroVideo className="relative h-[470px] w-full lg:h-[626px]" />
          {/* The gradient exists only so the mobile headline can sit on the video. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{ background: 'linear-gradient(to top, rgba(15,20,18,.82), rgba(15,20,18,0) 62%)' }}
          />
          <CaseLabel
            category="In the case today"
            name="Pistachio Cream"
            price="$7"
            index={0}
            className="absolute bottom-[52px] -left-[42px] hidden lg:block"
          />
        </div>

        <Reveal
          activeClass="is-settled"
          className="settle relative z-10 col-start-1 row-start-1 self-end px-[var(--gutter)] pb-9 lg:col-start-1 lg:row-start-1 lg:self-end lg:px-0 lg:pb-0"
        >
          <div className="mb-4 flex items-center gap-3 lg:mb-[34px]">
            <Bee size={19} className="hidden lg:block" />
            <p className="eyebrow text-gold lg:text-teal">{site.tagline}</p>
          </div>

          <h1 className="font-display text-[44px] font-normal leading-[.96] tracking-[-.025em] text-cream lg:text-[72px] lg:text-ink xl:text-[90px]">
            Your neighborhood
            <br />
            <em className="text-cream lg:text-teal-deep">croissant maker.</em>
          </h1>
        </Reveal>

        <Reveal
          activeClass="is-settled"
          className="settle col-start-1 row-start-2 px-[var(--gutter)] pb-14 pt-8 lg:col-start-1 lg:row-start-2 lg:px-0 lg:pb-0 lg:pt-0"
        >
          <p className="max-w-[46ch] text-[14.5px] leading-[1.7] text-body lg:mt-[34px] lg:text-[17px] lg:leading-[1.66]">
            Six years a home baker, turned storefront.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-[30px] lg:mt-11">
            <Link href="/menu" className="btn btn-primary justify-center sm:justify-start">
              Explore the Menu <span aria-hidden="true">→</span>
            </Link>
            <OrderLink className="btn-secondary justify-center sm:justify-start">Order Online</OrderLink>
          </div>

          <div className="meta-type mt-10 flex flex-wrap items-center gap-4 text-subtle lg:mt-16">
            <span>Thu – Sat</span>
            <span aria-hidden="true" className="h-px w-[22px] bg-current opacity-50" />
            <span>{addressLine}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 2 — In the case today ------------------------------------------------ */

function CaseTodayBand() {
  return (
    <section className="on-teal bg-teal-deep py-[17px]" aria-label="In the case today">
      <div className="rail flex items-center gap-[22px] overflow-x-auto px-[var(--gutter)] md:flex-wrap md:justify-center md:overflow-visible">
        <span className="eyebrow shrink-0 text-gold">In the case today</span>
        {inTheCaseToday.map((label) => (
          <span key={label} className="flex shrink-0 items-center gap-[22px]">
            <span aria-hidden="true" className="text-[10.5px]" style={{ color: 'rgba(244,224,123,.5)' }}>/</span>
            <span className="eyebrow whitespace-nowrap" style={{ color: 'rgba(251,247,241,.72)' }}>
              {label}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* 3 — What's in the case? ---------------------------------------------- */

function WhatsInTheCase() {
  return (
    <section className="pb-[104px] pt-[86px] lg:pt-[118px]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="eyebrow text-teal">Product discovery</p>
            <h2 className="mt-5 font-display text-[38px] leading-[.98] tracking-[-.02em] text-ink lg:text-[62px] xl:text-[78px]">
              What&rsquo;s in the case?
            </h2>
          </div>
          <div className="lg:max-w-[380px]">
            <p className="text-[15px] leading-[1.7] text-body">
              Six things worth driving for. Drag sideways — the real case is longer than this.
            </p>
            <Link href="/menu" className="btn-secondary mt-6 inline-flex">
              See the full menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Deliberately overflows the right gutter — the case keeps going. */}
      <CaseRail className="mt-12 flex snap-x snap-mandatory items-end gap-6 px-[var(--gutter)] pb-[22px] lg:mt-[74px] lg:snap-none lg:gap-[34px]">
        <div className="flex min-w-max items-end gap-6 lg:gap-[34px]">
          {caseRail.map((slot, i) => {
            const item = byId(slot.id);
            if (!item?.img) return null;
            return (
              <figure key={slot.id} className="case-label-hover shrink-0 snap-start">
                <Photo
                  name={item.img}
                  alt={item.alt ?? item.name}
                  width={slot.w}
                  height={slot.h}
                  sizes={`(max-width: 1023px) ${Math.round(slot.w * 0.6)}px, ${slot.w}px`}
                  className="block w-[calc(var(--w)*0.6)] h-[calc(var(--h)*0.6)] rounded-[2px] object-cover lg:w-[var(--w)] lg:h-[var(--h)]"
                  style={{ ['--w' as string]: `${slot.w}px`, ['--h' as string]: `${slot.h}px` }}
                />
                <div className="relative mt-[22px]" style={{ borderTop: '1px solid rgba(23,19,15,.22)' }}>
                  <figcaption>
                    <CaseLabel
                      category={labelCat(item)}
                      name={item.name}
                      price={item.price.replace('.00', '')}
                      seasonal={item.cat !== 'Originals'}
                      index={i}
                      className="-mt-px inline-block"
                    />
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </CaseRail>
    </section>
  );
}

/* 4 — Brand statement -------------------------------------------------- */

function Statement() {
  return (
    <section className="on-teal bg-teal-deep px-[var(--gutter)] py-[88px] lg:py-[152px]">
      <div className="mx-auto max-w-measure">
        <p className="eyebrow mb-10 text-gold lg:mb-[52px]">The Sweet Bee theory</p>

        <Reveal activeClass="is-revealed" className="reveal-line">
          <span className="block font-display text-[50px] font-light leading-[.94] tracking-[-.03em] text-cream lg:text-[92px] xl:text-[118px]">
            We could have
            <br />
            stopped at butter.
          </span>
        </Reveal>

        <Reveal activeClass="is-revealed" delay={160} className="reveal-line mt-2 text-right lg:mr-[60px]">
          <span className="block font-display text-[50px] font-light italic leading-[.94] tracking-[-.03em] text-gold lg:text-[92px] xl:text-[118px]">
            We didn&rsquo;t.
          </span>
        </Reveal>

        <div className="mt-12 flex items-start gap-4 lg:mt-[76px]">
          <Bee variant="glyph" size={26} className="mt-1 shrink-0" lazy />
          <p className="max-w-[52ch] text-[15px] leading-[1.72]" style={{ color: 'rgba(251,247,241,.74)' }}>
            Somewhere between the traditional and the frankly unhinged is a croissant filled with crab
            rangoon. That&rsquo;s where we live.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 5 — The seasonal board ----------------------------------------------- */

function SeasonalBoard() {
  const pist = byId('pist')!;
  const crab = byId('crab')!;
  const fig = byId('fig')!;

  return (
    <section className="py-[80px] lg:py-[130px]">
      <div className="shell grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:gap-[70px]">
        <div className="relative">
          <Photo
            name={pist.img!}
            alt={pist.alt!}
            width={760}
            height={760}
            sizes="(max-width: 1023px) calc(100vw - 40px), 733px"
            className="h-[420px] w-full rounded-[2px] object-cover lg:h-[760px]"
          />
          {/* Breakout crop: the one overlap that drifts. Dropped under 1024. */}
          <Drift className="absolute hidden lg:block" style={{ right: -58, bottom: -56 }}>
            <Photo
              name={crab.img!}
              alt={crab.alt!}
              width={266}
              height={332}
              sizes="266px"
              className="h-[332px] w-[266px] rounded-[2px] object-cover shadow-breakout"
            />
          </Drift>
        </div>

        <div className="lg:pt-[34px]">
          <p className="eyebrow text-teal">The seasonal board</p>
          <h2 className="mt-5 font-display text-[38px] leading-[1] tracking-[-.024em] text-ink lg:text-[62px]">
            Seasonal flavors,
            <br />
            zero restraint.
          </h2>

          <p className="mt-7 text-[15px] leading-[1.7] text-body lg:text-[16.5px]">
            A bi-color pistachio croissant striped like a tiger. A savory rangoon spiral with crispy
            wonton on top. Fig jam and ricotta with herbs from the back. None of it was on a plan.
          </p>
          <p className="mt-5 text-[15px] leading-[1.7] text-body lg:text-[16.5px]">
            The lamination is the discipline — three days, thirty-odd layers, no shortcuts. What goes
            inside is where it gets interesting.
          </p>

          <dl className="mt-11 flex gap-11 pt-[30px]" style={{ borderTop: '1px solid rgba(23,19,15,.14)' }}>
            {[
              { figure: '3 days', label: 'Per batch of dough' },
              { figure: 'Thu – Sat', label: "Then it's gone" },
            ].map((s) => (
              <div key={s.figure}>
                <dt className="font-display text-[32px] leading-none text-ink lg:text-[44px]">{s.figure}</dt>
                <dd className="mt-3 text-[10px] font-semibold uppercase tracking-[.16em] text-subtle">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>

          <figure className="mt-10 lg:mt-[52px]">
            <Photo
              name={fig.img!}
              alt={fig.alt!}
              width={240}
              height={300}
              sizes="240px"
              className="h-[300px] w-[240px] rounded-[2px] object-cover"
            />
            <figcaption className="mt-3 text-[9.5px] font-semibold uppercase tracking-[.16em] text-subtle">
              Fig &amp; ricotta — back for a while
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* 6 — Hi, I'm Ally ----------------------------------------------------- */

function Story() {
  return (
    <section
      id="story"
      className="scroll-mt-[78px] bg-paper py-[80px] lg:py-[130px]"
      style={{ borderTop: '1px solid rgba(23,19,15,.08)' }}
    >
      <div className="shell grid gap-12 lg:grid-cols-[520px_1fr] lg:items-center lg:gap-[88px]">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block"
            style={{ left: 18, top: -18, width: '100%', height: '100%', border: '1px solid rgba(0,112,122,.55)' }}
          />
          <Photo
            name="ally"
            alt="Ally, owner and baker at Sweet Bee Bakehouse, holding a plate of pastries in the kitchen."
            width={520}
            height={650}
            sizes="(max-width: 1023px) calc(100vw - 40px), 520px"
            className="relative h-[440px] w-full rounded-[2px] object-cover lg:h-[650px]"
            style={{ objectPosition: '50% 22%' }}
          />
        </div>

        <div>
          <p className="eyebrow text-teal">Owner &amp; baker</p>
          <h2 className="mt-5 font-display text-[42px] leading-[1] tracking-[-.024em] text-ink lg:text-[82px]">
            Hi, I&rsquo;m Ally.
          </h2>
          <div className="mt-8 max-w-[52ch] space-y-5 text-[15px] leading-[1.72] text-body lg:text-[17px]">
            <p>
              I&rsquo;ve spent more than a decade in kitchens, and the thing I never got over is edible
              art — how a pastry can be beautiful and still disappear in four bites.
            </p>
            <p>
              Sweet Bee started as a cottage bakery out of my house in East Pearland. Word travelled
              faster than I could laminate. Now it&rsquo;s a storefront on Broadway with a case I fill
              three days a week, and I still make the thing I want to eat that week rather than the
              thing that&rsquo;s easy to sell.
            </p>
            <p>If you see something odd in the case, that&rsquo;s on purpose. Ask me about it.</p>
          </div>
          <Wordmark variant="dark" height={34} className="mt-10 opacity-90" alt="" lazy />
        </div>
      </div>
    </section>
  );
}

/* 7 — A little buzz ---------------------------------------------------- */

function Buzz() {
  const unconfirmed = press.some((p) => !p.confirmed);
  return (
    <section className="py-[80px] lg:py-[110px]">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[36px] leading-[1] tracking-[-.02em] text-ink lg:text-[56px]">
            A little buzz.
          </h2>
          <p className="font-display text-[17px] italic text-subtle lg:text-[19px]">
            Nice of them to notice.
          </p>
        </div>

        <ul className="mt-10">
          {press.map((p) => {
            const inner = (
              <>
                <span className="font-display text-[24px] leading-tight text-ink lg:text-[30px]">
                  {p.outlet}
                </span>
                <span className="text-[14.5px] leading-[1.6] text-body">{p.context}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-teal">Press</span>
              </>
            );
            const rowClass =
              'grid grid-cols-1 items-baseline gap-3 py-[30px] transition-[padding] duration-[260ms] ease-standard md:grid-cols-[1fr_2fr_auto] md:gap-10 hover:pl-[14px] focus-visible:pl-[14px]';
            return (
              <li key={p.outlet} style={{ borderTop: '1px solid rgba(23,19,15,.14)' }}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                    {inner}
                  </a>
                ) : (
                  <div className={rowClass}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>

        {unconfirmed ? (
          <p className="mt-6 text-[12px] leading-[1.6] text-faint">
            Exact citations and dates to be confirmed before launch.
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* 8 — Visit ------------------------------------------------------------ */

function Visit() {
  return (
    <section id="visit" className="scroll-mt-[78px] grid lg:grid-cols-2 lg:min-h-[760px]">
      <div className="relative h-[330px] lg:h-auto">
        <Photo
          name="case-counter"
          alt="The long wood counter at Sweet Bee Bakehouse, trays of croissants and hand-lettered price cards running its length."
          width={760}
          height={760}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="on-teal bg-teal-deep px-[var(--gutter)] py-[72px] text-cream lg:px-[88px] lg:py-[118px]">
        <div className="flex h-full flex-col justify-center">
          <p className="eyebrow text-gold">Visit</p>
          <h2 className="mt-5 font-display text-[40px] leading-[1] tracking-[-.024em] text-cream lg:text-[66px]">
            Come look
            <br />
            in the case.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.7] lg:text-[16px]" style={{ color: 'rgba(251,247,241,.76)' }}>
            We&rsquo;re on Broadway, three days a week, until the trays are empty. Saturdays go fast.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-11">
            <div>
              <h3 className="eyebrow text-gold">Hours</h3>
              <dl className="mt-5">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 py-3"
                    style={{ borderTop: '1px solid rgba(251,247,241,.16)' }}
                  >
                    <dt
                      className="text-[13px] font-medium uppercase tracking-[.1em]"
                      style={{ color: h.closed ? 'rgba(251,247,241,.66)' : 'rgba(251,247,241,.82)' }}
                    >
                      {h.day}
                    </dt>
                    <dd
                      className="font-display text-[16px]"
                      style={{ color: h.closed ? 'rgba(251,247,241,.66)' : '#FBF7F1' }}
                    >
                      {h.open}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="eyebrow text-gold">Find us</h3>
              <address className="mt-5 font-display text-[20px] not-italic leading-[1.42] text-cream lg:text-[22px]">
                {site.address.street}
                <br />
                {site.address.unit}
                <br />
                {cityLine}
              </address>
              {!site.email && !site.phone ? (
                <p className="mt-5 text-[11px] uppercase tracking-[.14em]" style={{ color: 'rgba(251,247,241,.66)' }}>
                  Email &amp; phone to be confirmed
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
            <a
              href={site.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-teal justify-center sm:justify-start"
            >
              Get Directions <span aria-hidden="true">→</span>
            </a>
            <OrderLink className="btn-secondary btn-secondary-light justify-center sm:justify-start">
              Order Ahead
            </OrderLink>
          </div>
        </div>
      </div>
    </section>
  );
}
