import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BeeAnimation } from "@/components/BeeAnimation/BeeAnimation";

describe("BeeAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders with the correct id", () => {
      render(<BeeAnimation id="test-bee" />);
      expect(screen.getByTestId("test-bee")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<BeeAnimation id="test-bee" className="custom-class" />);
      expect(screen.getByTestId("test-bee")).toHaveClass("custom-class");
    });

    it("renders the bee SVG with Santa hat", async () => {
      render(<BeeAnimation id="test-bee" minInterval={0.1} maxInterval={0.1} />);

      await act(async () => {
        vi.advanceTimersByTime(200);
      });

      const beeElement = screen.getByTestId("test-bee-svg");
      expect(beeElement).toBeInTheDocument();
    });

    it("renders nothing visible initially (bee appears after interval)", () => {
      render(<BeeAnimation id="test-bee" />);
      expect(screen.queryByTestId("test-bee-svg")).not.toBeInTheDocument();
    });
  });

  describe("Animation Behavior", () => {
    it("starts animation after random interval between min and max", async () => {
      const onCrossStart = vi.fn();
      render(
        <BeeAnimation
          id="test-bee"
          minInterval={1}
          maxInterval={2}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(500);
      });
      expect(onCrossStart).not.toHaveBeenCalled();

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      expect(onCrossStart).toHaveBeenCalled();
    });

    it("calls onCrossEnd after crossing duration", async () => {
      const onCrossEnd = vi.fn();
      render(
        <BeeAnimation
          id="test-bee"
          minInterval={0.1}
          maxInterval={0.1}
          crossingDuration={1}
          onCrossEnd={onCrossEnd}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(200);
      });
      expect(onCrossEnd).not.toHaveBeenCalled();

      await act(async () => {
        vi.advanceTimersByTime(1100);
      });
      expect(onCrossEnd).toHaveBeenCalled();
    });

    it("repeats animation cycle", async () => {
      const onCrossStart = vi.fn();
      render(
        <BeeAnimation
          id="test-bee"
          minInterval={1}
          maxInterval={1}
          crossingDuration={1}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(1100);
      });
      expect(onCrossStart).toHaveBeenCalledTimes(1);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(onCrossStart).toHaveBeenCalledTimes(2);
    });
  });

  describe("Disabled State", () => {
    it("does not animate when disabled", async () => {
      const onCrossStart = vi.fn();
      render(
        <BeeAnimation
          id="test-bee"
          disabled
          minInterval={0.1}
          maxInterval={0.1}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(onCrossStart).not.toHaveBeenCalled();
      expect(screen.queryByTestId("test-bee-svg")).not.toBeInTheDocument();
    });

    it("stops animation when disabled prop changes to true", async () => {
      const onCrossStart = vi.fn();
      const { rerender } = render(
        <BeeAnimation
          id="test-bee"
          minInterval={0.5}
          maxInterval={0.5}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(600);
      });
      expect(onCrossStart).toHaveBeenCalledTimes(1);

      rerender(
        <BeeAnimation
          id="test-bee"
          disabled
          minInterval={0.5}
          maxInterval={0.5}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      expect(onCrossStart).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props Configuration", () => {
    it("uses default values when props not provided", () => {
      render(<BeeAnimation id="test-bee" />);
      const container = screen.getByTestId("test-bee");
      expect(container).toBeInTheDocument();
    });

    it("applies custom beeSize", async () => {
      render(
        <BeeAnimation
          id="test-bee"
          beeSize={80}
          minInterval={0.1}
          maxInterval={0.1}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(200);
      });

      const beeSvg = screen.getByTestId("test-bee-svg");
      expect(beeSvg).toHaveAttribute("width", "80");
      expect(beeSvg).toHaveAttribute("height", "80");
    });
  });

  describe("Accessibility", () => {
    it("respects prefers-reduced-motion", async () => {
      const matchMediaMock = vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      window.matchMedia = matchMediaMock;

      const onCrossStart = vi.fn();
      render(
        <BeeAnimation
          id="test-bee"
          minInterval={0.1}
          maxInterval={0.1}
          onCrossStart={onCrossStart}
        />
      );

      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(onCrossStart).not.toHaveBeenCalled();
    });

    it("has appropriate aria-hidden attribute", async () => {
      render(
        <BeeAnimation id="test-bee" minInterval={0.1} maxInterval={0.1} />
      );

      await act(async () => {
        vi.advanceTimersByTime(200);
      });

      const container = screen.getByTestId("test-bee");
      expect(container).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Cleanup", () => {
    it("cleans up timers on unmount", async () => {
      const onCrossStart = vi.fn();
      const { unmount } = render(
        <BeeAnimation
          id="test-bee"
          minInterval={1}
          maxInterval={1}
          onCrossStart={onCrossStart}
        />
      );

      unmount();

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(onCrossStart).not.toHaveBeenCalled();
    });
  });
});
