/// <reference types="vite-plugin-svgr/client" />
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactComponent as CameraIcon } from "../../../assets/brutal-camera.svg";

import Button, { BUTTON_SIZE, BUTTON_TYPE, BUTTON_WIDTH } from "./Button";

export default {
  // title: `${Namespaces.DesignSystem}/Button`,
  title: "Button",
  //   title: "DesignSystem/Button",
  component: Button,
  args: {
    size: BUTTON_SIZE.MEDIUM,
    width: BUTTON_WIDTH.INHERIT,
    label: "BUTTON",
    onClick: () => undefined,
    disabled: false,
  },
  argTypes: {
    size: { options: BUTTON_SIZE },
    type: { options: BUTTON_TYPE },
    width: { options: BUTTON_WIDTH },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: BUTTON_TYPE.PRIMARY,
};

export const PrimaryLeftIcon = Template.bind({});
PrimaryLeftIcon.storyName = "Primary (left icon)";
PrimaryLeftIcon.args = {
  type: BUTTON_TYPE.PRIMARY,
  leftIcon: CameraIcon,
};

export const PrimaryRightIcon = Template.bind({});
PrimaryRightIcon.storyName = "Primary (right icon)";
PrimaryRightIcon.args = {
  type: BUTTON_TYPE.PRIMARY,
  rightIcon: CameraIcon,
};

export const PrimaryFullWidth = Template.bind({});
PrimaryFullWidth.storyName = "Primary (full width)";
PrimaryFullWidth.args = {
  type: BUTTON_TYPE.PRIMARY,
  width: BUTTON_WIDTH.FULL,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: BUTTON_TYPE.SECONDARY,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: BUTTON_TYPE.TERTIARY,
};

export const TertiarySelected = Template.bind({});
TertiarySelected.storyName = "Tertiary (selected)";
TertiarySelected.args = {
  type: BUTTON_TYPE.TERTIARY,
  isSelected: true,
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  type: BUTTON_TYPE.QUATERNARY,
};

export const QuaternarySelected = Template.bind({});
QuaternarySelected.storyName = "Quaternary (selected)";
QuaternarySelected.args = {
  type: BUTTON_TYPE.QUATERNARY,
  isSelected: true,
};

export const DangerPrimary = Template.bind({});
DangerPrimary.args = {
  type: BUTTON_TYPE.DANGER_PRIMARY,
};

export const DangerSecondary = Template.bind({});
DangerSecondary.args = {
  type: BUTTON_TYPE.DANGER_SECONDARY,
};

export const DangerTertiary = Template.bind({});
DangerTertiary.args = {
  type: BUTTON_TYPE.DANGER_TERTIARY,
};
