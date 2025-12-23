export interface FooterProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** Testo del footer - default: "Con amore dal Team 3Bee 🐝 - Natale 2024" */
  text?: string;
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Variante di stile: default (bianco/oro) o minimal */
  variant?: "default" | "minimal";
  /** Stato di caricamento */
  isLoading?: boolean;
  /** Se true, il footer è disabilitato visivamente */
  disabled?: boolean;
}
