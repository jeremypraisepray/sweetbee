import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk, Newsreader } from 'next/font/google';
import { bakerySchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import './globals.css';

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-schibsted',
  display: 'swap',
});

// Italic only — the roman face is never used. The optical-size axis rides along
// so the 70px statement and the 14px caption are cut differently.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Croissants in Pearland, Texas`,
    template: `%s — ${site.name}`,
  },
  description:
    'A croissant-focused bakehouse on Broadway in Pearland, Texas. Three days per batch of dough, a small case, and a menu that changes without warning. Tuesday, Thursday and Saturday.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: `${site.name} — Croissants in Pearland, Texas`,
    description:
      'Three days per batch of dough, a small case, and a menu that changes without warning. Pearland, Texas.',
    images: [
      {
        url: '/assets/choc-croissants-1000.jpg',
        width: 1000,
        height: 1333,
        alt: 'Bi-color chocolate croissants on a sheet tray',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#1D1C19' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${newsreader.variable}`}>
      <head>
        <JsonLd data={bakerySchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
