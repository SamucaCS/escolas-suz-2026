"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, School } from "lucide-react";
import styles from "./SiteHeader.module.css";

const LINKS = [
  { href: "/", label: "Escolas", icon: School },
  { href: "/design-system/", label: "Design system", icon: Palette },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal">
      <ul className={styles.nav}>
        {LINKS.map(({ href, label, icon: Icon }) => {
          const ativo =
            href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1));
          return (
            <li key={href}>
              <Link
                href={href}
                className={styles.navLink}
                aria-current={ativo ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
