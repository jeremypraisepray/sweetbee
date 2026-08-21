export type Category = 'Originals' | 'Seasonal' | 'Sweets';

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  cat: Category;
  desc: string;
  /** Base name in /public/assets, or null where no photograph exists yet. */
  img: string | null;
  seasonal?: boolean;
  alt?: string;
};

/**
 * The case, as it stands. Prices and descriptions are the client's own.
 * Roughly half the items have no photograph yet — that is expected, and the
 * menu panel has a designed fallback for it. Do not source stand-in imagery.
 */
export const menuItems: MenuItem[] = [
  { id: 'butter', name: 'Traditional Butter', price: '$5.00', cat: 'Originals', desc: 'The OG croissant.', img: null },
  { id: 'choc', name: 'Chocolate', price: '$6.00', cat: 'Originals', desc: 'Bi-color chocolate croissant with a Callebaut chocolate center.', img: 'choc-croissants', alt: 'A sheet tray of bi-color chocolate croissants, glazed and striped dark against burnished pastry.' },
  { id: 'almond', name: 'Almond Raspberry', price: '$6.00', cat: 'Originals', desc: 'Twice baked, almond frangipane and raspberry gel.', img: null },
  { id: 'guava', name: 'Guava Cream Cheese', price: '$5.00', cat: 'Originals', desc: 'Cuban pastelito inspired guava and cream cheese.', img: null },
  { id: 'ham', name: 'Ham & Cheese', price: '$6.00', cat: 'Originals', desc: 'Smoked honey ham, Colby Jack, parmesan and sesame seeds.', img: null },
  { id: 'cinn', name: 'Cinnamon Roll', price: '$6.00', cat: 'Originals', desc: 'Cinnamon brown sugar swirl with vanilla cream cheese icing.', img: null },

  { id: 'crab', name: 'Crab Rangoon', price: '$7.00', cat: 'Seasonal', desc: 'Shredded imitation crab, cream cheese, wonton and green onion.', img: 'crab-rangoon', seasonal: true, alt: 'Laminated croissant spirals topped with crab rangoon filling, crisp wonton and sliced green onion.' },
  { id: 'fig', name: 'Fig & Ricotta', price: '$6.25', cat: 'Seasonal', desc: 'Black Forest ham, ricotta, fresh herbs and sweet fig jam.', img: 'fig-ricotta', seasonal: true, alt: 'Croissant swirls filled with whipped ricotta, fig jam and chopped fresh herbs.' },
  { id: 'pist', name: 'Pistachio Cream', price: '$7.00', cat: 'Seasonal', desc: 'Green bi-color croissant with pistachio mascarpone filling.', img: 'pistachio', seasonal: true, alt: 'Bi-color pistachio croissants striped green and gold on a sheet tray, dusted with chopped pistachio.' },
  { id: 'bano', name: 'Banoffee', price: '$7.00', cat: 'Seasonal', desc: 'Graham cracker, bananas, dulce de leche and chocolate ganache.', img: null, seasonal: true },
  { id: 'pep', name: 'Pepperoni Hot Honey', price: '$6.00', cat: 'Seasonal', desc: 'Marinara, herbs, pepperoni, mozzarella and hot honey.', img: null, seasonal: true },
  { id: 'rasp', name: 'Raspberry Pain Suisse', price: '$7.00', cat: 'Seasonal', desc: 'Raspberry couverture chocolate and pastry cream filled.', img: null, seasonal: true },
  { id: 'turk', name: 'Turkey Sandwich', price: '$8.00', cat: 'Seasonal', desc: 'Turkey, smoked gouda, garlic aioli, caramelized onions and arugula.', img: 'sandwiches', seasonal: true, alt: 'Turkey sandwiches on thick-cut brioche pullman, stacked on a sheet tray with arugula showing at the edges.' },

  { id: 'straw', name: 'Strawberry Shortcake', price: '$7.00', cat: 'Sweets', desc: '', img: null },
  { id: 'buck', name: 'Buckeye Bun', price: '$5.00', cat: 'Sweets', desc: 'Peanut butter and chocolate.', img: 'buckeye-buns', alt: 'Round brioche buns capped with dark chocolate glaze and a fine peanut butter drizzle.' },
  { id: 'tres', name: 'Traditional Tres Leches', price: '$6.00', cat: 'Sweets', desc: '', img: null },
  { id: 'oreo', name: 'Oreo Chocolate Cookie', price: '$4.00', cat: 'Sweets', desc: '', img: null },
  { id: 'snick', name: 'Peanut Butter Snickerdoodle', price: '$4.00', cat: 'Sweets', desc: '', img: null },
  { id: 'triple', name: 'Triple Chocolate Cookie', price: '$4.00', cat: 'Sweets', desc: '', img: null },
  { id: 'scone', name: 'Tomato Jam Scone', price: '$4.00', cat: 'Sweets', desc: '', img: null },
  { id: 'alfa', name: 'Alfajores', price: '$2.00', cat: 'Sweets', desc: '', img: null },
  { id: 'pump', name: 'Pumpkin Muffin', price: '$5.50', cat: 'Sweets', desc: '', img: null },
  { id: 'bpud', name: 'Banana Pudding', price: '$6.00', cat: 'Sweets', desc: '', img: null },
  { id: 'garlic', name: 'Garlic Cheesy Bread', price: '$5.00', cat: 'Sweets', desc: '', img: null },
  { id: 'monkey', name: 'Monkey Bread', price: '$5.00', cat: 'Sweets', desc: '', img: null },
  { id: 'mac', name: 'Macarons', price: '$14 / $24', cat: 'Sweets', desc: 'Half dozen or dozen. Biscoff cookie butter, coconut ube, birthday cake, chocolate ganache.', img: 'macarons', alt: 'Trays of macaron shells in apricot, lavender and teal speckled with rainbow nonpareils.' },
];

