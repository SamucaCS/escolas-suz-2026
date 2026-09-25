import { ArrowDown, Coins, MapPin, School, Sparkles } from "lucide-react";
import { PortalEscolas } from "@/components/escolas/PortalEscolas";
import { Badge, ButtonLink, Container, Stat } from "@/components/ui";
import { escolas } from "@/data/escolas";
import { ehIntegral } from "@/lib/escolas";
import styles from "./page.module.css";

export default function Home() {
  const total = escolas.length;
  const suzano = escolas.filter((e) => e.cidade === "Suzano").length;
  const ferraz = escolas.filter((e) => e.cidade === "Ferraz de Vasconcelos").length;
  const integrais = escolas.filter(ehIntegral).length;
  const comAle = escolas.filter((e) => e.ale === "SIM").length;

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroText}>
            <Badge tone="green">Atribuição 2026</Badge>
            <h1 className={styles.heroTitle}>
              Encontre a escola certa para <span>você</span>
            </h1>
            <p className={styles.heroLead}>
              Todas as {total} escolas estaduais de Suzano e Ferraz de
              Vasconcelos em um só lugar: níveis de ensino, turnos, endereço e
              contatos.
            </p>
            <ButtonLink
              href="#escolas"
              size="lg"
              icon={<ArrowDown size={22} strokeWidth={3} aria-hidden="true" />}
              className={styles.heroCta}
            >
              Ver escolas
            </ButtonLink>
          </div>

          <div className={styles.stats}>
            <Stat
              tone="blue"
              icon={<MapPin strokeWidth={2.5} />}
              value={suzano}
              label="escolas em Suzano"
            />
            <Stat
              tone="purple"
              icon={<School strokeWidth={2.5} />}
              value={ferraz}
              label="em Ferraz de Vasconcelos"
            />
            <Stat
              tone="orange"
              icon={<Sparkles strokeWidth={2.5} />}
              value={integrais}
              label="no Programa Integral"
            />
            <Stat
              tone="green"
              icon={<Coins strokeWidth={2.5} />}
              value={comAle}
              label="com ALE"
            />
          </div>
        </Container>
      </section>

      <section id="escolas" className={styles.results} aria-label="Lista de escolas">
        <Container>
          <PortalEscolas escolas={escolas} />
        </Container>
      </section>
    </>
  );
}
