import { IoMdImages } from "react-icons/io";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { BUTTON_SIZE, BUTTON_TYPE } from "./Button";
import IconButton from "./IconButton";

export default {
  title: "IconButton",
  component: IconButton,
  args: {
    size: BUTTON_SIZE.MEDIUM,
    onClick: () => undefined,
    disabled: false,
  },
  argTypes: {
    size: { options: BUTTON_SIZE },
    type: { options: BUTTON_TYPE },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  type: BUTTON_TYPE.PRIMARY,
  icon: IoMdImages,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: BUTTON_TYPE.SECONDARY,
  icon: IoMdImages,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: BUTTON_TYPE.TERTIARY,
  icon: IoMdImages,
};

export const Quarternary = Template.bind({});
Quarternary.args = {
  type: BUTTON_TYPE.QUATERNARY,
  icon: IoMdImages,
};