export const categories = ['All', 'Originals', 'Seasonal', 'Sweets'] as const;
export type Filter = (typeof categories)[number];

export const groups: { title: string; cat: Category }[] = [
  { title: 'Croissants — Originals', cat: 'Originals' },
  { title: 'Croissants — Seasonal', cat: 'Seasonal' },
  { title: 'Sweets', cat: 'Sweets' },
];

export const byId = (id: string) => menuItems.find((i) => i.id === id);

/** Category shown on a label. Non-seasonal originals read "Original". */
export const labelCat = (i: MenuItem) => (i.cat === 'Originals' ? 'Original' : i.cat);

/* ---- Editable in one place each ------------------------------------- */

/** The weekly line in the teal band under the hero. Client edits this. */
export const inTheCaseToday: string[] = [
  'Pistachio Cream',
  'Crab Rangoon',
  'Banoffee',
  'Alfajores',
  'Tomato Jam Scone',
];

/** The six-item Home rail, in order. Widths are the comps' staggered crops. */
export const caseRail: { id: string; w: number; h: number }[] = [
  { id: 'pist', w: 392, h: 522 },
  { id: 'choc', w: 308, h: 412 },
  { id: 'crab', w: 344, h: 344 },
  { id: 'buck', w: 368, h: 462 },
  { id: 'mac', w: 280, h: 374 },
  { id: 'fig', w: 332, h: 436 },
];

/** Curated by Ally, not a bestseller widget. Heights are the comps'. */
export const currentFavorites: { id: string; h: number }[] = [
  { id: 'crab', h: 520 },
  { id: 'buck', h: 404 },
  { id: 'pist', h: 600 },
];

/**
 * Press. Titles, dates and URLs are unconfirmed, so each entry carries
 * `confirmed: false` and the section renders a visible note instead of
 * dressing them up as citations. Add `url` to turn a row into a link.
 */
export const press: { outlet: string; context: string; url?: string; confirmed: boolean }[] = [
  {
    outlet: 'CultureMap Houston',
    context: "Tastemaker Awards recognition — Houston's pastry corner of the map, with Pearland on it.",
    confirmed: false,
  },
  {
    outlet: 'Texas Monthly',
    context: 'Named among the bakeries worth the drive — which, for a lot of you, it is.',
    confirmed: false,
  },
];
