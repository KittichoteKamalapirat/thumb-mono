import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, ReactNode } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
  FiChevronDown as ChevronDown,
  FiChevronRight as ChevronRight,
  FiChevronUp as ChevronUp,
} from "react-icons/fi";
import {
  TextFieldSize,
  TextFieldSizeValue,
} from "../../design-system/token.interface";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  name: string;
  size?: TextFieldSizeValue;
  leftIcon?: ReactNode;
  isError?: boolean;
}

interface ClassNameProps {
  size: TextFieldSizeValue;
  leftIcon?: ReactNode;
  isError: boolean;
}

const borderSize: Record<TextFieldSizeValue, string> = {
  xxl: "focus:border-[3px]", // exception tokens
  xl: "focus:border-[3px]",
  large: "focus:border-[3px]",
  medium: "focus:border-[3px]",
  small: "focus:border-[3px]",
  xs: "focus:border-2",
};
const inputSizesWithoutLabel: Record<TextFieldSizeValue, string> = {
  xxl: "px-[20px] py-[8px] text-heading2 leading-[36px]",
  xl: "px-[20px] py-[6px] text-heading3",
  large: "px-[16px] py-[5px] text-lg",
  medium: "px-[12px] py-[4px] text-md",
  small: "px-[12px] py-[3px] text-sm",
  xs: "px-[8px] py-[3px] text-xs",
};

const fontSizes: Record<TextFieldSizeValue, string> = {
  xxl: "text-heading2 leading-[36px]",
  xl: "text-heading3",
  large: "text-lg",
  medium: "text-md",
  small: "text-sm",
  xs: "text-xs",
};

const labelSizes: Record<TextFieldSizeValue, string> = {
  xxl: "text-xl top-[20px] left-[24px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[20px] peer-placeholder-shown:text-heading2 peer-placeholder-shown:top-[30px] leading-[36px]",
  xl: "text-xl top-[16px] left-[24px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[16px] peer-placeholder-shown:text-heading3 peer-placeholder-shown:top-[26px]",
  large:
    "text-lg top-[12px] left-[20px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[12px] peer-placeholder-shown:text-lg peer-placeholder-shown:top-[22px]",
  medium:
    "text-md top-[8px] left-[16px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[8px] peer-placeholder-shown:text-md peer-placeholder-shown:top-[18px]",
  small:
    "text-sm top-[4px] left-[16px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[4px] peer-placeholder-shown:text-sm peer-placeholder-shown:top-[14px]",
  xs: "text-xs top-[6px] left-[8px] peer-focus:text-xs peer-focus:text-blue-600 peer-focus:top-[6px] peer-placeholder-shown:text-xs peer-placeholder-shown:top-[14px]",
};
const leftIconSizes: Record<TextFieldSizeValue, string> = {
  xxl: "top-[8px] left-[20px] w-[36px] h-[36px]",
  xl: "top-[6px] left-[20px] w-[32px] h-[32px]",
  large: "top-[5px] left-[16px] w-[28px] h-[28px]",
  medium: "top-[4px] left-[12px] w-[24px] h-[24px]",
  small: "top-[3px] left-[12px] w-[20px] h-[20px]",
  xs: "top-[3px] left-[8px] w-[16px] h-[16px]",
};

const rightIconSizes: Record<TextFieldSizeValue, string> = {
  xxl: "top-[7px] right-[24px] w-[36px] h-[36px]",
  xl: "top-[6px] right-[24px] w-[32px] h-[32px]",
  large: "top-[5px] right-[20px] w-[28px] h-[28px]",
  medium: "top-[4px] right-[16px] w-[24px] h-[24px]",
  small: "top-[3px] right-[16px] w-[20px] h-[20px]",
  xs: "top-[3px] right-[8px] w-[16px] h-[16px]",
};

const labelPositionWithLeftIcon: Record<TextFieldSizeValue, string> = {
  xxl: "pl-[0px]",
  xl: "pl-[0px]",
  large: "pl-[0px]",
  medium: "pl-[0px]",
  small: "pl-[0px]",
  xs: "pl-[0px]",
};

const inputClassNameObjWithLeftIcon: Record<TextFieldSizeValue, string> = {
  xxl: "indent-12",
  xl: "indent-11",
  large: "indent-9",
  medium: "indent-8", // 24px (icon size) + 8px (gap) = 32px (indent-[32px])
  small: "indent-7",
  xs: "indent-[22px]", // exceptional token
};

// TODO: Refactor to share utils
export const getClassName = ({ size, leftIcon, isError }: ClassNameProps) => {
  const sharedLabelClassName = clsx(
    "absolute z-10 origin-[0] transform text-grey-500 duration-300 group-focus:text-blue group-active:text-blue",
    ["xl", "xxl"].includes(size) ? "font-semibold" : "font-normal",
    "peer-focus:hidden hidden peer-placeholder-shown:block"
  );
  const sharedInputClassName = clsx(
    "bg-primary-200",
    isError ? "border-coral-500" : "border-opacity-black-8",
    "border-2 border-grey-600 group bg-transparent peer block w-full placeholder-white focus:placeholder-grey-400 appearance-none rounded-sm text-grey-900 focus:border-primary active:border-primary focus:placeholder-grey-300 focus:outline-none focus:ring-0"
  );

  const borderSizeClassName = borderSize[size];

  const sharedLeftIconClassName = "absolute";
  const inputClassNameWithoutLabel = inputSizesWithoutLabel[size];
  const fontSizeClassName = fontSizes[size];

  const leftIconClassName = clsx(sharedLeftIconClassName, leftIconSizes[size]);
  const rightIconClassName = clsx(
    sharedLeftIconClassName,
    rightIconSizes[size]
  );
  const labelClassName = clsx(
    sharedLabelClassName,
    labelSizes[size],
    !!leftIcon && labelPositionWithLeftIcon[size]
  );
  const valueClassName = clsx(
    labelSizes[size],
    !!leftIcon && labelPositionWithLeftIcon[size]
  );
  const inputClassName = clsx(
    sharedInputClassName,
    borderSizeClassName,
    inputClassNameWithoutLabel,
    !!leftIcon && inputClassNameObjWithLeftIcon[size]
  );
  return {
    labelClassName,
    valueClassName,
    inputClassName,
    leftIconClassName,
    rightIconClassName,
    fontSizeClassName,
  };
};

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
  size: TextFieldSizeValue;
  label: string;
  className?: string;
}

const backgroundOptionClass =
  "hover:bg-interactive/[0.04] active:bg-interactive/[0.12] disabled:bg-primary/[0.04] active:bg-interactive/[0.08] focus:bg-interactive/[0.04]";
const borderOptionClass =
  "focus:border-interactive focus:border rounded-[8px] p-4";

const SelectText = (props: SelectProps & UseControllerProps) => {
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
  });

  const { inputClassName: notSelectedInputClassName } = getClassName({
    size,
    leftIcon: false,
    isError: false,
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
                <div className={leftIconClassName}>
                  <div className="flex w-full h-full items-center justify-center">
                    {selectedOption.icon}
                  </div>
                </div>
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

export default SelectText;
