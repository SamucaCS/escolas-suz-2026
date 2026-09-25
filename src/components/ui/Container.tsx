import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

/** Centraliza o conteúdo com largura máxima e margens laterais responsivas. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.container, className)} {...props} />;
}
