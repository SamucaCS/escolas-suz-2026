import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./ProgressBar.module.css";

export type ProgressBarProps = {
  value: number;
  max?: number;
  /** Texto lido por leitores de tela (ex.: "Escolas exibidas"). */
  label: string;
  tone?: "green" | "blue" | "yellow" | "orange";
  className?: string;
};

/** A barra de progresso gordinha com brilho, marca registrada do Duolingo. */
export function ProgressBar({
  value,
  max = 100,
  label,
  tone = "green",
  className,
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cx(styles.track, styles[tone], className)}
    >
      <div
        className={styles.fill}
        style={{ "--percent": `${percent}%` } as CSSProperties}
      />
    </div>
  );
}
