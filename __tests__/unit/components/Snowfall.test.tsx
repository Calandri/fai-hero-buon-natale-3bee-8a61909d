import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Snowfall } from "@/components/Snowfall/Snowfall";

describe("Snowfall", () => {
  describe("Rendering", () => {
    it("renders with required id prop", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toBeInTheDocument();
    });

    it("renders the correct number of snowflakes (default: 40)", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");
      expect(snowflakes.length).toBe(40);
    });

    it("renders custom particle count", () => {
      render(<Snowfall id="test-snowfall" particleCount={25} />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");
      expect(snowflakes.length).toBe(25);
    });

    it("caps particle count at 50 for performance", () => {
      render(<Snowfall id="test-snowfall" particleCount={100} />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");
      expect(snowflakes.length).toBe(50);
    });

    it("applies custom className", () => {
      render(<Snowfall id="test-snowfall" className="custom-class" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("Speed variants", () => {
    it("applies slow speed class", () => {
      render(<Snowfall id="test-snowfall" speed="slow" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-speed", "slow");
    });

    it("applies normal speed class (default)", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-speed", "normal");
    });

    it("applies fast speed class", () => {
      render(<Snowfall id="test-snowfall" speed="fast" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-speed", "fast");
    });
  });

  describe("Intensity variants", () => {
    it("applies light intensity", () => {
      render(<Snowfall id="test-snowfall" intensity="light" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-intensity", "light");
    });

    it("applies normal intensity (default)", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-intensity", "normal");
    });

    it("applies heavy intensity", () => {
      render(<Snowfall id="test-snowfall" intensity="heavy" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-intensity", "heavy");
    });
  });

  describe("Wind intensity", () => {
    it("applies default wind intensity (0.3)", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-wind", "0.3");
    });

    it("applies custom wind intensity", () => {
      render(<Snowfall id="test-snowfall" windIntensity={0.8} />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-wind", "0.8");
    });

    it("clamps wind intensity to 0-1 range", () => {
      render(<Snowfall id="test-snowfall" windIntensity={1.5} />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-wind", "1");
    });
  });

  describe("Disabled state", () => {
    it("renders without animation when disabled", () => {
      render(<Snowfall id="test-snowfall" disabled />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("data-disabled", "true");
    });

    it("hides snowflakes when disabled", () => {
      render(<Snowfall id="test-snowfall" disabled />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");
      expect(snowflakes.length).toBe(0);
    });
  });

  describe("Accessibility", () => {
    it("has aria-hidden attribute for decorative content", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("aria-hidden", "true");
    });

    it("has role presentation for screen readers", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      expect(container).toHaveAttribute("role", "presentation");
    });
  });

  describe("Snowflake properties", () => {
    it("snowflakes have varying sizes", () => {
      render(<Snowfall id="test-snowfall" particleCount={10} />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");

      const sizes = new Set<string>();
      snowflakes.forEach((flake) => {
        const size = flake.getAttribute("data-size");
        if (size) sizes.add(size);
      });

      expect(sizes.size).toBeGreaterThan(1);
    });

    it("snowflakes are positioned randomly across viewport", () => {
      render(<Snowfall id="test-snowfall" particleCount={10} />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");

      const positions = new Set<string>();
      snowflakes.forEach((flake) => {
        const left = flake.getAttribute("style");
        if (left) positions.add(left);
      });

      expect(positions.size).toBeGreaterThan(1);
    });
  });

  describe("Performance", () => {
    it("uses will-change for GPU acceleration", () => {
      render(<Snowfall id="test-snowfall" />);
      const container = screen.getByTestId("test-snowfall");
      const snowflakes = container.querySelectorAll("[data-snowflake]");

      snowflakes.forEach((flake) => {
        expect(flake).toHaveStyle({ willChange: "transform" });
      });
    });
  });
});
