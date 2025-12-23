/**
 * Snowfall Component
 *
 * Componente effetto neve che cade. Fiocchi bianchi/argentati di dimensioni variabili,
 * caduta naturale con leggero movimento laterale, loop infinito.
 * Usa CSS animations + pseudo-elementi o particles leggere.
 * Performance: max 50 particelle, GPU accelerated.
 *
 * - particle_count: 30-50 (max: 50)
 * - colors: #FFFFFF, #E8E8E8, #F0F0F0
 * - animation: CSS keyframes, transform translateY + translateX wobble
 * - z_index: 1
 * - coverage: full viewport
 */

"use client";

import React, { useMemo } from "react";
import type { SnowfallProps, SnowfallSpeed } from "./Snowfall.props";

const MAX_PARTICLES = 50;
const DEFAULT_PARTICLE_COUNT = 40;
const DEFAULT_WIND_INTENSITY = 0.3;

const SNOW_COLORS = ["#FFFFFF", "#E8E8E8", "#F0F0F0"];

const SPEED_DURATIONS: Record<SnowfallSpeed, { min: number; max: number }> = {
  slow: { min: 12, max: 18 },
  normal: { min: 8, max: 14 },
  fast: { min: 4, max: 8 },
};

interface Snowflake {
  id: number;
  size: "small" | "medium" | "large";
  sizeValue: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  wobble: number;
}

function generateSnowflakes(
  count: number,
  speed: SnowfallSpeed,
  windIntensity: number
): Snowflake[] {
  const snowflakes: Snowflake[] = [];
  const durations = SPEED_DURATIONS[speed];

  for (let i = 0; i < count; i++) {
    const sizeRandom = Math.random();
    let size: "small" | "medium" | "large";
    let sizeValue: number;

    if (sizeRandom < 0.4) {
      size = "small";
      sizeValue = 2 + Math.random() * 2;
    } else if (sizeRandom < 0.8) {
      size = "medium";
      sizeValue = 4 + Math.random() * 3;
    } else {
      size = "large";
      sizeValue = 7 + Math.random() * 4;
    }

    snowflakes.push({
      id: i,
      size,
      sizeValue,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: durations.min + Math.random() * (durations.max - durations.min),
      opacity: 0.4 + Math.random() * 0.6,
      color: SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)],
      wobble: 20 + Math.random() * 40 * windIntensity,
    });
  }

  return snowflakes;
}

export function Snowfall({
  id,
  className,
  particleCount = DEFAULT_PARTICLE_COUNT,
  speed = "normal",
  intensity = "normal",
  windIntensity = DEFAULT_WIND_INTENSITY,
  disabled = false,
}: SnowfallProps): React.JSX.Element {
  const clampedParticleCount = Math.min(Math.max(1, particleCount), MAX_PARTICLES);
  const clampedWindIntensity = Math.min(Math.max(0, windIntensity), 1);

  const snowflakes = useMemo(
    () =>
      disabled
        ? []
        : generateSnowflakes(clampedParticleCount, speed, clampedWindIntensity),
    [disabled, clampedParticleCount, speed, clampedWindIntensity]
  );

  return (
    <div
      id={id}
      data-testid={id}
      className={`snowfall ${className ?? ""}`}
      data-speed={speed}
      data-intensity={intensity}
      data-wind={clampedWindIntensity.toString()}
      data-disabled={disabled ? "true" : undefined}
      aria-hidden="true"
      role="presentation"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          data-snowflake
          data-size={flake.size}
          style={{
            position: "absolute",
            left: `${flake.left}%`,
            top: "-10px",
            width: `${flake.sizeValue}px`,
            height: `${flake.sizeValue}px`,
            backgroundColor: flake.color,
            borderRadius: "50%",
            opacity: flake.opacity,
            willChange: "transform",
            animation: `snowfall-drop ${flake.duration}s linear ${flake.delay}s infinite`,
            boxShadow: `0 0 ${flake.sizeValue / 2}px ${flake.color}`,
            ["--wobble" as string]: `${flake.wobble}px`,
          }}
        />
      ))}

      <style>{`
        @keyframes snowfall-drop {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--wobble, 20px));
            opacity: 0.3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-snowflake] {
            animation: none !important;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

export default Snowfall;
