/**
 * BeeAnimation Component
 *
 * TODO: Implementare questo componente
 * Specs: Easter egg - apina SVG con cappello Babbo Natale che attraversa lo schermo
 * ogni 8-12 secondi. Entra da sinistra, esce a destra con traiettoria curva.
 * Ali che battono. Cappellino rosso natalizio.
 *
 * - bee_size: 40-60px
 * - path: bezier curve left-to-right
 * - timing: 8-12s interval, 4s duration crossing
 * - wings: CSS animation flap 0.1s
 * - hat: red Santa hat SVG on bee head
 * - z_index: 10
 */

import React from "react";
import type { BeeAnimationProps } from "./BeeAnimation.props";

export function BeeAnimation({ id, className }: BeeAnimationProps): React.JSX.Element {
  return (
    <div id={id} className={`bee-animation ${className ?? ""}`}>
      {/* TODO: implementare UI - apina SVG con cappello natalizio */}
    </div>
  );
}

export default BeeAnimation;
