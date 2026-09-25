import type { Metadata } from "next";
import { House, MapPinOff } from "lucide-react";
import { ButtonLink, Container, EmptyState } from "@/components/ui";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <Container className={styles.wrapper}>
      <EmptyState
        icon={<MapPinOff strokeWidth={2.5} />}
        title="Página não encontrada"
        description="O endereço pode estar errado ou a página não existe mais."
        action={
          <ButtonLink
            href="/"
            icon={<House size={20} strokeWidth={2.75} aria-hidden="true" />}
          >
            Voltar ao início
          </ButtonLink>
        }
      />
    </Container>
  );
}
