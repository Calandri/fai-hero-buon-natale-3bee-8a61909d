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
  /** Stato di caricamento */
  isLoading?: boolean;
  /** Messaggio di errore */
  error?: string;
  /** Stato disabilitato (no animazioni) */
  disabled?: boolean;
  /** Ritardo animazione entrata in ms */
  animationDelay?: number;
  /** Callback quando animazione completata */
  onAnimationComplete?: () => void;
}

/** Valori di default per il componente */
export const HERO_CONTENT_DEFAULTS = {
  logoUrl:
    "https://blog.3bee.com/_next/image/?url=https%3A%2F%2Fapi-backend-assets.s3.eu-south-1.amazonaws.com%2Fprivate%2Ffiler_public%2F24%2F43%2F24436c3b-3f76-474e-8462-8ef04f454a72%2F53d0b6a4-e592-47c8-bc18-127d1333d95c.png&w=3840&q=75",
  headline: "Quest'anno le nostre api hanno imparato a dire HO HO HONEY! \uD83C\uDF6F",
  subheadline: "Tanti auguri di Buone Feste dal Team 3Bee!",
  animationDelay: 0,
} as const;
