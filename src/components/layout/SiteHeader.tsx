import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui";
import { NavLinks } from "./NavLinks";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <GraduationCap size={26} strokeWidth={2.5} />
          </span>
          <span className={styles.wordmark}>
            <span className={styles.name}>escolas</span>
            <span className={styles.tagline}>Diretoria de Ensino · 2026</span>
          </span>
        </Link>
        <NavLinks />
      </Container>
    </header>
  );
}
