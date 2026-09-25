import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./EmptyState.module.css";

export type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
