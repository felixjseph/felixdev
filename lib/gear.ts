export type Gear = {
  slug: string;
  name: string;
  category: string;
  /** Placeholder copy — replace with real notes on why each piece earns its place. */
  description: string;
  specs: string[];
};

export const gear: Gear[] = [
  {
    slug: "lenovo-loq-15",
    name: "Lenovo LOQ 15",
    category: "Laptop",
    description: "Placeholder — what this machine handles day to day.",
    specs: ["Windows", "Primary"],
  },
  {
    slug: "macbook-air-m2",
    name: "MacBook Air M2",
    category: "Laptop",
    description: "Placeholder — what this machine handles day to day.",
    specs: ["macOS", "Portable"],
  },
  {
    slug: "iphone-13",
    name: "iPhone 13",
    category: "Phone",
    description: "Placeholder — how this fits the day-to-day setup.",
    specs: ["iOS", "Testing"],
  },
  {
    slug: "iphone-17",
    name: "iPhone 17",
    category: "Phone",
    description: "Placeholder — how this fits the day-to-day setup.",
    specs: ["iOS", "Daily"],
  },
  {
    slug: "logitech-g304",
    name: "Logitech G304",
    category: "Peripheral",
    description: "Placeholder — notes on feel, battery, and why it stuck.",
    specs: ["Wireless", "Mouse"],
  },
  {
    slug: "garuda-gg82g",
    name: "Garuda GG82G Keyboard",
    category: "Peripheral",
    description: "Placeholder — notes on switches, layout, and typing feel.",
    specs: ["Mechanical", "Keyboard"],
  },
];
