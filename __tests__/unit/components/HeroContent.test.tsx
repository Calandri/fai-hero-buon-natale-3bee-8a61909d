import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HeroContent } from "@/components/HeroContent/HeroContent";
import { HERO_CONTENT_DEFAULTS } from "@/components/HeroContent/HeroContent.props";

describe("HeroContent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders with required id prop", () => {
      render(<HeroContent id="test-hero" />);
      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute("id", "test-hero");
    });

    it("renders logo with correct alt text", () => {
      render(<HeroContent id="test-hero" disabled />);
      const logo = screen.getByAltText("3Bee Logo - Buon Natale");
      expect(logo).toBeInTheDocument();
    });

    it("renders default headline", () => {
      render(<HeroContent id="test-hero" disabled />);
      expect(
        screen.getByText(HERO_CONTENT_DEFAULTS.headline)
      ).toBeInTheDocument();
    });

    it("renders default subheadline", () => {
      render(<HeroContent id="test-hero" disabled />);
      expect(
        screen.getByText(HERO_CONTENT_DEFAULTS.subheadline)
      ).toBeInTheDocument();
    });

    it("renders custom headline", () => {
      const customHeadline = "Custom Holiday Message";
      render(<HeroContent id="test-hero" headline={customHeadline} disabled />);
      expect(screen.getByText(customHeadline)).toBeInTheDocument();
    });

    it("renders custom subheadline", () => {
      const customSubheadline = "Custom Greetings";
      render(
        <HeroContent id="test-hero" subheadline={customSubheadline} disabled />
      );
      expect(screen.getByText(customSubheadline)).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<HeroContent id="test-hero" className="custom-class" />);
      const main = screen.getByRole("main");
      expect(main).toHaveClass("custom-class");
    });

    it("renders data-component-id attribute", () => {
      render(<HeroContent id="test-hero" />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("data-component-id", "hero-content");
    });
  });

  describe("HTML IDs", () => {
    it("renders all required HTML IDs", () => {
      const { container } = render(<HeroContent id="hero-test" disabled />);

      expect(container.querySelector("#hero-test")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-logo-wrapper")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-logo-glow")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-sparkles")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-logo")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-headline")).toBeInTheDocument();
      expect(container.querySelector("#hero-test-subheadline")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("renders loading skeleton when isLoading is true", () => {
      const { container } = render(<HeroContent id="test-hero" isLoading />);

      expect(container.querySelector("#test-hero-skeleton")).toBeInTheDocument();
      expect(screen.queryByAltText("3Bee Logo - Buon Natale")).not.toBeInTheDocument();
    });

    it("sets aria-busy when loading", () => {
      render(<HeroContent id="test-hero" isLoading />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("aria-busy", "true");
    });

    it("sets aria-label for loading state", () => {
      render(<HeroContent id="test-hero" isLoading />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("aria-label", "Caricamento contenuto...");
    });
  });

  describe("Error State", () => {
    it("renders error message when error prop is provided", () => {
      const errorMessage = "Something went wrong";
      render(<HeroContent id="test-hero" error={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("sets role=alert for error state", () => {
      render(<HeroContent id="test-hero" error="Error message" />);
      const main = screen.getByRole("alert");
      expect(main).toBeInTheDocument();
    });

    it("renders error container with correct ID", () => {
      const { container } = render(
        <HeroContent id="test-hero" error="Error message" />
      );

      expect(container.querySelector("#test-hero-error")).toBeInTheDocument();
    });

    it("does not render logo when in error state", () => {
      render(<HeroContent id="test-hero" error="Error" />);
      expect(
        screen.queryByAltText("3Bee Logo - Buon Natale")
      ).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("renders without animations when disabled", () => {
      render(<HeroContent id="test-hero" disabled />);
      const main = screen.getByRole("main");

      expect(main).toHaveStyle({ transition: "none" });
    });

    it("is immediately visible when disabled", () => {
      render(<HeroContent id="test-hero" disabled />);
      const main = screen.getByRole("main");

      expect(main).toHaveStyle({ opacity: "1" });
      expect(main).toHaveStyle({ transform: "translateY(0)" });
    });
  });

  describe("Animation", () => {
    it("starts with hidden state when not disabled", () => {
      render(<HeroContent id="test-hero" />);
      const main = screen.getByRole("main");

      expect(main).toHaveStyle({ opacity: "0" });
    });

    it("becomes visible after animation delay", async () => {
      render(<HeroContent id="test-hero" animationDelay={100} />);
      const main = screen.getByRole("main");

      expect(main).toHaveStyle({ opacity: "0" });

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(main).toHaveStyle({ opacity: "1" });
    });

    it("respects custom animation delay", async () => {
      render(<HeroContent id="test-hero" animationDelay={500} />);
      const main = screen.getByRole("main");

      await act(async () => {
        vi.advanceTimersByTime(400);
      });
      expect(main).toHaveStyle({ opacity: "0" });

      await act(async () => {
        vi.advanceTimersByTime(100);
      });
      expect(main).toHaveStyle({ opacity: "1" });
    });

    it("calls onAnimationComplete callback when animation ends", async () => {
      const onComplete = vi.fn();
      render(
        <HeroContent
          id="test-hero"
          disabled
          onAnimationComplete={onComplete}
        />
      );
      const main = screen.getByRole("main");

      fireEvent.transitionEnd(main);

      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe("Logo", () => {
    it("uses custom logo URL when provided", () => {
      const customUrl = "https://example.com/logo.png";
      render(<HeroContent id="test-hero" logoUrl={customUrl} disabled />);
      const logo = screen.getByAltText("3Bee Logo - Buon Natale");

      expect(logo).toHaveAttribute("src", customUrl);
    });

    it("uses default logo URL when not provided", () => {
      render(<HeroContent id="test-hero" disabled />);
      const logo = screen.getByAltText("3Bee Logo - Buon Natale");

      expect(logo).toHaveAttribute("src", HERO_CONTENT_DEFAULTS.logoUrl);
    });

    it("has eager loading attribute", () => {
      render(<HeroContent id="test-hero" disabled />);
      const logo = screen.getByAltText("3Bee Logo - Buon Natale");

      expect(logo).toHaveAttribute("loading", "eager");
    });
  });

  describe("Christmas Decorations", () => {
    it("renders golden glow element", () => {
      const { container } = render(<HeroContent id="test-hero" disabled />);
      const glow = container.querySelector("#test-hero-logo-glow");

      expect(glow).toBeInTheDocument();
      expect(glow).toHaveAttribute("aria-hidden", "true");
    });

    it("renders sparkle container", () => {
      const { container } = render(<HeroContent id="test-hero" disabled />);
      const sparkles = container.querySelector("#test-hero-sparkles");

      expect(sparkles).toBeInTheDocument();
      expect(sparkles).toHaveAttribute("aria-hidden", "true");
    });

    it("renders 8 sparkle elements", () => {
      const { container } = render(<HeroContent id="test-hero" disabled />);
      const sparklesContainer = container.querySelector("#test-hero-sparkles");
      const sparkles = sparklesContainer?.querySelectorAll("span");

      expect(sparkles).toHaveLength(8);
    });
  });

  describe("Accessibility", () => {
    it("uses semantic main element", () => {
      render(<HeroContent id="test-hero" />);
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("headline is an h1 element", () => {
      render(<HeroContent id="test-hero" disabled />);
      const headline = screen.getByRole("heading", { level: 1 });

      expect(headline).toBeInTheDocument();
      expect(headline).toHaveTextContent(HERO_CONTENT_DEFAULTS.headline);
    });

    it("decorative elements have aria-hidden", () => {
      const { container } = render(<HeroContent id="test-hero" disabled />);
      const glow = container.querySelector("#test-hero-logo-glow");
      const sparkles = container.querySelector("#test-hero-sparkles");

      expect(glow).toHaveAttribute("aria-hidden", "true");
      expect(sparkles).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Image Loading", () => {
    it("applies glow shadow after image loads", () => {
      render(<HeroContent id="test-hero" disabled />);
      const logo = screen.getByAltText("3Bee Logo - Buon Natale");

      expect(logo).toHaveStyle({ boxShadow: "none" });

      fireEvent.load(logo);

      expect(logo).toHaveStyle({
        boxShadow:
          "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(247, 183, 49, 0.3)",
      });
    });
  });
});
