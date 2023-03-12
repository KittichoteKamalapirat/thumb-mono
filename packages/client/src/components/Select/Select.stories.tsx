import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useForm } from "react-hook-form";
import { IoMdImages } from "react-icons/io";
import { TbLanguageHiragana } from "react-icons/tb";
import Select, { Option, SelectProps } from "./Select";

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

const Template: ComponentStory<typeof Select> = (args: SelectProps) => {
  const name = "fieldName";
  const { control, register } = useForm();
  return (
    <Select
      {...args}
      control={control}
      name={name}
      onChange={register(name).onChange}
    />
  );
};

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
    label: "Thumbnail",
    value: "1",
    icon: <IoMdImages size="28" />,
  },
  {
    id: "2",
    label: "Title",
    value: "2",
    icon: <TbLanguageHiragana size="28" />,
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
