export type Gear = {
  slug: string;
  name: string;
  category: string;
  /** Placeholder copy — replace with real notes on why each piece earns its place. */
  description: string;
  specs: string[];
  /**
   * Product shot under /public/gear, exported 4:3 to match the card's image
   * well. Omit and the card falls back to the name as placeholder art.
   */
  image?: string;
};

export const gear: Gear[] = [
  {
    slug: "lenovo-loq-15",
    name: "Lenovo LOQ 15",
    category: "Laptop",
    description: "Placeholder — what this machine handles day to day.",
    specs: ["Windows", "Primary"],
    image: "/gear/lenovo-loq-15.png",
  },
  {
    slug: "macbook-air-m2",
    name: "MacBook Air M2",
    category: "Laptop",
    description: "Placeholder — what this machine handles day to day.",
    specs: ["macOS", "Portable"],
    image: "/gear/macbook-air-m2.png",
  },
  {
    slug: "iphone-13",
    name: "iPhone 13",
    category: "Phone",
    description: "Placeholder — how this fits the day-to-day setup.",
    specs: ["iOS", "Testing"],
    image: "/gear/iphone-13.png",
  },
  {
    slug: "iphone-17",
    name: "iPhone 17",
    category: "Phone",
    description: "Placeholder — how this fits the day-to-day setup.",
    specs: ["iOS", "Daily"],
    image: "/gear/iphone-17.png",
  },
  {
    slug: "logitech-g304",
    name: "Logitech G304",
    category: "Peripheral",
    description: "Placeholder — notes on feel, battery, and why it stuck.",
    specs: ["Wireless", "Mouse"],
    image: "/gear/logitech-g304.png",
  },
  {
    slug: "garuda-gg82g",
    name: "Garuda GG82G Keyboard",
    category: "Peripheral",
    description: "Placeholder — notes on switches, layout, and typing feel.",
    specs: ["Mechanical", "Keyboard"],
    image: "/gear/garuda-gg82g.png",
  },
];
