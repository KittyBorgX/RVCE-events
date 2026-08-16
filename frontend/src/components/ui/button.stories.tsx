import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost", "pill"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-[#4a32f9] min-h-[160px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Sign in with RVCE Mail",
    variant: "primary",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "View Events Catalog",
    variant: "outline",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Explore Guidelines",
    variant: "ghost",
    size: "md",
  },
};

export const Pill: Story = {
  args: {
    children: "100 AICTE Points",
    variant: "pill",
  },
};

export const Loading: Story = {
  args: {
    children: "Authenticating...",
    variant: "primary",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Registration Closed",
    variant: "primary",
    disabled: true,
  },
};
