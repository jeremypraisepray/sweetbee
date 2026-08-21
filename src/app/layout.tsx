import type { Metadata, Viewport } from 'next';
import { Newsreader, Archivo } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { bakerySchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  // Only the weights the type scale uses: 300 for the statement, 400 everywhere
  // else, each with its italic. Every extra axis value is bytes on the phone.
  weight: ['300', '400'],
  variable: '--font-newsreader',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Croissants in Pearland, Texas`,
    template: `%s — ${site.name}`,
  },
  description:
    'A croissant-focused bakehouse on Broadway in Pearland, Texas. Three-day laminated dough, seasonal flavors that rotate without warning, Thursday through Saturday until the trays are empty.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: `${site.name} — Croissants in Pearland, Texas`,
    description:
      'Three-day laminated dough, seasonal flavors that rotate without warning. Thursday through Saturday in Pearland, Texas.',
    images: [{ url: '/assets/pistachio-1000.jpg', width: 1000, height: 1333, alt: 'Bi-color pistachio croissants on a sheet tray' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#FBF7F1' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${archivo.variable}`}>
      <head>
        <JsonLd data={bakerySchema} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
