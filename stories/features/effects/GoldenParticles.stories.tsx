import type { Meta, StoryObj } from "@storybook/react";
import { GoldenParticles } from "@/components/GoldenParticles/GoldenParticles";

const meta: Meta<typeof GoldenParticles> = {
  title: "Features/Effects/GoldenParticles",
  component: GoldenParticles,
  parameters: {
    componentId: "effects-golden-particles",
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    particleCount: {
      control: { type: "range", min: 10, max: 50, step: 5 },
      description: "Number of golden particles",
    },
    enableGlow: {
      control: "boolean",
      description: "Enable glow effect on particles",
    },
    reducedMotion: {
      control: "boolean",
      description: "Disable animations for accessibility",
    },
    paused: {
      control: "boolean",
      description: "Pause all particle animations",
    },
    zIndex: {
      control: { type: "number", min: 0, max: 100 },
      description: "CSS z-index for layering",
    },
    minSize: {
      control: { type: "range", min: 1, max: 10, step: 1 },
      description: "Minimum particle size in pixels",
    },
    maxSize: {
      control: { type: "range", min: 5, max: 20, step: 1 },
      description: "Maximum particle size in pixels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: Golden particles floating with glow effect
 * Standard configuration with 25 particles
 */
export const Default: Story = {
  args: {
    id: "effects-golden-particles-default",
    particleCount: 25,
    enableGlow: true,
  },
};

/**
 * Loading state: Minimal particles during initial load
 * Reduced count for performance during page load
 */
export const Loading: Story = {
  args: {
    id: "effects-golden-particles-loading",
    particleCount: 10,
    enableGlow: false,
  },
};

/**
 * Error/Disabled state: Particles paused
 * Used when animations should be stopped
 */
export const Disabled: Story = {
  args: {
    id: "effects-golden-particles-disabled",
    particleCount: 25,
    paused: true,
    enableGlow: false,
  },
};

/**
 * Reduced Motion: Accessibility-friendly version
 * No animations, respects prefers-reduced-motion
 */
export const ReducedMotion: Story = {
  args: {
    id: "effects-golden-particles-reduced-motion",
    particleCount: 15,
    reducedMotion: true,
    enableGlow: true,
  },
};

/**
 * Mobile: Optimized for mobile devices
 * Fewer particles, smaller sizes for better performance
 */
export const Mobile: Story = {
  args: {
    id: "effects-golden-particles-mobile",
    particleCount: 15,
    minSize: 2,
    maxSize: 5,
    enableGlow: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Dense: Maximum particles for dramatic effect
 * Higher density configuration
 */
export const Dense: Story = {
  args: {
    id: "effects-golden-particles-dense",
    particleCount: 40,
    enableGlow: true,
    minSize: 2,
    maxSize: 10,
  },
};

/**
 * No Glow: Particles without glow effect
 * Simpler visual style
 */
export const NoGlow: Story = {
  args: {
    id: "effects-golden-particles-no-glow",
    particleCount: 25,
    enableGlow: false,
  },
};
