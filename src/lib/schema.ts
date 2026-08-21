import { site, hours } from '@/data/site';
import { menuItems, groups } from '@/data/menu';

const priceNumber = (p: string) => {
  const m = p.match(/\$([\d.]+)/);
  return m ? m[1] : undefined;
};

export const bakerySchema = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  '@id': `${site.url}/#bakery`,
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/pistachio-1000.jpg`,
  servesCuisine: 'Bakery',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.unit}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'US',
  },
  // Only the days the bakery is actually open are declared.
  openingHoursSpecification: hours
    .filter((h) => !h.closed)
    .map((h) => ({
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
  hasMenuSection: groups.map((g) => ({
    '@type': 'MenuSection',
    name: g.title,
    hasMenuItem: menuItems
      .filter((i) => i.cat === g.cat)
      .map((i) => ({
        '@type': 'MenuItem',
        name: i.name,
        ...(i.desc ? { description: i.desc } : {}),
        ...(priceNumber(i.price)
          ? { offers: { '@type': 'Offer', price: priceNumber(i.price), priceCurrency: 'USD' } }
          : {}),
      })),
  })),
};
