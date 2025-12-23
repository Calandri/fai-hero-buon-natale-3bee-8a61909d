"use client";

import React, { useMemo } from "react";
import type {
  GoldenParticlesProps,
  GoldenParticle,
} from "./GoldenParticles.props";
import {
  GOLDEN_COLORS,
  GOLDEN_PARTICLES_DEFAULTS,
} from "./GoldenParticles.props";
import "./GoldenParticles.module.css";

/**
 * Generates a random number within a range using a seeded approach
 * for consistent particle generation between renders
 */
function randomInRange(min: number, max: number, seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  const random = x - Math.floor(x);
  return min + random * (max - min);
}

/**
 * Generates particles with random properties
 */
function generateParticles(
  count: number,
  minSize: number,
  maxSize: number
): GoldenParticle[] {
  const particles: GoldenParticle[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + 1;
    particles.push({
      id: i,
      left: randomInRange(0, 100, seed),
      top: randomInRange(0, 100, seed * 2),
      size: randomInRange(minSize, maxSize, seed * 3),
      delay: randomInRange(0, 4, seed * 4),
      duration: randomInRange(
        GOLDEN_PARTICLES_DEFAULTS.minDuration,
        GOLDEN_PARTICLES_DEFAULTS.maxDuration,
        seed * 5
      ),
      opacity: randomInRange(
        GOLDEN_PARTICLES_DEFAULTS.minOpacity,
        GOLDEN_PARTICLES_DEFAULTS.maxOpacity,
        seed * 6
      ),
      color: GOLDEN_COLORS[i % GOLDEN_COLORS.length],
    });
  }

  return particles;
}

/**
 * GoldenParticles Component
 *
 * Golden particles floating like magical pollen with sparkle/glow effect.
 * Organic floating movement that complements snow without visual overlap.
 */
export function GoldenParticles({
  id,
  particleCount = GOLDEN_PARTICLES_DEFAULTS.particleCount,
  className,
  reducedMotion = false,
  paused = false,
  zIndex = GOLDEN_PARTICLES_DEFAULTS.zIndex,
  minSize = GOLDEN_PARTICLES_DEFAULTS.minSize,
  maxSize = GOLDEN_PARTICLES_DEFAULTS.maxSize,
  enableGlow = GOLDEN_PARTICLES_DEFAULTS.enableGlow,
}: GoldenParticlesProps): React.JSX.Element {
  // Cap particle count at 50 for performance
  const effectiveCount = Math.min(particleCount, 50);

  // Generate particles with memoization
  const particles = useMemo(
    () => generateParticles(effectiveCount, minSize, maxSize),
    [effectiveCount, minSize, maxSize]
  );

  // Compute animation state
  const animationPlayState = paused ? "paused" : "running";
  const shouldAnimate = !reducedMotion;

  return (
    <div
      id={id}
      data-testid={id}
      className={`golden-particles ${className ?? ""}`.trim()}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex,
      }}
    >
      {particles.map((particle) => {
        const glowColor = particle.color;
        const boxShadow = enableGlow
          ? `0 0 ${particle.size * 2}px ${glowColor}, 0 0 ${particle.size * 4}px ${glowColor}40`
          : undefined;

        const animationStyle = shouldAnimate
          ? {
              animation: `particleFloat ${particle.duration}s ease-in-out infinite, glowPulse ${particle.duration * 0.5}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              animationPlayState,
            }
          : {
              animation: "none",
            };

        return (
          <div
            key={particle.id}
            data-particle="true"
            style={{
              position: "absolute",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: "50%",
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow,
              transform: "translateZ(0)",
              willChange: "transform, opacity",
              ...animationStyle,
            }}
          />
        );
      })}
    </div>
  );
}

export default GoldenParticles;
