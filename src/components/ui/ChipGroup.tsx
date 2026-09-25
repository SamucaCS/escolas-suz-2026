import { cx } from "@/lib/cx";
import styles from "./ChipGroup.module.css";

export type ChipOption<T extends string> = {
  value: T;
  label: string;
  /** Número exibido ao lado do rótulo (ex.: quantidade de resultados). */
  count?: number;
};

export type ChipGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: ReadonlyArray<ChipOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * Grupo de opções de escolha única, no estilo das alternativas de uma lição.
 * Por baixo são radios nativos: funciona com teclado (setas) e leitores de tela.
 */
export function ChipGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  className,
}: ChipGroupProps<T>) {
  return (
    <fieldset className={cx(styles.group, className)}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.value} className={styles.chip}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              className="visually-hidden"
            />
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span className={styles.count}>{option.count}</span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
