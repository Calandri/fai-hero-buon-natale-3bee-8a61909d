export interface SnowfallProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** Numero di fiocchi di neve (default: 30-50) */
  particleCount?: number;
  /** Classe CSS aggiuntiva */
  className?: string;
}
