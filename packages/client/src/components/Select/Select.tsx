import React, { Fragment, useState } from "react";

import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";

import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import { getClassName } from "../../TextField/TextField";

type Size = "medium" | "small" | "xs"; // TODO:
export interface Option {
  value: string;
  label: string;
  id: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: Option[];
  value: string;
  density: "comfort" | "condensed"; // TODO: Implement
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  size: Size;
  label: string;
}

const backgroundOptionClass =
  "hover:bg-interactive/[0.04] active:bg-interactive/[0.12] disabled:bg-primary/[0.04] active:bg-interactive/[0.08] focus:bg-interactive/[0.04]";
const borderOptionClass =
  "focus:border-interactive focus:border rounded-[8px] p-4";

const Select = ({ size, label, options }: SelectProps) => {
  const {
    labelClassName,
    inputClassName,
    rightIconClassName,
    leftIconClassName,
    valueClassName,
    fontSizeClassName,
  } = getClassName({ size, leftIcon: options[0]?.icon, hideLabel: !label });
  const [value, setValue] = useState(options[0]);
  return (
    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <Listbox.Button role="list" className="w-[375px]">
            <div className={clsx("relative flex items-center", inputClassName)}>
              {value?.icon ? (
                <div className={leftIconClassName}>{value.icon}</div>
              ) : null}
              <label className={valueClassName}>{value.label}</label>
              <label className={labelClassName}>{label}</label>
              {open ? (
                <FiChevronUp
                  className={clsx("h-6 w-6", "ml-auto", rightIconClassName)}
                />
              ) : (
                <FiChevronDown
                  className={clsx("h-6 w-6", "ml-auto", rightIconClassName)}
                />
              )}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="w-[375px] rounded-[8px] shadow-menu">
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      active && "bg-interactive/[0.08]",
                      backgroundOptionClass,
                      borderOptionClass
                    )
                  }
                >
                  <div tabIndex={index} className={clsx("flex items-center")}>
                    {option?.icon ? (
                      <div className="mr-3">{option.icon}</div>
                    ) : null}
                    <div className={fontSizeClassName}>{option.label}</div>
                    <FiChevronRight className={clsx("h-6 w-6", "ml-auto")} />
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default Select;
