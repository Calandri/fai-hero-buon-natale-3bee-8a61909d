export interface BeeAnimationProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** Intervallo minimo tra animazioni in secondi (default: 8) */
  minInterval?: number;
  /** Intervallo massimo tra animazioni in secondi (default: 12) */
  maxInterval?: number;
  /** Durata dell'attraversamento in secondi (default: 4) */
  crossingDuration?: number;
  /** Dimensione dell'ape in pixel (default: 50) */
  beeSize?: number;
  /** Disabilita l'animazione */
  disabled?: boolean;
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Callback quando l'ape inizia ad attraversare */
  onCrossStart?: () => void;
  /** Callback quando l'ape finisce di attraversare */
  onCrossEnd?: () => void;
}
