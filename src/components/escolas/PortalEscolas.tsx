"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SearchX } from "lucide-react";
import {
  Button,
  Card,
  ChipGroup,
  EmptyState,
  Field,
  Input,
  ProgressBar,
  Select,
} from "@/components/ui";
import {
  CIDADES,
  FILTROS_INICIAIS,
  NIVEIS_ENSINO,
  ROTULO_NIVEL,
  TURNOS,
  ehCel,
  filtrarEscolas,
  type Escola,
  type Filtros,
  type NivelEnsino,
} from "@/lib/escolas";
import { CardEscola } from "./CardEscola";
import styles from "./PortalEscolas.module.css";

export function PortalEscolas({ escolas }: { escolas: Escola[] }) {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAIS);

  const resultado = useMemo(
    () => filtrarEscolas(escolas, filtros),
    [escolas, filtros],
  );

  // Escolas de cada cidade considerando os demais filtros ativos (sem o CEL).
  const contagemCidade = useMemo(() => {
    const semCidade = filtrarEscolas(escolas, {
      ...filtros,
      cidade: "todas",
    }).filter((e) => !ehCel(e));
    return {
      todas: semCidade.length,
      ...Object.fromEntries(
        CIDADES.map((cidade) => [
          cidade,
          semCidade.filter((e) => e.cidade === cidade).length,
        ]),
      ),
    } as Record<Filtros["cidade"], number>;
  }, [escolas, filtros]);

  // O CEL aparece na lista, mas é contado separado das escolas.
  const totalEscolas = useMemo(
    () => escolas.filter((e) => !ehCel(e)).length,
    [escolas],
  );
  const celsNoResultado = resultado.filter(ehCel).length;
  const escolasNoResultado = resultado.length - celsNoResultado;

  const temFiltroAtivo =
    filtros.busca !== "" ||
    filtros.cidade !== "todas" ||
    filtros.nivel !== "todos" ||
    filtros.turno !== "todos";

  function atualizar<K extends keyof Filtros>(chave: K, valor: Filtros[K]) {
    setFiltros((atual) => ({ ...atual, [chave]: valor }));
  }

  const limpar = () => setFiltros(FILTROS_INICIAIS);

  return (
    <div className={styles.portal}>
      <Card as="section" aria-label="Filtros" className={styles.filters}>
        <div className={styles.row}>
          <Field
            label="Buscar escola"
            htmlFor="busca"
            className={styles.search}
          >
            <Input
              id="busca"
              type="search"
              placeholder="Nome, bairro ou CIE"
              icon={<Search strokeWidth={2.5} />}
              value={filtros.busca}
              onChange={(e) => atualizar("busca", e.target.value)}
              autoComplete="off"
            />
          </Field>
          <Field label="Nível de ensino" htmlFor="nivel" className={styles.nivel}>
            <Select
              id="nivel"
              value={filtros.nivel}
              onChange={(e) =>
                atualizar("nivel", e.target.value as NivelEnsino | "todos")
              }
            >
              <option value="todos">Todos os níveis</option>
              {NIVEIS_ENSINO.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {ROTULO_NIVEL[nivel]}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className={styles.row}>
          <ChipGroup
            legend="Cidade"
            name="cidade"
            value={filtros.cidade}
            onChange={(valor) => atualizar("cidade", valor)}
            options={[
              { value: "todas", label: "Todas", count: contagemCidade.todas },
              ...CIDADES.map((cidade) => ({
                value: cidade,
                label: cidade,
                count: contagemCidade[cidade],
              })),
            ]}
          />
          <ChipGroup
            legend="Turno"
            name="turno"
            value={filtros.turno}
            onChange={(valor) => atualizar("turno", valor)}
            options={[
              { value: "todos", label: "Todos" },
              ...TURNOS.map((t) => ({ value: t.valor, label: t.rotulo })),
            ]}
          />
        </div>
      </Card>

      <div className={styles.summary}>
        <div className={styles.summaryText}>
          <h2 className={styles.title}>Escolas</h2>
          <p aria-live="polite" className={styles.count}>
            Mostrando{" "}
            {(escolasNoResultado > 0 || celsNoResultado === 0) && (
              <>
                <strong>{escolasNoResultado}</strong> de {totalEscolas} escolas
              </>
            )}
            {escolasNoResultado > 0 && celsNoResultado > 0 && " + "}
            {celsNoResultado > 0 && (
              <>
                <strong>{celsNoResultado}</strong> CEL
              </>
            )}
          </p>
        </div>
        {temFiltroAtivo && (
          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw size={18} strokeWidth={2.75} aria-hidden="true" />}
            onClick={limpar}
          >
            Limpar filtros
          </Button>
        )}
        <ProgressBar
          value={resultado.length}
          max={escolas.length}
          label="Escolas exibidas"
          className={styles.progress}
        />
      </div>

      {resultado.length > 0 ? (
        <ul className={styles.grid}>
          {resultado.map((escola) => (
            <CardEscola key={escola.cie} escola={escola} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<SearchX strokeWidth={2.5} />}
          title="Nenhuma escola encontrada"
          description="Tente buscar por outro nome ou remover algum filtro."
          action={
            <Button variant="secondary" onClick={limpar}>
              Limpar filtros
            </Button>
          }
        />
      )}
    </div>
  );
}
