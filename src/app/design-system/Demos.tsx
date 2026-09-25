"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button, ChipGroup, ProgressBar } from "@/components/ui";
import styles from "./page.module.css";

export function ChipGroupDemo() {
  const [turno, setTurno] = useState("manha");

  return (
    <ChipGroup
      legend="Qual turno você prefere?"
      name="demo-turno"
      value={turno}
      onChange={setTurno}
      options={[
        { value: "manha", label: "Manhã", count: 42 },
        { value: "tarde", label: "Tarde", count: 40 },
        { value: "noite", label: "Noite", count: 21 },
      ]}
    />
  );
}

export function ProgressDemo() {
  const [passos, setPassos] = useState(2);
  const total = 5;
  const completo = passos >= total;

  return (
    <div className={styles.stack}>
      <ProgressBar value={passos} max={total} label="Progresso da lição" />
      <p className={styles.muted}>
        {completo ? "Lição completa! 🎉" : `${passos} de ${total} exercícios`}
      </p>
      <div className={styles.inline}>
        {completo ? (
          <Button
            variant="neutral"
            icon={<RotateCcw size={20} strokeWidth={2.75} aria-hidden="true" />}
            onClick={() => setPassos(0)}
          >
            Recomeçar
          </Button>
        ) : (
          <Button
            icon={<Check size={20} strokeWidth={3} aria-hidden="true" />}
            onClick={() => setPassos((p) => p + 1)}
          >
            Verificar
          </Button>
        )}
      </div>
    </div>
  );
}
