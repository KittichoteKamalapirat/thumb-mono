import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
  FiChevronDown as ChevronDown,
  FiChevronRight as ChevronRight,
  FiChevronUp as ChevronUp,
} from "react-icons/fi";
import { getClassName } from "../../TextField/TextField";

type Size = "medium" | "small" | "xs"; // TODO:
export interface Option {
  value: string;
  label: string;
  id: string;
  icon?: React.ReactNode;
}

const emptyOption: Option = {
  value: "",
  label: "Please select an option",
  id: "",
};
export interface SelectProps {
  options: Option[];
  density: "comfort" | "condensed"; // TODO: Implement
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  size: Size;
  label: string;
  className?: string;
}

const backgroundOptionClass =
  "hover:bg-interactive/[0.04] active:bg-interactive/[0.12] disabled:bg-primary/[0.04] active:bg-interactive/[0.08] focus:bg-interactive/[0.04]";
const borderOptionClass =
  "focus:border-interactive focus:border rounded-[8px] p-4";

const Select = (props: SelectProps & UseControllerProps) => {
  const { size, label, options, className } = props;
  const {
    labelClassName,
    inputClassName,
    rightIconClassName,
    leftIconClassName,
    valueClassName,
    fontSizeClassName,
  } = getClassName({
    size,
    leftIcon: options[0]?.icon,
    isError: false,
    hideLabel: !label,
  });

  const { inputClassName: notSelectedInputClassName } = getClassName({
    size,
    leftIcon: false,
    isError: false,
    hideLabel: !label,
  });

  const {
    field: { value, onChange },
  } = useController(props);

  const selectedOption =
    options.find((option) => option.value === value) || emptyOption;

  return (
    <Listbox value={selectedOption} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Button role="list" className={clsx("w-full", className)}>
            <div
              className={clsx(
                "relative flex items-center",
                selectedOption.icon ? inputClassName : notSelectedInputClassName
              )}
            >
              {selectedOption?.icon ? (
                <div className={leftIconClassName}>{selectedOption.icon}</div>
              ) : null}
              <label className={valueClassName}>{selectedOption.label}</label>
              <label className={labelClassName}>{label}</label>
              {open ? (
                <ChevronUp
                  className={clsx("h-6 w-6", "ml-auto", rightIconClassName)}
                />
              ) : (
                <ChevronDown
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
            <Listbox.Options className="w-full rounded-[8px] shadow-menu">
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.id}
                  value={option.value} // This value will be set to react-hook-form when selected
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
                      <div className="mr-3 w-9 h-9">
                        {/* wrap in case icon too small */}
                        <div className="flex w-full h-full items-center justify-center">
                          {option.icon}
                        </div>
                      </div>
                    ) : null}
                    <div className={fontSizeClassName}>{option.label}</div>
                    <ChevronRight className={clsx("h-6 w-6", "ml-auto")} />
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
