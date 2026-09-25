export const CIDADES = ["Suzano", "Ferraz de Vasconcelos"] as const;
export type Cidade = (typeof CIDADES)[number];

export const NIVEIS_ENSINO = [
  "ENSINO FUNDAMENTAL - ANOS INICIAIS",
  "ENSINO FUNDAMENTAL - ANOS FINAIS",
  "ENSINO MÉDIO",
  "ENSINO MÉDIO PROFISSIONALIZANTE",
  "EJA FUNDAMENTAL - ANOS FINAIS",
  "EJA ENSINO MÉDIO",
  "EJA - PRESENÇA FLEXÍVEL",
  "ESTUDO DE LÍNGUAS",
] as const;
export type NivelEnsino = (typeof NIVEIS_ENSINO)[number];

/** Rótulos curtos usados nos badges e no filtro. */
export const ROTULO_NIVEL: Record<NivelEnsino, string> = {
  "ENSINO FUNDAMENTAL - ANOS INICIAIS": "Fundamental · Anos iniciais",
  "ENSINO FUNDAMENTAL - ANOS FINAIS": "Fundamental · Anos finais",
  "ENSINO MÉDIO": "Ensino médio",
  "ENSINO MÉDIO PROFISSIONALIZANTE": "Médio profissionalizante",
  "EJA FUNDAMENTAL - ANOS FINAIS": "EJA · Fundamental",
  "EJA ENSINO MÉDIO": "EJA · Ensino médio",
  "EJA - PRESENÇA FLEXÍVEL": "EJA · Presença flexível",
  "ESTUDO DE LÍNGUAS": "Estudo de línguas",
};

export const TURNOS = [
  { valor: "MANHÃ", rotulo: "Manhã" },
  { valor: "TARDE", rotulo: "Tarde" },
  { valor: "NOITE", rotulo: "Noite" },
  { valor: "INTEGRAL", rotulo: "Integral" },
] as const;
export type Turno = (typeof TURNOS)[number]["valor"];

export type Escola = {
  cie: string;
  nome: string;
  cidade: Cidade;
  tipoEnsino: NivelEnsino[];
  /** Texto livre, exibido como está (ex.: "MANHÃ / TARDE / NOITE"). */
  turnos: string;
  endereco: string;
  numero: string;
  bairro: string;
  zona: "URBANA" | "RURAL";
  telefones: string[];
  email: string;
  ale: "SIM" | "NÃO";
};

export type Filtros = {
  busca: string;
  cidade: Cidade | "todas";
  nivel: NivelEnsino | "todos";
  turno: Turno | "todos";
};

export const FILTROS_INICIAIS: Filtros = {
  busca: "",
  cidade: "todas",
  nivel: "todos",
  turno: "todos",
};

/** Deixa o texto em minúsculas e sem acentos, para a busca ignorar "São" x "sao". */
export function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function temTurno(escola: Escola, turno: Turno) {
  return escola.turnos.toUpperCase().includes(turno);
}

export function ehIntegral(escola: Escola) {
  return temTurno(escola, "INTEGRAL");
}

export function filtrarEscolas(escolas: Escola[], filtros: Filtros) {
  const busca = normalizar(filtros.busca);

  return escolas
    .filter((escola) => {
      const matchBusca =
        !busca ||
        normalizar(escola.nome).includes(busca) ||
        normalizar(escola.bairro).includes(busca) ||
        escola.cie.toLowerCase().includes(busca);
      const matchCidade =
        filtros.cidade === "todas" || escola.cidade === filtros.cidade;
      const matchNivel =
        filtros.nivel === "todos" || escola.tipoEnsino.includes(filtros.nivel);
      const matchTurno =
        filtros.turno === "todos" || temTurno(escola, filtros.turno);
      return matchBusca && matchCidade && matchNivel && matchTurno;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

export function niveisOrdenados(escola: Escola) {
  return [...escola.tipoEnsino].sort(
    (a, b) => NIVEIS_ENSINO.indexOf(a) - NIVEIS_ENSINO.indexOf(b),
  );
}

export function linkMapa(escola: Escola) {
  const endereco = `${escola.endereco}, ${escola.numero} - ${escola.bairro}, ${escola.cidade}, São Paulo`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}
