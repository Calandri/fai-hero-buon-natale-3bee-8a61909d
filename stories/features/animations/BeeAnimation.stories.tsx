import type { Meta, StoryObj } from "@storybook/react";
import { BeeAnimation } from "@/components/BeeAnimation/BeeAnimation";

const meta: Meta<typeof BeeAnimation> = {
  title: "Features/Animations/BeeAnimation",
  component: BeeAnimation,
  parameters: {
    componentId: "bee-animation",
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Easter egg: apina SVG con cappello Babbo Natale che attraversa lo schermo ogni 8-12 secondi.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vw",
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
  argTypes: {
    minInterval: {
      control: { type: "number", min: 1, max: 30 },
      description: "Intervallo minimo tra animazioni (secondi)",
    },
    maxInterval: {
      control: { type: "number", min: 1, max: 60 },
      description: "Intervallo massimo tra animazioni (secondi)",
    },
    crossingDuration: {
      control: { type: "number", min: 1, max: 10 },
      description: "Durata attraversamento (secondi)",
    },
    beeSize: {
      control: { type: "number", min: 20, max: 100 },
      description: "Dimensione ape (pixel)",
    },
    disabled: {
      control: "boolean",
      description: "Disabilita l'animazione",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "bee-animation-default",
    minInterval: 2,
    maxInterval: 4,
  },
};

export const FastInterval: Story = {
  args: {
    id: "bee-animation-fast",
    minInterval: 1,
    maxInterval: 2,
    crossingDuration: 2,
  },
};

export const LargeBee: Story = {
  args: {
    id: "bee-animation-large",
    beeSize: 80,
    minInterval: 2,
    maxInterval: 3,
  },
};

export const Disabled: Story = {
  args: {
    id: "bee-animation-disabled",
    disabled: true,
  },
};

export const Mobile: Story = {
  args: {
    id: "bee-animation-mobile",
    beeSize: 40,
    minInterval: 3,
    maxInterval: 5,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};
