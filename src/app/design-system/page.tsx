import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Coins,
  Heart,
  Layers,
  MapPin,
  Palette,
  Search,
  SearchX,
  Sparkles,
  Star,
  Trees,
  Type,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Container,
  EmptyState,
  Field,
  Input,
  ProgressBar,
  Select,
  Stat,
  type Tone,
} from "@/components/ui";
import { ChipGroupDemo, ProgressDemo } from "./Demos";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Tokens e componentes do portal, inspirados na linguagem visual do Duolingo.",
};

const PRINCIPIOS = [
  {
    icon: Palette,
    tone: "green" as Tone,
    titulo: "Cores chapadas",
    texto: "Verde, azul, amarelo e vermelho vivos, sem gradientes.",
  },
  {
    icon: Layers,
    tone: "blue" as Tone,
    titulo: "Profundidade 3D",
    texto: "Botões e chips têm uma borda inferior que “afunda” ao clicar.",
  },
  {
    icon: Type,
    tone: "orange" as Tone,
    titulo: "Fonte redonda",
    texto: "Nunito em pesos fortes (700–900) para títulos e botões.",
  },
  {
    icon: Heart,
    tone: "red" as Tone,
    titulo: "Tom amigável",
    texto: "Cantos bem arredondados, textos curtos e diretos.",
  },
];

const CORES_MARCA = [
  { nome: "primary", rotulo: "Primária (verde)" },
  { nome: "secondary", rotulo: "Secundária (azul)" },
  { nome: "danger", rotulo: "Perigo (vermelho)" },
  { nome: "warning", rotulo: "Atenção (amarelo)" },
  { nome: "orange", rotulo: "Laranja" },
  { nome: "purple", rotulo: "Roxo" },
];

const CORES_NEUTRAS = [
  "bg",
  "bg-subtle",
  "border",
  "border-strong",
  "text-muted",
  "text",
  "text-strong",
];

const TIPOGRAFIA = [
  { token: "3xl", peso: "black", exemplo: "Título de página" },
  { token: "2xl", peso: "extrabold", exemplo: "Título de seção" },
  { token: "xl", peso: "extrabold", exemplo: "Subtítulo" },
  { token: "lg", peso: "bold", exemplo: "Texto de destaque" },
  { token: "md", peso: "regular", exemplo: "Texto padrão do corpo" },
  { token: "sm", peso: "bold", exemplo: "Rótulos e legendas" },
  { token: "xs", peso: "extrabold", exemplo: "BADGES E DETALHES" },
];

const TONS: Tone[] = ["green", "blue", "red", "yellow", "orange", "purple", "neutral"];

