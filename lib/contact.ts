export type ContactLink = {
  href: string;
  label: string;
};

export const EMAIL = "felixjosephcastaneda@gmail.com";

export const socialLinks: ContactLink[] = [
  { href: "https://github.com/felixjseph", label: "GitHub" },
  { href: "https://www.linkedin.com/in/felixjseph/", label: "LinkedIn" },
  { href: "https://www.instagram.com/felixjseph/", label: "Instagram" },
  { href: "https://www.facebook.com/felixjseph/", label: "Facebook" },
];

// The subset surfaced in the hero — professional channels only, kept short
// so the hero doesn't turn into a link farm. Footer shows all of them.
export const primaryContactLinks: ContactLink[] = [
  { href: `mailto:${EMAIL}`, label: "Email" },
  { href: "https://github.com/felixjseph", label: "GitHub" },
  { href: "https://www.linkedin.com/in/felixjseph/", label: "LinkedIn" },
];
