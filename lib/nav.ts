export type NavItem = {
  /** Landing-page section id, used for scroll-spy while on "/". */
  sectionId: string | null;
  /**
   * Standalone route that should mark this item active when it's the current
   * pathname. Blog owns both a landing section and a full page, so it has
   * both — the link goes to the section, but /blog still lights it up.
   */
  route: string | null;
  href: string;
  label: string;
};

// Order mirrors the landing page top-to-bottom, then standalone pages.
// The rail renders one indicator bar per entry, in this order.
export const navItems: NavItem[] = [
  { sectionId: "top", route: null, href: "/#top", label: "Intro" },
  { sectionId: "blog", route: "/blog", href: "/#blog", label: "Blog" },
  { sectionId: "work", route: null, href: "/#work", label: "Projects" },
  {
    sectionId: "experience",
    route: null,
    href: "/#experience",
    label: "Experience",
  },
  { sectionId: "gear", route: null, href: "/#gear", label: "Gear" },
  {
    sectionId: "certifications",
    route: null,
    href: "/#certifications",
    label: "Certifications",
  },
];
