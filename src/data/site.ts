/**
 * Every business fact the site states. Nothing here is inferred — email and
 * phone stay null until the client confirms them, and the UI renders the
 * placeholder rather than inventing contact details.
 */
export const site = {
  name: 'Sweet Bee Bakehouse',
  tagline: 'A bakehouse in Pearland, Texas',
  owner: 'Ally',
  url: 'https://sweetbeebakehouse.com',
  address: {
    street: '2540 E Broadway St.',
    unit: 'Suite A',
    city: 'Pearland',
    region: 'TX',
    postalCode: '77581',
  },
  /** Not confirmed by the client. Do not fill these in without them. */
  email: null as string | null,
  phone: null as string | null,
  hotplate: 'https://www.hotplate.com/sweetbeebakehouse',
  instagram: 'https://www.instagram.com/sweetbeebakehouse/',
  directions:
    'https://www.google.com/maps/search/?api=1&query=Sweet+Bee+Bakehouse%2C+2540+E+Broadway+St+Suite+A%2C+Pearland%2C+TX+77581',
} as const;

export const addressLine = `${site.address.street}, ${site.address.unit}`;
export const cityLine = `${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export type Hours = { day: string; open: string; closed?: boolean; schemaDay?: string[]; opens?: string; closes?: string };

/** Closed days are stated, never omitted. */
export const hours: Hours[] = [
  { day: 'Thursday', open: '10 – 6', schemaDay: ['Thursday'], opens: '10:00', closes: '18:00' },
  { day: 'Friday', open: '10 – 6', schemaDay: ['Friday'], opens: '10:00', closes: '18:00' },
  { day: 'Saturday', open: '10 – 4', schemaDay: ['Saturday'], opens: '10:00', closes: '16:00' },
  { day: 'Sun – Wed', open: 'Closed', closed: true },
];
