import Select, { Option, SelectProps } from "./Select";

import { IoMdImages } from "react-icons/io";
import { TbLanguageHiragana } from "react-icons/tb";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const Story: ComponentMeta<typeof Select> = {
  component: Select,
  title: "Select",
  argTypes: {
    size: {
      options: ["medium", "small", "xs"],
      control: { type: "radio" },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => (
  <Select name="fieldName" {...args} /> // Had to add name otherwise error from react-hook-form
);

export const Primary = Template.bind({});
export const NoLabel = Template.bind({});
export const LeftIcon = Template.bind({});

const valuesNoIcon: Option[] = [
  { id: "1", label: "Durward Reynolds", value: "2" },
  { id: "2", label: "Kenton Towne", value: "2" },
  { id: "3", label: "Therese Wunsch", value: "2" },
  { id: "4", label: "Benedict Kessler", value: "2" },
  { id: "5", label: "Katelyn Rohan", value: "2" },
];

const values: Option[] = [
  {
    id: "1",
    label: "Chase",
    value: "1",
    icon: <IoMdImages />,
  },
  {
    id: "2",
    label: "EarnIn",
    value: "2",
    icon: <IoMdImages />,
  },
  {
    id: "3",
    label: "Home Depot",
    value: "3",
    icon: <IoMdImages />,
  },
  {
    id: "4",
    label: "Walmart",
    value: "4",
    icon: <TbLanguageHiragana />,
  },
  {
    id: "5",
    label: "Mcdonald",
    value: "5",
    icon: <TbLanguageHiragana />,
  },
  {
    id: "6",
    label: "Shell",
    value: "6",
    icon: <TbLanguageHiragana />,
  },
];

Primary.args = {
  label: "Select options",
  size: "medium",
  options: valuesNoIcon,
};
NoLabel.args = {
  label: "",
  size: "medium",
  options: valuesNoIcon,
};

LeftIcon.args = {
  label: "Select options",
  size: "medium",
  options: values,
};
