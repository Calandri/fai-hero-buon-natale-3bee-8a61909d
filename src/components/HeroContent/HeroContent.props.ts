export interface HeroContentProps {
  /** ID HTML obbligatorio per testing e tracking */
  id: string;
  /** URL del logo 3Bee */
  logoUrl?: string;
  /** Headline principale */
  headline?: string;
  /** Sottotitolo */
  subheadline?: string;
  /** Classe CSS aggiuntiva */
  className?: string;
}
