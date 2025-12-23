/**
 * GoldenParticles Props Interface
 *
 * Defines the configuration for golden floating particles component.
 * Particles create a magical pollen-like effect with sparkle/glow.
 */

export interface GoldenParticle {
  /** Unique identifier for the particle */
  id: number;
  /** Horizontal position as percentage (0-100) */
  left: number;
  /** Vertical position as percentage (0-100) */
  top: number;
  /** Particle size in pixels */
  size: number;
  /** Animation delay in seconds */
  delay: number;
  /** Animation duration in seconds */
  duration: number;
  /** Particle opacity (0.6-0.9) */
  opacity: number;
  /** Color from the golden palette */
  color: string;
}

export interface GoldenParticlesProps {
  /** HTML ID required for testing and tracking */
  id: string;
  /** Number of golden particles (default: 25, range: 20-30) */
  particleCount?: number;
  /** Additional CSS class */
  className?: string;
  /** Disable animations for reduced motion preference */
  reducedMotion?: boolean;
  /** Pause all particle animations */
  paused?: boolean;
  /** Custom z-index (default: 2) */
  zIndex?: number;
  /** Minimum particle size in pixels (default: 3) */
  minSize?: number;
  /** Maximum particle size in pixels (default: 8) */
  maxSize?: number;
  /** Enable glow effect on particles (default: true) */
  enableGlow?: boolean;
}

/** Golden color palette for particles */
export const GOLDEN_COLORS = [
  "#FFD700", // Gold
  "#FFC107", // Honey
  "#FFEB3B", // Amber light
] as const;

/** Default configuration values */
export const GOLDEN_PARTICLES_DEFAULTS = {
  particleCount: 25,
  minSize: 3,
  maxSize: 8,
  zIndex: 2,
  enableGlow: true,
  minOpacity: 0.6,
  maxOpacity: 0.9,
  minDuration: 4,
  maxDuration: 8,
} as const;
