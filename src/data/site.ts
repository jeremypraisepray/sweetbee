/**
 * Every business fact the site states. Nothing here is inferred.
 */
export const site = {
  name: 'Sweet Bee Bakehouse',
  owner: 'Ally B.',
  established: '2020',
  url: 'https://sweetbeebakehouse.com',
  address: {
    street: '2540 E Broadway St',
    unit: 'Ste A',
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
    'https://www.google.com/maps/search/?api=1&query=Sweet+Bee+Bakehouse%2C+2540+E+Broadway+St+Ste+A%2C+Pearland%2C+TX+77581',
} as const;

/** "2540 E Broadway St, Ste A" — one line. */
export const addressLine = `${site.address.street}, ${site.address.unit}`;
/** "Pearland, TX 77581" */
export const cityLine = `${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export type Hours = {
  day: string;
  short: string;
  open: string;
  schemaDay: string;
  opens: string;
  closes: string;
};

/** Open days only. Everything else is covered by "Otherwise closed". */
export const hours: Hours[] = [
  { day: 'Tuesday', short: 'Tue', open: '10 – 6', schemaDay: 'Tuesday', opens: '10:00', closes: '18:00' },
  { day: 'Thursday', short: 'Thu', open: '10 – 6', schemaDay: 'Thursday', opens: '10:00', closes: '18:00' },
  { day: 'Saturday', short: 'Sat', open: '10 – 4', schemaDay: 'Saturday', opens: '10:00', closes: '16:00' },
];

/** The hero's one-line version of the same fact. */
export const hoursLine = 'Tuesday & Thursday 10–6 · Saturday 10–4';
export const hoursLineShort = 'Tue & Thu 10–6 · Sat 10–4';

/**
 * Press. Both lines are placeholders pending client confirmation — they carry
 * no URL, so the rows render as plain text rather than as linked citations.
 */
export const press: { pub: string; award: string; url?: string; confirmed: boolean }[] = [
  { pub: 'CultureMap', award: 'Tastemaker Awards 2026', confirmed: false },
  { pub: 'Texas Monthly', award: 'The 50 Best Bakeries in Texas', confirmed: false },
];
