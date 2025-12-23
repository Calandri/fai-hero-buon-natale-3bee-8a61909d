/** Speed variants for snowfall animation */
export type SnowfallSpeed = "slow" | "normal" | "fast";

/** Intensity variants affecting particle count and density */
export type SnowfallIntensity = "light" | "normal" | "heavy";

export interface SnowfallProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** Numero di fiocchi di neve (default: 40, max: 50 for performance) */
  particleCount?: number;
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Animation speed (default: "normal") */
  speed?: SnowfallSpeed;
  /** Snow intensity affecting density (default: "normal") */
  intensity?: SnowfallIntensity;
  /** Wind intensity for lateral movement 0-1 (default: 0.3) */
  windIntensity?: number;
  /** Disable animation (respects prefers-reduced-motion automatically) */
  disabled?: boolean;
}
