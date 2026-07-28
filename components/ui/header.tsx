import Link from "next/link";
import { DrawRule } from "@/components/ui/draw-rule";
import { FadeUp } from "@/components/ui/fade-up";
import { NavLink } from "@/components/ui/nav-link";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/gear", label: "Gear" },
] as const;

export function Header() {
  return (
    <header className="mx-auto w-[80%]">
      <FadeUp delay={0}>
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="font-display text-lg font-medium text-ink">
            Felix Castañeda
          </Link>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </FadeUp>
      <DrawRule delay={125} />
    </header>
  );
}
