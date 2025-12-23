/**
 * HeroContent Component
 *
 * TODO: Implementare questo componente
 * Specs: Contenuto centrale hero - Logo 3Bee (da URL esterno) con decorazioni natalizie CSS
 * (glow dorato, stelline), headline creativa, sottotitolo auguri.
 * Layout centrato verticalmente e orizzontalmente.
 * Animazione entrata fade-in + slide-up.
 *
 * - logo_url: https://blog.3bee.com/_next/image/?url=...
 * - logo_decoration: golden glow + sparkle particles around
 * - headline: "Quest'anno le nostre api hanno imparato a dire HO HO HONEY!"
 * - subheadline: "Tanti auguri di Buone Feste!"
 * - typography: headline 2.5rem mobile / 4rem desktop, playful font
 * - entrance_animation: fade-in 0.8s + translateY 20px
 * - z_index: 5
 */

import React from "react";
import type { HeroContentProps } from "./HeroContent.props";

export function HeroContent({ id, className }: HeroContentProps): React.JSX.Element {
  return (
    <main id={id} className={`hero-content ${className ?? ""}`}>
      {/* TODO: implementare UI - logo, headline, subheadline con animazioni */}
    </main>
  );
}

export default HeroContent;
