import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components/Footer/Footer";

const meta: Meta<typeof Footer> = {
  title: "Features/Footer",
  component: Footer,
  parameters: {
    componentId: "footer-christmas",
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "darker", value: "#0f0f23" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "minimal"],
    },
    isLoading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "footer-christmas-default",
  },
};

export const Loading: Story = {
  args: {
    id: "footer-christmas-loading",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "footer-christmas-disabled",
    disabled: true,
  },
};

export const Minimal: Story = {
  args: {
    id: "footer-christmas-minimal",
    variant: "minimal",
  },
};

export const CustomText: Story = {
  args: {
    id: "footer-christmas-custom",
    text: "Buone Feste dal Team 3Bee!",
  },
};

export const Mobile: Story = {
  args: {
    id: "footer-christmas-mobile",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
