"use client";

import React, { useEffect, useState, useCallback } from "react";
import { tv } from "tailwind-variants";
import type { HeroContentProps } from "./HeroContent.props";
import { HERO_CONTENT_DEFAULTS } from "./HeroContent.props";

/**
 * Tailwind variants for HeroContent component
 * Handles animation states and responsive styling
 */
const heroContentVariants = tv({
  slots: {
    container:
      "flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 text-center",
    logoWrapper:
      "relative mb-8 flex items-center justify-center",
    logo:
      "relative h-auto w-32 rounded-full sm:w-40 md:w-48 lg:w-56",
    logoGlow:
      "absolute inset-0 rounded-full blur-2xl",
    sparkleContainer:
      "pointer-events-none absolute inset-0",
    sparkle:
      "absolute h-2 w-2 rounded-full bg-secondary-500",
    headline:
      "mb-4 max-w-4xl font-display text-hero-mobile font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-hero-desktop",
    subheadline:
      "max-w-2xl text-lg font-medium text-accent-300 sm:text-xl md:text-2xl",
    skeletonLogo:
      "h-32 w-32 animate-pulse rounded-full bg-neutral-700 sm:h-40 sm:w-40 md:h-48 md:w-48",
    skeletonHeadline:
      "mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-neutral-700 sm:h-16",
    skeletonSubheadline:
      "h-8 w-1/2 animate-pulse rounded-lg bg-neutral-700",
    errorContainer:
      "flex flex-col items-center justify-center gap-4 text-center",
    errorIcon:
      "text-6xl",
    errorMessage:
      "max-w-md text-lg text-error",
  },
  variants: {
    animated: {
      true: {
        container: "animate-fade-slide-up",
      },
      false: {},
    },
  },
  defaultVariants: {
    animated: true,
  },
});

/**
 * Sparkle positions for Christmas decoration effect
 */
const SPARKLE_POSITIONS = [
  { top: "5%", left: "10%", delay: "0s", duration: "2s" },
  { top: "15%", right: "5%", delay: "0.3s", duration: "1.8s" },
  { top: "50%", left: "0%", delay: "0.6s", duration: "2.2s" },
  { top: "70%", right: "10%", delay: "0.9s", duration: "1.9s" },
  { bottom: "10%", left: "15%", delay: "1.2s", duration: "2.1s" },
  { bottom: "20%", right: "0%", delay: "0.4s", duration: "2.3s" },
  { top: "30%", left: "5%", delay: "0.7s", duration: "1.7s" },
  { top: "80%", right: "15%", delay: "1s", duration: "2s" },
];

/**
 * HeroContent Component
 *
 * Central hero content featuring:
 * - 3Bee logo with golden glow Christmas decorations
 * - Creative headline with bee/honey pun
 * - Subtitle with seasonal greetings
 * - Fade-in + slide-up entrance animation
 */
export function HeroContent({
  id,
  logoUrl = HERO_CONTENT_DEFAULTS.logoUrl,
  headline = HERO_CONTENT_DEFAULTS.headline,
  subheadline = HERO_CONTENT_DEFAULTS.subheadline,
  className,
  isLoading = false,
  error,
  disabled = false,
  animationDelay = HERO_CONTENT_DEFAULTS.animationDelay,
  onAnimationComplete,
}: HeroContentProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(disabled);
  const [imageLoaded, setImageLoaded] = useState(false);

  const styles = heroContentVariants({ animated: !disabled && isVisible });

  const handleAnimationEnd = useCallback(() => {
    onAnimationComplete?.();
  }, [onAnimationComplete]);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay, disabled]);

  if (error) {
    return (
      <main
        id={id}
        data-component-id="hero-content"
        className={`${styles.container()} ${className ?? ""}`}
        role="alert"
      >
        <div id={`${id}-error`} className={styles.errorContainer()}>
          <span className={styles.errorIcon()} aria-hidden="true">
            ⚠️
          </span>
          <p className={styles.errorMessage()}>{error}</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main
        id={id}
        data-component-id="hero-content"
        className={`${styles.container()} ${className ?? ""}`}
        aria-busy="true"
        aria-label="Caricamento contenuto..."
      >
        <div id={`${id}-skeleton`} className="flex flex-col items-center">
          <div className={styles.skeletonLogo()} />
          <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-4">
            <div className={styles.skeletonHeadline()} />
            <div className={styles.skeletonSubheadline()} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      id={id}
      data-component-id="hero-content"
      className={`${styles.container()} ${className ?? ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: disabled ? "none" : "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Logo with Christmas Decorations */}
      <div id={`${id}-logo-wrapper`} className={styles.logoWrapper()}>
        {/* Golden Glow Effect */}
        <div
          id={`${id}-logo-glow`}
          className={styles.logoGlow()}
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(247, 183, 49, 0.2) 50%, transparent 70%)",
            animation: disabled ? "none" : "glowPulse 2s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        {/* Sparkle Decorations */}
        <div id={`${id}-sparkles`} className={styles.sparkleContainer()} aria-hidden="true">
          {SPARKLE_POSITIONS.map((pos, index) => (
            <span
              key={index}
              className={styles.sparkle()}
              style={{
                ...pos,
                animation: disabled
                  ? "none"
                  : `glowPulse ${pos.duration} ease-in-out ${pos.delay} infinite`,
                boxShadow: "0 0 6px 2px rgba(255, 215, 0, 0.8)",
              }}
            />
          ))}
        </div>

        {/* 3Bee Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id={`${id}-logo`}
          src={logoUrl}
          alt="3Bee Logo - Buon Natale"
          className={styles.logo()}
          style={{
            boxShadow: imageLoaded
              ? "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(247, 183, 49, 0.3)"
              : "none",
          }}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
      </div>

      {/* Headline */}
      <h1 id={`${id}-headline`} className={styles.headline()}>
        {headline}
      </h1>

      {/* Subheadline */}
      <p id={`${id}-subheadline`} className={styles.subheadline()}>
        {subheadline}
      </p>
    </main>
  );
}

export default HeroContent;
