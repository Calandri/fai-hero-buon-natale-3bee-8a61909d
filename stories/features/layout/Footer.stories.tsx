import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components/Footer/Footer";

const meta: Meta<typeof Footer> = {
  title: "Features/Layout/Footer",
  component: Footer,
  parameters: {
    componentId: "layout-footer",
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "HTML ID for testing and tracking",
    },
    text: {
      control: "text",
      description: "Footer text content",
    },
    variant: {
      control: "select",
      options: ["light", "dark"],
      description: "Color variant",
    },
    disabled: {
      control: "boolean",
      description: "Hide the footer",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
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
    id: "footer-default",
  },
};

export const CustomText: Story = {
  args: {
    id: "footer-custom",
    text: "Made with love by 3Bee Team",
  },
};

export const DarkVariant: Story = {
  args: {
    id: "footer-dark",
    variant: "dark",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#f5f5f5",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    id: "footer-disabled",
    disabled: true,
  },
};

export const Mobile: Story = {
  args: {
    id: "footer-mobile",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
