import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GoldenParticles } from "@/components/GoldenParticles/GoldenParticles";
import {
  GOLDEN_COLORS,
  GOLDEN_PARTICLES_DEFAULTS,
} from "@/components/GoldenParticles/GoldenParticles.props";

describe("GoldenParticles", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders with required id prop", () => {
      render(<GoldenParticles id="test-golden-particles" />);
      const container = screen.getByTestId("test-golden-particles");
      expect(container).toBeInTheDocument();
    });

    it("renders the correct default number of particles", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');
      expect(particles.length).toBe(GOLDEN_PARTICLES_DEFAULTS.particleCount);
    });

    it("renders custom number of particles when particleCount is specified", () => {
      const customCount = 15;
      render(<GoldenParticles id="test-particles" particleCount={customCount} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');
      expect(particles.length).toBe(customCount);
    });

    it("applies custom className to container", () => {
      render(<GoldenParticles id="test-particles" className="custom-class" />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("Particle Properties", () => {
    it("each particle has unique positioning", () => {
      render(<GoldenParticles id="test-particles" particleCount={10} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      const positions = new Set<string>();
      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        positions.add(style);
      });

      // All particles should have unique styles (positions)
      expect(positions.size).toBe(particles.length);
    });

    it("particles use colors from GOLDEN_COLORS palette", () => {
      render(<GoldenParticles id="test-particles" particleCount={20} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        const hasGoldenColor = GOLDEN_COLORS.some((color) =>
          style.toLowerCase().includes(color.toLowerCase())
        );
        expect(hasGoldenColor).toBe(true);
      });
    });

    it("particles have size within configured range", () => {
      const minSize = 4;
      const maxSize = 10;
      render(
        <GoldenParticles
          id="test-particles"
          particleCount={20}
          minSize={minSize}
          maxSize={maxSize}
        />
      );
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        const widthMatch = style.match(/width:\s*(\d+(?:\.\d+)?)/);
        if (widthMatch) {
          const size = parseFloat(widthMatch[1]);
          expect(size).toBeGreaterThanOrEqual(minSize);
          expect(size).toBeLessThanOrEqual(maxSize);
        }
      });
    });
  });

  describe("Animation States", () => {
    it("particles have animation when not paused", () => {
      render(<GoldenParticles id="test-particles" paused={false} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        expect(style).toMatch(/animation/i);
      });
    });

    it("particles have paused animation state when paused prop is true", () => {
      render(<GoldenParticles id="test-particles" paused={true} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        expect(style).toMatch(/animation-play-state:\s*paused/i);
      });
    });

    it("disables animations when reducedMotion is true", () => {
      render(<GoldenParticles id="test-particles" reducedMotion={true} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        // Should either have no animation or animation: none
        expect(style).toMatch(/animation:\s*none|animation-play-state:\s*paused/i);
      });
    });
  });

  describe("Glow Effect", () => {
    it("applies glow effect when enableGlow is true (default)", () => {
      render(<GoldenParticles id="test-particles" enableGlow={true} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        expect(style).toMatch(/box-shadow/i);
      });
    });

    it("does not apply glow effect when enableGlow is false", () => {
      render(<GoldenParticles id="test-particles" enableGlow={false} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        expect(style).not.toMatch(/box-shadow/i);
      });
    });
  });

  describe("Z-Index and Layering", () => {
    it("uses default z-index from constants", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveStyle({
        zIndex: String(GOLDEN_PARTICLES_DEFAULTS.zIndex),
      });
    });

    it("applies custom z-index when specified", () => {
      render(<GoldenParticles id="test-particles" zIndex={10} />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveStyle({ zIndex: "10" });
    });
  });

  describe("Container Styling", () => {
    it("container covers full viewport", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");

      expect(container).toHaveStyle({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      });
    });

    it("container has pointer-events none to allow interaction through", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveStyle({ pointerEvents: "none" });
    });

    it("container has overflow hidden", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveStyle({ overflow: "hidden" });
    });
  });

  describe("Accessibility", () => {
    it("has aria-hidden true as it is decorative", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      expect(container).toHaveAttribute("aria-hidden", "true");
    });

    it("does not trap focus", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      expect(container).not.toHaveAttribute("tabIndex");
    });
  });

  describe("Performance", () => {
    it("uses CSS transforms for GPU acceleration", () => {
      render(<GoldenParticles id="test-particles" />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');

      particles.forEach((particle) => {
        const style = particle.getAttribute("style") || "";
        // Should use transform or will-change for GPU acceleration
        expect(style).toMatch(/transform|will-change/i);
      });
    });

    it("limits particle count to reasonable maximum", () => {
      render(<GoldenParticles id="test-particles" particleCount={100} />);
      const container = screen.getByTestId("test-particles");
      const particles = container.querySelectorAll('[data-particle="true"]');
      // Should cap at 50 for performance
      expect(particles.length).toBeLessThanOrEqual(50);
    });
  });
});
