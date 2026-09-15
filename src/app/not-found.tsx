import Link from 'next/link';
import type { Metadata } from 'next';
import { Wordmark } from '@/components/Wordmark';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-10 bg-ink px-[var(--gutter)] py-24 text-center text-canvas">
      <Link href="/" aria-label={`${site.name} — home`}>
        <Wordmark variant="light" height={44} className="lg:!h-[58px]" alt={site.name} priority />
      </Link>

      <div>
        <h1 className="statement text-[32px] leading-[1.15] lg:text-[46px]">
          That one&rsquo;s gone.
        </h1>
        <p className="mx-auto mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-dark-lede lg:text-[16px]">
          Like most things in the case. The page you were after isn&rsquo;t here — try the menu, or
          start again from the beginning.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <Link href="/menu" className="rule-link border-gold text-canvas transition-colors hover:text-gold">
          See the menu
        </Link>
        <Link href="/" className="rule-link border-gold text-canvas transition-colors hover:text-gold">
          Back home
        </Link>
      </div>
    </main>
  );
}
