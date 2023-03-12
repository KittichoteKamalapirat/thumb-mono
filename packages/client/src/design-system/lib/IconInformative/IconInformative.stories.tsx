import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReactComponent as ClockIcon } from "../../../assets/clock-icon.svg";
import { ReactComponent as ImageIcon } from "../../../assets/image.svg";
import { ReactComponent as CameraIcon } from "../../../assets/brutal-camera.svg";
import { IconInformative } from "./IconInformative";

const Story: ComponentMeta<typeof IconInformative> = {
  component: IconInformative,
  // title: `${Namespaces.DesignSystem}/IconInformative`,
  title: "DesignSystem/IconInformative",
  argTypes: {
    size: {
      options: ["xxl", "xl", "large", "medium", "small", "xs"],
      control: "radio",
    },
    context: {
      options: ["contained", "standalone"],
      control: "radio",
    },
    background: {
      options: ["default", "lightblue", "lightgrey"],
      control: "radio",
    },
  },
};
export default Story;

const Template: ComponentStory<typeof IconInformative> = (args) => (
  <IconInformative {...args} />
);

export const Primary = Template.bind({});
export const Primary2 = Template.bind({});
export const Standalone = Template.bind({});
export const Contained = Template.bind({});

Primary.args = {
  size: "large",
  context: "contained",
  background: "lightblue",
  children: CameraIcon,
};

Primary2.args = {
  size: "large",
  context: "contained",
  background: "lightblue",
  children: ClockIcon,
};

Standalone.args = {
  size: "large",
  context: "standalone",
  background: "lightblue",
  children: ImageIcon,
};

Contained.args = {
  size: "large",
  context: "contained",
  background: "lightblue",
  children: ImageIcon,
};
