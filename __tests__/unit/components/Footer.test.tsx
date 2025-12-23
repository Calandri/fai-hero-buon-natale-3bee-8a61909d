import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/Footer/Footer";

describe("Footer", () => {
  describe("Rendering", () => {
    it("renders with required id prop", () => {
      render(<Footer id="footer-test" />);

      const footer = document.getElementById("footer-test");
      expect(footer).toBeInTheDocument();
    });

    it("renders default text content", () => {
      render(<Footer id="footer-test" />);

      expect(screen.getByText("Con amore dal")).toBeInTheDocument();
      expect(screen.getByText("Team 3Bee")).toBeInTheDocument();
      expect(screen.getByText("Natale 2024")).toBeInTheDocument();
    });

    it("renders bee emoji", () => {
      render(<Footer id="footer-test" />);

      const textElement = document.getElementById("footer-test-text");
      expect(textElement?.textContent).toContain("🐝");
    });
  });

  describe("Variants", () => {
    it("applies default variant classes", () => {
      render(<Footer id="footer-default" variant="default" />);

      const footer = document.getElementById("footer-default");
      expect(footer).toHaveClass("text-white");
    });

    it("applies minimal variant classes", () => {
      render(<Footer id="footer-minimal" variant="minimal" />);

      const footer = document.getElementById("footer-minimal");
      expect(footer).toHaveClass("text-accent-300");
    });
  });

  describe("States", () => {
    it("renders loading state with skeleton", () => {
      render(<Footer id="footer-loading" isLoading />);

      const footer = document.getElementById("footer-loading");
      expect(footer).toHaveAttribute("aria-busy", "true");
      expect(footer).toHaveAttribute("aria-label", "Caricamento footer");

      const skeleton = document.getElementById("footer-loading-skeleton");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("animate-pulse");
    });

    it("renders disabled state with reduced opacity", () => {
      render(<Footer id="footer-disabled" disabled />);

      const footer = document.getElementById("footer-disabled");
      expect(footer).toHaveAttribute("aria-disabled", "true");
      expect(footer).toHaveClass("opacity-50");
    });

    it("renders normal state with full opacity", () => {
      render(<Footer id="footer-normal" />);

      const footer = document.getElementById("footer-normal");
      expect(footer).toHaveClass("opacity-100");
    });
  });

  describe("Positioning", () => {
    it("has absolute positioning at bottom", () => {
      render(<Footer id="footer-position" />);

      const footer = document.getElementById("footer-position");
      expect(footer).toHaveClass("absolute");
      expect(footer).toHaveClass("bottom-4");
    });

    it("spans full width", () => {
      render(<Footer id="footer-width" />);

      const footer = document.getElementById("footer-width");
      expect(footer).toHaveClass("left-0");
      expect(footer).toHaveClass("right-0");
    });

    it("has correct z-index", () => {
      render(<Footer id="footer-zindex" />);

      const footer = document.getElementById("footer-zindex");
      expect(footer).toHaveClass("z-content");
    });
  });

  describe("Styling", () => {
    it("has centered text", () => {
      render(<Footer id="footer-center" />);

      const footer = document.getElementById("footer-center");
      expect(footer).toHaveClass("text-center");
    });

    it("has wide letter spacing", () => {
      render(<Footer id="footer-spacing" />);

      const footer = document.getElementById("footer-spacing");
      expect(footer).toHaveClass("tracking-wide");
    });

    it("has text shadow for default variant", () => {
      render(<Footer id="footer-shadow" />);

      const footer = document.getElementById("footer-shadow");
      expect(footer?.className).toContain("drop-shadow");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic footer element", () => {
      render(<Footer id="footer-semantic" />);

      const footer = document.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("has aria-busy attribute when loading", () => {
      render(<Footer id="footer-aria-loading" isLoading />);

      const footer = document.getElementById("footer-aria-loading");
      expect(footer).toHaveAttribute("aria-busy", "true");
    });

    it("has aria-disabled attribute when disabled", () => {
      render(<Footer id="footer-aria-disabled" disabled />);

      const footer = document.getElementById("footer-aria-disabled");
      expect(footer).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Custom className", () => {
    it("applies additional className", () => {
      render(<Footer id="footer-custom" className="custom-class" />);

      const footer = document.getElementById("footer-custom");
      expect(footer).toHaveClass("custom-class");
    });
  });
});
