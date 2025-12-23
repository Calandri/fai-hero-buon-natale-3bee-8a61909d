/**
 * Page Assembly - Main Landing Page
 *
 * TODO: Assemblaggio finale page.tsx
 * Specs: Importa tutti i componenti, layout full viewport 100vh con overflow hidden (no scroll!),
 * background gradient scuro caldo (dal nero al viola scuro), layering corretto z-index.
 *
 * - viewport: 100vh, overflow: hidden
 * - background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)
 * - layering_order: bg -> snow(1) -> particles(2) -> content(5) -> bee(10)
 */

import { Snowfall } from "@/components/Snowfall/Snowfall";
import { GoldenParticles } from "@/components/GoldenParticles/GoldenParticles";
import { BeeAnimation } from "@/components/BeeAnimation/BeeAnimation";
import { HeroContent } from "@/components/HeroContent/HeroContent";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div
      id="hero-page"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-dark"
    >
      {/* Background Effects Layer */}
      <Snowfall id="effects-snowfall" className="absolute inset-0 z-snow" />
      <GoldenParticles id="effects-golden-particles" className="absolute inset-0 z-particles" />

      {/* Content Layer */}
      <HeroContent id="content-hero" className="relative z-content" />

      {/* Footer */}
      <Footer id="content-footer" className="absolute bottom-4 left-0 right-0 z-content" />

      {/* Easter Egg - Animated Bee */}
      <BeeAnimation id="effects-bee" className="absolute z-bee" />
    </div>
  );
}
