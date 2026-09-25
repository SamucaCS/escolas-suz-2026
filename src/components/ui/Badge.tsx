import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Badge.module.css";

export type Tone =
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "orange"
  | "purple"
  | "neutral";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  icon?: ReactNode;
};

export function Badge({
  tone = "neutral",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)} {...props}>
      {icon}
      {children}
    </span>
  );
}
