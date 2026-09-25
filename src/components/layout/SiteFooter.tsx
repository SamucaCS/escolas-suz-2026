import { Container } from "@/components/ui";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>
          <strong>Escolas Estaduais · Diretoria de Ensino</strong>
          <br />
          Suzano e Ferraz de Vasconcelos — Atribuição 2026
        </p>
        <p className={styles.note}>
          Confirme horários e contatos diretamente com a escola.
        </p>
      </Container>
    </footer>
  );
}
