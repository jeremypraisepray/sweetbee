import { site, hours } from '@/data/site';
import { menu } from '@/data/menu';

const priceNumber = (p: string) => p.match(/\$([\d.]+)/)?.[1];

export const bakerySchema = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  '@id': `${site.url}/#bakery`,
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/choc-croissants-1000.jpg`,
  servesCuisine: 'Bakery',
  priceRange: '$$',
  foundingDate: site.established,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.unit}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'US',
  },
  // Only the days the bakery is actually open are declared.
  openingHoursSpecification: hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.schemaDay,
    opens: h.opens,
    closes: h.closes,
  })),
  hasMenu: `${site.url}/menu`,
  sameAs: [site.instagram],
};

export const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${site.url}/menu#menu`,
  name: `${site.name} menu`,
  url: `${site.url}/menu`,
  hasMenuSection: menu.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.label,
    description: cat.note,
    hasMenuItem: cat.items.map((i) => ({
      '@type': 'MenuItem',
      name: i.name,
      description: i.desc,
      ...(priceNumber(i.price)
        ? { offers: { '@type': 'Offer', price: priceNumber(i.price), priceCurrency: 'USD' } }
        : {}),
    })),
  })),
};