function Secao({
  id,
  titulo,
  descricao,
  codigo,
  children,
}: {
  id: string;
  titulo: string;
  descricao: string;
  codigo?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-titulo`}>
      <header className={styles.sectionHeader}>
        <h2 id={`${id}-titulo`}>{titulo}</h2>
        <p>{descricao}</p>
      </header>
      <Card padding="lg" className={styles.demo}>
        {children}
      </Card>
      {codigo && (
        <pre className={styles.code}>
          <code>{codigo}</code>
        </pre>
      )}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <section className={styles.intro}>
        <Container className={styles.introInner}>
          <Badge tone="blue">Design system</Badge>
          <h1>Blocos de construção do portal</h1>
          <p>
            Tokens e componentes em React inspirados na linguagem visual do
            Duolingo. Tudo fica em <code>src/components/ui</code> e{" "}
            <code>src/styles/tokens.css</code>. O tema escuro acompanha a
            preferência do sistema.
          </p>
          <ul className={styles.principles}>
            {PRINCIPIOS.map(({ icon: Icon, tone, titulo, texto }) => (
              <li key={titulo}>
                <Stat
                  tone={tone}
                  icon={<Icon strokeWidth={2.5} />}
                  value={<span className={styles.principleTitle}>{titulo}</span>}
                  label={texto}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className={styles.content}>
        <Secao
          id="cores"
          titulo="Cores"
          descricao="Cada cor de marca tem cinco tokens: base, shadow (a borda 3D), soft (fundos suaves), text (texto legível) e on (texto sobre a base)."
          codigo={`background: var(--color-primary);\nbox-shadow: 0 var(--press-depth) 0 var(--color-primary-shadow);`}
        >
          <ul className={styles.swatches}>
            {CORES_MARCA.map((cor) => (
              <li key={cor.nome} className={styles.swatch}>
                <span
                  className={styles.swatchColor}
                  style={{
                    background: `var(--color-${cor.nome})`,
                    boxShadow: `0 4px 0 var(--color-${cor.nome}-shadow)`,
                  }}
                />
                <span className={styles.swatchSoft}>
                  <span
                    style={{
                      background: `var(--color-${cor.nome}-soft)`,
                      color: `var(--color-${cor.nome}-text)`,
                    }}
                  >
                    Aa
                  </span>
                </span>
                <strong>{cor.rotulo}</strong>
                <code>--color-{cor.nome}</code>
              </li>
            ))}
          </ul>
          <h3 className={styles.subheading}>Neutros</h3>
          <ul className={styles.neutrals}>
            {CORES_NEUTRAS.map((nome) => (
              <li key={nome}>
                <span style={{ background: `var(--color-${nome})` }} />
                <code>--color-{nome}</code>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao
          id="tipografia"
          titulo="Tipografia"
          descricao="Nunito, uma fonte arredondada e gratuita. Pesos altos deixam a interface amigável e fácil de escanear."
          codigo={`font-size: var(--font-size-lg);\nfont-weight: var(--font-weight-extrabold);`}
        >
          <ul className={styles.typeScale}>
            {TIPOGRAFIA.map(({ token, peso, exemplo }) => (
              <li key={token}>
                <code>
                  {token} · {peso}
                </code>
                <span
                  style={{
                    fontSize: `var(--font-size-${token})`,
                    fontWeight: `var(--font-weight-${peso})`,
                  }}
                >
                  {exemplo}
                </span>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao
          id="botoes"
          titulo="Botões"
          descricao="Texto em caixa alta e borda inferior sólida. Ao pressionar, o botão desce até a sombra. Use ButtonLink para links."
          codigo={`<Button variant="secondary" size="lg" icon={<MapPin />}>Abrir no mapa</Button>`}
        >
          <div className={styles.stack}>
            <div className={styles.inline}>
              <Button>Continuar</Button>
              <Button variant="secondary">Abrir no mapa</Button>
              <Button variant="danger">Excluir</Button>
              <Button variant="warning">Atenção</Button>
              <Button variant="neutral">Pular</Button>
              <Button variant="ghost">Cancelar</Button>
            </div>
            <div className={styles.inline}>
              <Button size="sm">Pequeno</Button>
              <Button size="md">Médio</Button>
              <Button size="lg">Grande</Button>
              <Button
                variant="secondary"
                icon={<MapPin size={20} strokeWidth={2.75} aria-hidden="true" />}
              >
                Com ícone
              </Button>
              <Button disabled>Desabilitado</Button>
            </div>
          </div>
        </Secao>

        <Secao
          id="badges"
          titulo="Badges"
          descricao="Rótulos curtos para status e categorias, com fundo suave e texto em contraste AA."
          codigo={`<Badge tone="orange" icon={<Sparkles />}>Integral</Badge>`}
        >
          <div className={styles.stack}>
            <div className={styles.inline}>
              {TONS.map((tone) => (
                <Badge key={tone} tone={tone}>
                  {tone}
                </Badge>
              ))}
            </div>
            <div className={styles.inline}>
              <Badge tone="orange" icon={<Sparkles aria-hidden="true" />}>
                Integral
              </Badge>
              <Badge tone="green" icon={<Coins aria-hidden="true" />}>
                Com ALE
              </Badge>
              <Badge tone="yellow" icon={<Trees aria-hidden="true" />}>
                Zona rural
              </Badge>
              <Badge tone="blue" icon={<Star aria-hidden="true" />}>
                Novo
              </Badge>
            </div>
          </div>
        </Secao>

        <Secao
          id="formulario"
          titulo="Formulário"
          descricao="Campos com fundo cinza claro que ficam brancos com borda azul no foco. Os chips são radios nativos, então funcionam com teclado."
          codigo={`<Field label="Buscar" htmlFor="busca">\n  <Input id="busca" icon={<Search />} />\n</Field>`}
        >
          <div className={styles.formGrid}>
            <Field label="Buscar escola" htmlFor="ds-busca" hint="Nome, bairro ou CIE">
              <Input
                id="ds-busca"
                type="search"
                placeholder="Ex.: Raul Brasil"
                icon={<Search strokeWidth={2.5} />}
              />
            </Field>
            <Field label="Cidade" htmlFor="ds-cidade">
              <Select id="ds-cidade" defaultValue="Suzano">
                <option>Suzano</option>
                <option>Ferraz de Vasconcelos</option>
              </Select>
            </Field>
          </div>
          <ChipGroupDemo />
        </Secao>

        <Secao
          id="progresso"
          titulo="Barra de progresso"
          descricao="Grossa, arredondada e com uma faixa de brilho. Clique em Verificar para ver a animação."
          codigo={`<ProgressBar value={3} max={5} label="Progresso da lição" />`}
        >
          <div className={styles.stack}>
            <ProgressDemo />
            <ProgressBar value={80} label="Exemplo azul" tone="blue" />
            <ProgressBar value={55} label="Exemplo amarelo" tone="yellow" />
            <ProgressBar value={30} label="Exemplo laranja" tone="orange" />
          </div>
        </Secao>

        <Secao
          id="cards"
          titulo="Cards e estatísticas"
          descricao="Superfícies com borda de 2px e cantos de 16px. Use raised para cards clicáveis ou em destaque."
          codigo={`<Card raised>…</Card>\n<Stat tone="blue" icon={<MapPin />} value={46} label="escolas em Suzano" />`}
        >
          <div className={styles.cardGrid}>
            <Card>
              <h3 className={styles.cardTitle}>Card padrão</h3>
              <p className={styles.muted}>Borda simples, sem profundidade.</p>
            </Card>
            <Card raised>
              <h3 className={styles.cardTitle}>Card raised</h3>
              <p className={styles.muted}>Borda 3D e leve elevação no hover.</p>
            </Card>
            <Stat
              tone="blue"
              icon={<MapPin strokeWidth={2.5} />}
              value={46}
              label="escolas em Suzano"
            />
            <Stat
              tone="orange"
              icon={<Sparkles strokeWidth={2.5} />}
              value="7 dias"
              label="de ofensiva"
            />
          </div>
        </Secao>

        <Secao
          id="vazio"
          titulo="Estado vazio"
          descricao="Quando não há resultados, explique o motivo e ofereça uma saída."
        >
          <EmptyState
            icon={<SearchX strokeWidth={2.5} />}
            title="Nenhuma escola encontrada"
            description="Tente buscar por outro nome ou remover algum filtro."
            action={<Button variant="secondary">Limpar filtros</Button>}
          />
        </Secao>
      </Container>
    </>
  );
}
