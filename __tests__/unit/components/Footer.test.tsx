import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/Footer/Footer";

describe("Footer", () => {
  describe("Rendering", () => {
    it("renders with required id prop", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toBeInTheDocument();
    });

    it("renders default text when no text prop provided", () => {
      render(<Footer id="test-footer" />);
      expect(screen.getByText(/Con amore dal Team/)).toBeInTheDocument();
      expect(screen.getByText("3Bee")).toBeInTheDocument();
      expect(screen.getByText(/Natale 2024/)).toBeInTheDocument();
    });

    it("renders custom text when provided", () => {
      render(<Footer id="test-footer" text="Custom footer text" />);
      expect(screen.getByText("Custom footer text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Footer id="test-footer" className="custom-class" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("custom-class");
    });

    it("highlights 3Bee text with special styling", () => {
      render(<Footer id="test-footer" />);
      const highlight = screen.getByText("3Bee");
      expect(highlight.tagName).toBe("SPAN");
    });
  });

  describe("Variant styling", () => {
    it("applies light variant by default", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("data-variant", "light");
    });

    it("applies light variant when specified", () => {
      render(<Footer id="test-footer" variant="light" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("data-variant", "light");
    });

    it("applies dark variant when specified", () => {
      render(<Footer id="test-footer" variant="dark" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("data-variant", "dark");
    });
  });

  describe("Disabled state", () => {
    it("adds disabled data attribute when disabled", () => {
      render(<Footer id="test-footer" disabled />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("data-disabled", "true");
    });

    it("has hidden class when disabled", () => {
      render(<Footer id="test-footer" disabled />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("hidden");
    });

    it("does not have disabled attribute when not disabled", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).not.toHaveAttribute("data-disabled");
    });
  });

  describe("Positioning", () => {
    it("has absolute positioning class", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("absolute");
    });

    it("is positioned at bottom", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("bottom-4");
    });

    it("is horizontally centered", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("justify-center");
    });

    it("has correct z-index", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveClass("z-[5]");
    });
  });

  describe("Accessibility", () => {
    it("has role contentinfo for semantic footer", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("role", "contentinfo");
    });

    it("has aria-label for screen readers", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer).toHaveAttribute("aria-label", "Footer");
    });

    it("uses semantic footer element", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      expect(footer.tagName).toBe("FOOTER");
    });
  });

  describe("Typography", () => {
    it("contains paragraph element for text", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      const paragraph = footer.querySelector("p");
      expect(paragraph).toBeInTheDocument();
    });

    it("applies text-sm class for typography", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      const paragraph = footer.querySelector("p");
      expect(paragraph).toHaveClass("text-sm");
    });

    it("applies tracking-wide for letter spacing", () => {
      render(<Footer id="test-footer" />);
      const footer = screen.getByTestId("test-footer");
      const paragraph = footer.querySelector("p");
      expect(paragraph).toHaveClass("tracking-wide");
    });
  });

  describe("Text without 3Bee", () => {
    it("renders plain text without highlight when 3Bee not present", () => {
      render(<Footer id="test-footer" text="Hello World" />);
      const footer = screen.getByTestId("test-footer");
      expect(screen.getByText("Hello World")).toBeInTheDocument();
      const spans = footer.querySelectorAll("span");
      expect(spans.length).toBe(0);
    });
  });
});
