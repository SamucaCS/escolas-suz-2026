import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "neutral"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Ícone exibido antes do texto. */
  icon?: ReactNode;
};

function buttonClassName(
  { variant = "primary", size = "md", fullWidth }: BaseProps,
  className?: string,
) {
  return cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );
}

export type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

/** Botão "3D" do design system. Use `ButtonLink` quando precisar de um link. */
export function Button({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth }, className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export type ButtonLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Link com a aparência de botão (ex.: "Abrir no mapa").
 * Links internos ("/pagina") usam o `Link` do Next, que aplica o basePath do GitHub Pages.
 */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  icon,
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClassName({ variant, size, fullWidth }, className);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {icon}
      {children}
    </a>
  );
}
