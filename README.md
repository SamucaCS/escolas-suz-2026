# Portal de Escolas · Atribuição 2026

Consulta das escolas estaduais de **Suzano** e **Ferraz de Vasconcelos** (Diretoria de Ensino): níveis de ensino, turnos, endereço e contatos, com busca e filtros.

Feito com **Next.js (App Router) + React + TypeScript** e um design system próprio inspirado na linguagem visual do **Duolingo**. O site é exportado como HTML estático e publicado no GitHub Pages.

## Como rodar

Requer Node.js 20.9 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando             | O que faz                                            |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com recarga automática   |
| `npm run build`     | Gera o site estático na pasta `out/`                 |
| `npm run preview`   | Serve a pasta `out/` localmente para conferir o build |
| `npm run lint`      | ESLint                                               |
| `npm run typecheck` | Verificação de tipos do TypeScript                   |

## Estrutura

```
src/
├── app/                      # Rotas (App Router)
│   ├── layout.tsx            # HTML base, fonte Nunito, cabeçalho e rodapé
│   ├── page.tsx              # Página inicial (hero + portal de escolas)
│   ├── globals.css           # Reset e estilos globais
│   ├── icon.svg              # Favicon
│   └── design-system/        # Guia vivo do design system (/design-system)
├── components/
│   ├── ui/                   # Design system: Button, Badge, Card, Field, ChipGroup...
│   ├── layout/               # SiteHeader, NavLinks, SiteFooter
│   └── escolas/              # PortalEscolas (filtros) e CardEscola
├── data/
│   └── escolas.ts            # ← dados das escolas (edite aqui)
├── lib/
│   ├── escolas.ts            # Tipos, lista de níveis/turnos e lógica de filtro
│   └── cx.ts                 # Utilitário para juntar classes CSS
└── styles/
    └── tokens.css            # Design tokens (cores, tipografia, espaçamento...)
```

## Editando as escolas

Todos os dados ficam em [`src/data/escolas.ts`](src/data/escolas.ts). Cada escola é um objeto:

```ts
{
  cie: "922109",
  nome: "ANGELA SUELI PONTES DIAS PROFª",
  cidade: "Ferraz de Vasconcelos",           // "Suzano" | "Ferraz de Vasconcelos"
  tipoEnsino: [                              // um item por nível
    "ENSINO FUNDAMENTAL - ANOS FINAIS",
    "ENSINO MÉDIO",
  ],
  turnos: "MANHÃ / TARDE / NOITE",           // texto livre
  endereco: "RUA LUIZ ZANDRINI",
  numero: "010",
  bairro: "JARDIM LUIZ MAURO",
  zona: "URBANA",                            // "URBANA" | "RURAL"
  telefones: ["(011) 4675-1859"],
  email: "e922109a@educacao.sp.gov.br",
  ale: "SIM",                                // "SIM" | "NÃO"
},
```

Os níveis de ensino aceitos estão em `NIVEIS_ENSINO` (`src/lib/escolas.ts`). Se algum for digitado diferente, o TypeScript acusa o erro no editor e no build, e o filtro nunca fica quebrado por causa de um erro de digitação.

O filtro de turno procura as palavras `MANHÃ`, `TARDE`, `NOITE` e `INTEGRAL` dentro do campo `turnos`.

São **62 escolas + 1 CEL** (Centro de Estudos de Línguas junto à EE Raul Brasil). O CEL aparece na lista, mas não entra na contagem de escolas. Ele é identificado pelo nível `"ESTUDO DE LÍNGUAS"` (função `ehCel` em `src/lib/escolas.ts`).

## Design system

Veja todos os componentes funcionando em **`/design-system`**.

Princípios (inspirados no Duolingo):

- **Cores chapadas e vivas**: verde `#58CC02`, azul `#1CB0F6`, vermelho `#FF4B4B`, amarelo `#FFC800`, laranja `#FF9600` e roxo `#CE82FF`.
- **Profundidade 3D**: botões, chips e cards em destaque têm uma borda inferior sólida (`--press-depth`) que "afunda" ao clicar.
- **Fonte redonda e pesada**: [Nunito](https://fonts.google.com/specimen/Nunito) em pesos 700 a 900.
- **Cantos arredondados**: 12 a 16px nos componentes e pílulas nos badges.
- **Tema escuro automático** seguindo a preferência do sistema.

### Tokens

Tudo é definido como variáveis CSS em [`src/styles/tokens.css`](src/styles/tokens.css). Os componentes usam só os **tokens semânticos**, então trocar uma cor ou ajustar o tema escuro é feito em um lugar só:

```css
.meuBotao {
  background: var(--color-primary);
  box-shadow: 0 var(--press-depth) 0 var(--color-primary-shadow);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-6);
}
```

Cada cor de marca (`primary`, `secondary`, `danger`, `warning`, `orange`, `purple`) tem as variações `-shadow` (borda 3D), `-soft` (fundo suave), `-text` (texto legível) e `on-` (texto sobre a cor).

### Componentes

Importe de `@/components/ui`:

```tsx
import { Badge, Button, ButtonLink, Card, ChipGroup, Field, Input } from "@/components/ui";

<Button variant="secondary" size="lg">Continuar</Button>
<ButtonLink href="https://..." target="_blank">Abrir no mapa</ButtonLink>
<Badge tone="orange">Integral</Badge>
<Card raised>...</Card>
```

| Componente              | Uso                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `Button` / `ButtonLink` | Variantes `primary`, `secondary`, `danger`, `warning`, `neutral`, `ghost`; tamanhos `sm`, `md`, `lg` |
| `Badge`                 | Tons `green`, `blue`, `red`, `yellow`, `orange`, `purple`, `neutral`                 |
| `Card`                  | Superfície com borda; `raised` adiciona a borda 3D                                   |
| `Field` + `Input`/`Select` | Campo de formulário com rótulo e dica                                            |
| `ChipGroup`             | Escolha única em chips (radios nativos, acessível por teclado)                       |
| `ProgressBar`           | Barra de progresso com brilho                                                        |
| `Stat`                  | Bloco de estatística com ícone                                                       |
| `EmptyState`            | Mensagem para listas vazias                                                          |
| `Container`             | Centraliza o conteúdo com largura máxima                                             |

Ícones: [lucide-react](https://lucide.dev/icons).

## Deploy (GitHub Pages)

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) roda lint, typecheck e build em todo pull request, e publica no GitHub Pages a cada push na `main`.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O caminho do site (`/escolas-suz-2026`) é passado automaticamente pelo workflow através da variável `BASE_PATH`, usada em `next.config.ts`.
