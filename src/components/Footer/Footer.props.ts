/** Footer text color variant */
export type FooterVariant = "light" | "dark";

export interface FooterProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** Testo del footer - default: "Con amore dal Team 3Bee 🐝 - Natale 2024" */
  text?: string;
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Variante colore: light (bianco/oro) o dark */
  variant?: FooterVariant;
  /** Disabilita il footer (hidden) */
  disabled?: boolean;
}
