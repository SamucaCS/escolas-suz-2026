import {
  Clock,
  Coins,
  Languages,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trees,
} from "lucide-react";
import { Badge, ButtonLink, Card } from "@/components/ui";
import {
  ROTULO_NIVEL,
  ehCel,
  ehIntegral,
  linkMapa,
  niveisOrdenados,
  type Escola,
} from "@/lib/escolas";
import styles from "./CardEscola.module.css";

/** "(011) 4675-1859" -> "tel:+551146751859" */
function linkTelefone(telefone: string) {
  const digitos = telefone.replace(/\D/g, "").replace(/^0/, "");
  return `tel:+55${digitos}`;
}

export function CardEscola({ escola }: { escola: Escola }) {
  return (
    <Card as="li" raised className={styles.card}>
      <div className={styles.badges}>
        <Badge tone={escola.cidade === "Suzano" ? "blue" : "purple"}>
          {escola.cidade}
        </Badge>
        {ehCel(escola) && (
          <Badge tone="yellow" icon={<Languages aria-hidden="true" />}>
            Centro de Línguas
          </Badge>
        )}
        {ehIntegral(escola) && (
          <Badge tone="orange" icon={<Sparkles aria-hidden="true" />}>
            Integral
          </Badge>
        )}
        {escola.ale === "SIM" ? (
          <Badge tone="green" icon={<Coins aria-hidden="true" />}>
            Com ALE
          </Badge>
        ) : (
          <Badge tone="neutral">Sem ALE</Badge>
        )}
        {escola.zona === "RURAL" && (
          <Badge tone="yellow" icon={<Trees aria-hidden="true" />}>
            Zona rural
          </Badge>
        )}
      </div>

      <div className={styles.heading}>
        <h3 className={styles.name}>
          {escola.nome}
        </h3>
        <p className={styles.cie}>CIE {escola.cie}</p>
      </div>

      <ul className={styles.niveis} aria-label="Níveis de ensino">
        {niveisOrdenados(escola).map((nivel) => (
          <li key={nivel}>{ROTULO_NIVEL[nivel]}</li>
        ))}
      </ul>

      <dl className={styles.details}>
        <div className={styles.row}>
          <dt>
            <Clock aria-hidden="true" />
            <span className="visually-hidden">Turnos</span>
          </dt>
          <dd>{escola.turnos}</dd>
        </div>
        <div className={styles.row}>
          <dt>
            <MapPin aria-hidden="true" />
            <span className="visually-hidden">Endereço</span>
          </dt>
          <dd>
            {escola.endereco}, {escola.numero}
            <span className={styles.secondary}>
              {escola.bairro} · Zona {escola.zona.toLowerCase()}
            </span>
          </dd>
        </div>
        {escola.telefones.length > 0 && (
          <div className={styles.row}>
            <dt>
              <Phone aria-hidden="true" />
              <span className="visually-hidden">Telefone</span>
            </dt>
            <dd className={styles.links}>
              {escola.telefones.map((telefone) => (
                <a key={telefone} href={linkTelefone(telefone)}>
                  {telefone}
                </a>
              ))}
            </dd>
          </div>
        )}
        <div className={styles.row}>
          <dt>
            <Mail aria-hidden="true" />
            <span className="visually-hidden">E-mail</span>
          </dt>
          <dd>
            <a href={`mailto:${escola.email}`} className={styles.email}>
              {escola.email}
            </a>
          </dd>
        </div>
      </dl>

      <ButtonLink
        href={linkMapa(escola)}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        fullWidth
        icon={<MapPin size={20} strokeWidth={2.75} aria-hidden="true" />}
        className={styles.action}
        aria-label={`Abrir no mapa: ${escola.nome} (abre em nova aba)`}
      >
        Abrir no mapa
      </ButtonLink>
    </Card>
  );
}
