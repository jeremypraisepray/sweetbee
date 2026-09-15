export type MenuItem = {
  name: string;
  /** Availability, e.g. "Every day", "This week", "Saturday only". */
  tag: string;
  desc: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  /** The italic line beside the list. */
  note: string;
  /** Base name in /public/assets. */
  img: string;
  /** CSS object-position for the category photograph. */
  pos: string;
  /** Italic caption under the photograph. */
  caption: string;
  alt: string;
  items: MenuItem[];
};

/**
 * The menu, and the only place prices appear on the site. Carried over from the
 * previous build and re-cut into four categories — confirm with the client
 * before launch. Editable here without touching layout.
 */
export const menu: MenuCategory[] = [
  {
    id: 'originals',
    label: 'Originals',
    note: 'Always in the case. Three days per batch.',
    img: 'choc-croissants',
    pos: '50% 60%',
    caption: 'Chocolate, bi-color lamination',
    alt: 'A sheet tray of bi-color chocolate croissants, glazed and striped dark against burnished pastry.',
    items: [
      { name: 'Traditional Butter', tag: 'Every day', desc: 'Three days of folding. Nothing added.', price: '$5' },
      { name: 'Chocolate', tag: 'Every day', desc: 'Bi-color dough, Callebaut center.', price: '$6' },
      { name: 'Almond Raspberry', tag: 'Every day', desc: 'Twice baked with frangipane and raspberry gel.', price: '$6' },
      { name: 'Croissant Loaf', tag: 'Saturday only', desc: 'A whole laminated loaf. Six per Saturday.', price: '$14' },
    ],
  },
  {
    id: 'seasonal',
    label: 'Seasonal',
    note: 'Rotates without notice. Gone when it’s gone.',
    img: 'pistachio',
    pos: '50% 50%',
    caption: 'Pistachio cream, this week',
    alt: 'Bi-color pistachio croissants striped green and gold on a sheet tray, dusted with chopped pistachio.',
    items: [
      { name: 'Pistachio Cream', tag: 'This week', desc: 'Pistachio pastry cream, laminated green and gold.', price: '$7' },
      { name: 'Fig & Ricotta', tag: 'This week', desc: 'Whipped ricotta, roasted fig, honey, black pepper.', price: '$7' },
      { name: 'Strawberry Shortcake', tag: 'Under glass', desc: 'Macerated strawberries, vanilla bean cream.', price: '$7' },
    ],
  },
  {
    id: 'savory',
    label: 'Savory',
    note: 'Good at ten in the morning. Better at noon.',
    img: 'crab-rangoon',
    pos: '50% 45%',
    caption: 'Crab rangoon, cooling',
    alt: 'Laminated croissant spirals topped with crab rangoon filling, crisp wonton and sliced green onion.',
    items: [
      { name: 'Ham & Gruyère', tag: 'Every day', desc: 'Béchamel, shaved ham, aged gruyère on top.', price: '$8' },
      { name: 'Crab Rangoon', tag: 'This week', desc: 'Cream cheese, scallion, sweet chili. Yes, really.', price: '$8' },
      { name: 'Pepperoni Hot Honey', tag: 'This week', desc: 'Cup-and-char pepperoni, mozzarella, hot honey.', price: '$8' },
      { name: 'Focaccia Sandwich', tag: 'Every day', desc: 'House focaccia, turkey, herb aioli.', price: '$12' },
    ],
  },
  {
    id: 'sweets',
    label: 'Sweets',
    note: 'For the box on the way out.',
    img: 'macarons',
    pos: '50% 50%',
    caption: 'Macarons, four flavors',
    alt: 'Trays of macaron shells in apricot, lavender and teal speckled with rainbow nonpareils.',
    items: [
      { name: 'Macarons', tag: 'Four flavors', desc: 'Biscoff, coconut ube, birthday cake, chocolate ganache.', price: '$3' },
      { name: 'Buckeye Buns', tag: 'Every day', desc: 'Peanut butter filling, dark chocolate glaze.', price: '$4' },
      { name: 'Cookie of the Week', tag: 'Rotating', desc: 'Whatever Ally can’t stop thinking about.', price: '$4' },
    ],
  },
];
