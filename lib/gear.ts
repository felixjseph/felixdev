export type Gear = {
  slug: string;
  name: string;
  category: string;
  /** One sentence on why this piece earns its place. Keep it to one. */
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
    description:
      "My main machine — the whole stack, and far too many browser tabs.",
    specs: ["Windows", "Primary"],
    image: "/gear/lenovo-loq-15.png",
  },
  {
    slug: "macbook-air-m2",
    name: "MacBook Air M2",
    category: "Laptop",
    description:
      "The one that travels — fanless, so it stays silent anywhere.",
    specs: ["macOS", "Portable"],
    image: "/gear/macbook-air-m2.png",
  },
  {
    slug: "iphone-13",
    name: "iPhone 13",
    category: "Phone",
    description:
      "A test device — a simulator won't catch what real hardware does.",
    specs: ["iOS", "Testing"],
    image: "/gear/iphone-13.png",
  },
  {
    slug: "iphone-17",
    name: "iPhone 17",
    category: "Phone",
    description:
      "My daily phone, and the first place a layout gets checked on mobile.",
    specs: ["iOS", "Daily"],
    image: "/gear/iphone-17.png",
  },
  {
    slug: "logitech-g304",
    name: "Logitech G304",
    category: "Peripheral",
    description:
      "Wireless without the latency, and months of use out of a single AA.",
    specs: ["Wireless", "Mouse"],
    image: "/gear/logitech-g304.png",
  },
  {
    slug: "garuda-gg82g",
    name: "Garuda GG82G Keyboard",
    category: "Peripheral",
    description:
      "No function row, no numpad — the mouse just stays closer.",
    specs: ["Mechanical", "Keyboard"],
    image: "/gear/garuda-gg82g.png",
  },
];
