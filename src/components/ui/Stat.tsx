import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Tone } from "./Badge";
import styles from "./Stat.module.css";

export type StatProps = {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  tone?: Tone;
  className?: string;
};

/** Bloco de estatística (ícone colorido + número grande + legenda). */
export function Stat({ icon, value, label, tone = "green", className }: StatProps) {
  return (
    <div className={cx(styles.stat, styles[tone], className)}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.text}>
        <strong className={styles.value}>{value}</strong>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
