import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import styles from "./Field.module.css";

export type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

/** Agrupa rótulo + campo + dica. Use com `Input` ou `Select`. */
export function Field({ label, htmlFor, hint, className, children }: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Ícone decorativo à esquerda do texto. */
  icon?: ReactNode;
};

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className={cx(styles.control, icon ? styles.hasIcon : undefined)}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <input className={cx(styles.input, className)} {...props} />
    </div>
  );
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className={styles.control}>
      <select className={cx(styles.input, styles.select, className)} {...props}>
        {children}
      </select>
      <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
    </div>
  );
}
