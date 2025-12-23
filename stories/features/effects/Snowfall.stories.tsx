import type { Meta, StoryObj } from "@storybook/react";
import { Snowfall } from "@/components/Snowfall/Snowfall";

const meta: Meta<typeof Snowfall> = {
  title: "Features/Effects/Snowfall",
  component: Snowfall,
  parameters: {
    componentId: "effects-snowfall",
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "HTML ID for testing and tracking",
    },
    particleCount: {
      control: { type: "range", min: 10, max: 50, step: 5 },
      description: "Number of snowflakes (max 50 for performance)",
    },
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
      description: "Animation speed",
    },
    intensity: {
      control: "select",
      options: ["light", "normal", "heavy"],
      description: "Snow intensity/density",
    },
    windIntensity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Wind intensity for lateral movement",
    },
    disabled: {
      control: "boolean",
      description: "Disable animation",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "snowfall-default",
    particleCount: 40,
    speed: "normal",
    intensity: "normal",
    windIntensity: 0.3,
  },
};

export const LightSnow: Story = {
  args: {
    id: "snowfall-light",
    particleCount: 20,
    speed: "slow",
    intensity: "light",
    windIntensity: 0.2,
  },
};

export const HeavySnow: Story = {
  args: {
    id: "snowfall-heavy",
    particleCount: 50,
    speed: "fast",
    intensity: "heavy",
    windIntensity: 0.5,
  },
};

export const Disabled: Story = {
  args: {
    id: "snowfall-disabled",
    particleCount: 40,
    disabled: true,
  },
};

export const Mobile: Story = {
  args: {
    id: "snowfall-mobile",
    particleCount: 30,
    speed: "normal",
    intensity: "normal",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};
