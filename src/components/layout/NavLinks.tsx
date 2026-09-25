"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { School } from "lucide-react";
import styles from "./SiteHeader.module.css";

const LINKS = [{ href: "/", label: "Escolas", icon: School }];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal">
      <ul className={styles.nav}>
        {LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={styles.navLink}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
