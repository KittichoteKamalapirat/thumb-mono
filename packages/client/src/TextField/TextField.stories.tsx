import type { ComponentMeta } from "@storybook/react";
import { IoMdImages } from "react-icons/io";
import TextField, { TextFieldProps } from "./TextField";

const Story: ComponentMeta<typeof TextField> = {
  component: TextField,
  title: "TextField",
};

export default Story;

export const Primary = (args: TextFieldProps) => <TextField {...args} />;
export const NoLabel = (args: TextFieldProps) => <TextField {...args} />;
export const LeftIcon = (args: TextFieldProps) => <TextField {...args} />;

Primary.args = {
  hideLabel: false,
  label: "First Name",
  placeholder: "First Name",
  size: "medium",
};

NoLabel.args = {
  hideLabel: true,
  placeholder: "First Name",
  size: "medium",
};

LeftIcon.args = {
  hideLabel: false,
  label: "First Name",
  placeholder: "First Name",
  size: "medium",
  leftIcon: <IoMdImages size="40" />,
};
