'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Bee } from './Mark';
import { CaseLabel, OrderLink } from './CaseLabel';
import { photoSources } from './Photo';
import { categories, groups, labelCat, menuItems, type Filter, type MenuItem } from '@/data/menu';

/**
 * The menu is the signature experience, so two rules govern this component:
 * every fact (name, price, description, seasonal status) is present without
 * interaction, and the photo panel dissolves between items rather than
 * blinking. The panel is an enhancement layered on a plain, readable list.
 */

const PANEL_SIZES = '(max-width: 1023px) calc(100vw - 40px), 500px';

export function MenuBrowser() {
  const [filter, setFilter] = useState<Filter>('All');
  const firstWithPhoto = useMemo(() => menuItems.find((i) => i.img) ?? menuItems[0], []);
  const [activeId, setActiveId] = useState(firstWithPhoto.id);

  // Two stacked layers; only the inactive one ever changes src, then the pair
  // swap opacity. That is what makes the change a dissolve, not a reload.
  const [slot, setSlot] = useState<'A' | 'B'>('A');
  const [imgA, setImgA] = useState<string | null>(firstWithPhoto.img);
  const [imgB, setImgB] = useState<string | null>(null);

  const visible = useMemo(
    () => menuItems.filter((i) => filter === 'All' || i.cat === filter),
    [filter]
  );
  const active = useMemo(
    () => menuItems.find((i) => i.id === activeId) ?? visible[0] ?? menuItems[0],
    [activeId, visible]
  );

  const [fading, setFading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const setActive = useCallback(
    (item: MenuItem) => {
      if (item.id === activeId) return;
      setActiveId(item.id);
      if (!item.img) return; // The fallback panel handles photoless items.
      // Paint into whichever layer is currently hidden, then flip.
      if (slot === 'A') {
        setImgB(item.img);
        setSlot('B');
      } else {
        setImgA(item.img);
        setSlot('A');
      }
    },
    [activeId, slot]
  );

  // Changing category resets the panel to the first item of the new set, so
  // the photo never belongs to something that is no longer on screen.
  const changeFilter = (next: Filter) => {
    if (next === filter) return;
    setFading(true);
    setFilter(next);
    const pool = menuItems.filter((i) => next === 'All' || i.cat === next);
    const target = pool.find((i) => i.img) ?? pool[0];
    if (target) setActive(target);
    window.setTimeout(() => setFading(false), 300);
  };

  // No speculative preload: an `Image()` warm-up can only ask for one format,
  // so it fetched a WebP the panel then never used while the panel took the
  // AVIF — a whole extra photograph per row. The 560ms dissolve covers the
  // load, and the outgoing layer stays painted until the new one is ready.

  return (
    <>
      <CategoryBar filter={filter} onChange={changeFilter} count={visible.length} />

      <div className="shell grid items-start gap-10 pt-10 lg:grid-cols-[1fr_500px] lg:gap-20 lg:pt-[66px]">
        {/* -- The list ------------------------------------------------- */}
        <div
          ref={listRef}
          className="order-2 transition-opacity duration-300 lg:order-1"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {groups
            .filter((g) => filter === 'All' || filter === g.cat)
            .map((group) => {
              const items = visible.filter((i) => i.cat === group.cat);
              if (!items.length) return null;
              return (
                <section key={group.cat} className="mb-14 last:mb-0">
                  <div className="flex items-center gap-5">
                    <h2 className="eyebrow shrink-0 text-teal">{group.title}</h2>
                    <span aria-hidden="true" className="h-px flex-1" style={{ background: 'rgba(23,19,15,.14)' }} />
                    <span className="shrink-0 font-display text-[15px] text-subtle">{items.length}</span>
                  </div>

                  <ul className="mt-6">
                    {items.map((item) => (
                      <MenuRow
                        key={item.id}
                        item={item}
                        isActive={item.id === active.id}
                        onActivate={() => setActive(item)}
                      />
                    ))}
                  </ul>
                </section>
              );
            })}

          <aside
            className="mt-12 flex gap-4 px-7 py-[26px]"
            style={{ background: 'rgba(0,112,122,.07)', borderLeft: '2px solid #00707A' }}
          >
            <Bee size={22} className="mt-1 shrink-0" lazy />
            <div>
              <p className="font-display text-[22px] leading-tight text-ink">The case changes often.</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-body">
                Seasonal flavors rotate when Ally gets an idea, and Saturday afternoons are
                unpredictable. Half the fun is not knowing what&rsquo;s on the tray.
              </p>
            </div>
          </aside>
        </div>

        {/* -- The photo panel ------------------------------------------ */}
        {/* Sticky under the header + category bar on mobile, beside the list above it. */}
        <div className="order-1 lg:order-2 lg:self-stretch">
          <div
            className="sticky top-[148px] z-30 -mx-[var(--gutter)] bg-cream px-[var(--gutter)] pb-4 lg:top-[190px] lg:mx-0 lg:px-0 lg:pb-0"
          >
          <div
            className="relative h-[250px] overflow-hidden rounded-[2px] lg:h-[640px]"
            style={{ background: '#F1EAE0' }}
          >
            {active.img ? (
              <>
                <PanelLayer name={imgA} alt={layerAlt(imgA)} visible={slot === 'A'} />
                <PanelLayer name={imgB} alt={layerAlt(imgB)} visible={slot === 'B'} />
              </>
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center"
                style={{ background: '#F6F0E7' }}
              >
                <Bee size={34} className="opacity-50" />
                <p className="mt-4 font-display text-[24px] leading-tight text-ink lg:mt-6 lg:text-[30px]">
                  {active.name}
                </p>
                <p className="mt-3 max-w-[26ch] text-[10px] font-semibold uppercase leading-[1.7] tracking-[.14em] text-subtle lg:mt-4">
                  Photograph coming — it looks considerably better in person.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-end justify-between gap-4 lg:mt-5">
            <CaseLabel
              category={labelCat(active)}
              name={active.name}
              price={active.price}
              seasonal={active.cat !== 'Originals'}
              index={2}
            />
            <p className="hidden shrink-0 text-[9.5px] uppercase tracking-[.14em] text-faint lg:block">
              Hover or tap any item
            </p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

function layerAlt(name: string | null) {
  if (!name) return '';
  const item = menuItems.find((i) => i.img === name);
  return item?.alt ?? item?.name ?? '';
}

/** One of the two cross-fading layers. Both stay mounted; opacity does the work. */
function PanelLayer({ name, alt, visible }: { name: string | null; alt: string; visible: boolean }) {
  const sources = name ? photoSources(name) : null;
  if (!sources) return null;
  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={PANEL_SIZES} />
      <source type="image/webp" srcSet={sources.webp} sizes={PANEL_SIZES} />
      <img
        src={sources.fallback}
        srcSet={sources.jpg}
        sizes={PANEL_SIZES}
        alt={visible ? alt : ''}
        aria-hidden={visible ? undefined : true}
        width={500}
        height={640}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[560ms] ease-fade"
        style={{ opacity: visible ? 1 : 0 }}
        decoding="async"
      />
    </picture>
  );
}

function MenuRow({
  item,
  isActive,
  onActivate,
}: {
  item: MenuItem;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <li
      className="group relative transition-[padding,background-color] duration-300 ease-standard hover:pl-4 focus-within:pl-4"
      style={{
        borderBottom: '1px solid rgba(23,19,15,.14)',
        background: isActive ? 'rgba(0,112,122,.05)' : undefined,
        paddingLeft: isActive ? 16 : undefined,
      }}
      onMouseEnter={onActivate}
    >
      {/* A real button, so keyboard users drive the panel exactly like a mouse. */}
      <button
        type="button"
        onFocus={onActivate}
        onClick={onActivate}
        aria-pressed={isActive}
        className="block w-full py-[19px] text-left"
      >
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-[22px] leading-[1.15] text-ink lg:text-[27px]">
            {item.name}
          </span>
          {item.seasonal ? (
            <span
              className="-translate-y-[3px] rounded-[2px] px-[7px] py-[3px] text-[8.5px] font-semibold uppercase tracking-[.16em] text-teal"
              style={{ border: '1px solid rgba(0,112,122,.35)' }}
            >
              Seasonal
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className="mx-1 hidden min-w-6 flex-1 -translate-y-[6px] sm:block"
            style={{ borderBottom: '1px dotted rgba(23,19,15,.3)' }}
          />
          <span className="ml-auto font-display text-[17px] text-body sm:ml-0 lg:text-[20px]">
            {item.price}
          </span>
        </span>
        {item.desc ? (
          <span className="mt-[7px] block max-w-[56ch] text-[13px] leading-[1.6] text-muted lg:text-[14px]">
            {item.desc}
          </span>
        ) : null}
      </button>
    </li>
  );
}

function CategoryBar({
  filter,
  onChange,
  count,
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
  count: number;
}) {
  return (
    <div
      className="sticky top-[78px] z-40 h-[70px] backdrop-blur-[12px]"
      style={{ background: 'rgba(255,253,250,.95)', borderBottom: '1px solid rgba(23,19,15,.10)' }}
    >
      <div className="mx-auto flex h-full max-w-measure items-center justify-between gap-4 px-[var(--gutter)]">
        <div
          className="rail rail-fade flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter the menu by category"
        >
          {categories.map((c) => {
            const on = c === filter;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(c)}
                className="shrink-0 rounded-[2px] px-4 py-[9px] text-[11px] font-semibold uppercase tracking-[.14em] transition-colors duration-[220ms]"
                style={{
                  background: on ? '#00707A' : 'rgba(23,19,15,.05)',
                  color: on ? '#FBF7F1' : '#4A423B',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-5">
          {/* The count is the second, non-colour signal for which filter is on. */}
          <p aria-live="polite" className="hidden text-[10.5px] uppercase tracking-[.14em] text-subtle sm:block">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
          <OrderLink className="btn btn-primary hidden min-h-0 px-4 py-[11px] text-[10.5px] sm:inline-flex">
            Pre-order
          </OrderLink>
        </div>
      </div>
    </div>
  );
}
