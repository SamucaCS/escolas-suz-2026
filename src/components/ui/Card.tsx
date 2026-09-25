import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Card.module.css";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li";
  padding?: "sm" | "md" | "lg";
  /** Adiciona a borda "3D" e o efeito de hover, para cards clicáveis ou em destaque. */
  raised?: boolean;
};

export function Card({
  as: Component = "div",
  padding = "md",
  raised,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cx(
        styles.card,
        styles[padding],
        raised && styles.raised,
        className,
      )}
      {...props}
    />
  );
}
