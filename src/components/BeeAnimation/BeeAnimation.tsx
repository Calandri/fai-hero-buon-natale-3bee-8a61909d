"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import type { BeeAnimationProps } from "./BeeAnimation.props";

const DEFAULT_MIN_INTERVAL = 8;
const DEFAULT_MAX_INTERVAL = 12;
const DEFAULT_CROSSING_DURATION = 4;
const DEFAULT_BEE_SIZE = 50;

export function BeeAnimation({
  id,
  minInterval = DEFAULT_MIN_INTERVAL,
  maxInterval = DEFAULT_MAX_INTERVAL,
  crossingDuration = DEFAULT_CROSSING_DURATION,
  beeSize = DEFAULT_BEE_SIZE,
  disabled = false,
  className,
  onCrossStart,
  onCrossEnd,
}: BeeAnimationProps): React.JSX.Element {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const crossingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomInterval = useCallback(() => {
    return (Math.random() * (maxInterval - minInterval) + minInterval) * 1000;
  }, [minInterval, maxInterval]);

  const startCrossing = useCallback(() => {
    if (disabled || prefersReducedMotion) return;

    setIsAnimating(true);
    onCrossStart?.();

    crossingTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      onCrossEnd?.();
    }, crossingDuration * 1000);
  }, [disabled, prefersReducedMotion, crossingDuration, onCrossStart, onCrossEnd]);

  const scheduleNextCrossing = useCallback(() => {
    if (disabled || prefersReducedMotion) return;

    intervalRef.current = setTimeout(() => {
      startCrossing();
      scheduleNextCrossing();
    }, getRandomInterval());
  }, [disabled, prefersReducedMotion, getRandomInterval, startCrossing]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (crossingTimeoutRef.current) clearTimeout(crossingTimeoutRef.current);
      setIsAnimating(false);
      return;
    }

    scheduleNextCrossing();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (crossingTimeoutRef.current) clearTimeout(crossingTimeoutRef.current);
    };
  }, [disabled, prefersReducedMotion, scheduleNextCrossing]);

  return (
    <div
      id={id}
      data-testid={id}
      className={`fixed inset-0 pointer-events-none z-bee overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {isAnimating && (
        <svg
          data-testid={`${id}-svg`}
          width={beeSize}
          height={beeSize}
          viewBox="0 0 100 100"
          className="absolute animate-bee-cross"
          style={{
            top: "40%",
            left: 0,
          }}
        >
          {/* Santa Hat */}
          <g id="santa-hat">
            <path
              d="M35 25 Q50 5 65 25 L60 35 Q50 30 40 35 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1"
            />
            <ellipse cx="50" cy="35" rx="15" ry="5" fill="#FAFAFA" />
            <circle cx="68" cy="15" r="6" fill="#FAFAFA" />
          </g>

          {/* Bee Body */}
          <g id="bee-body">
            <ellipse cx="50" cy="55" rx="20" ry="15" fill="#F7B731" />
            <rect x="38" y="48" width="24" height="5" fill="#1F2937" rx="2" />
            <rect x="38" y="57" width="24" height="5" fill="#1F2937" rx="2" />
            <circle cx="50" cy="38" r="10" fill="#F7B731" />
            <circle cx="46" cy="36" r="3" fill="#1F2937" />
            <circle cx="54" cy="36" r="3" fill="#1F2937" />
            <circle cx="45" cy="35" r="1" fill="#FFFFFF" />
            <circle cx="53" cy="35" r="1" fill="#FFFFFF" />
            <line x1="45" y1="28" x2="42" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="28" x2="58" y2="22" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <circle cx="42" cy="21" r="2" fill="#1F2937" />
            <circle cx="58" cy="21" r="2" fill="#1F2937" />
            <path d="M70 55 L78 55 L70 58 Z" fill="#1F2937" />
          </g>

          {/* Wings */}
          <g id="wings" className="origin-center animate-wing-flap">
            <ellipse
              cx="38"
              cy="45"
              rx="12"
              ry="8"
              fill="rgba(255, 255, 255, 0.6)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1"
              transform="rotate(-30 38 45)"
            />
            <ellipse
              cx="62"
              cy="45"
              rx="12"
              ry="8"
              fill="rgba(255, 255, 255, 0.6)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1"
              transform="rotate(30 62 45)"
            />
          </g>

          {/* Smile */}
          <path
            d="M46 42 Q50 46 54 42"
            fill="none"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export default BeeAnimation;
