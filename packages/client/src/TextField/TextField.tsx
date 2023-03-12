import clsx from "clsx";
import React, { ReactNode } from "react";
import { TextFieldSizeValue } from "./TextField.type";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  name: string;
  size?: TextFieldSizeValue;
  leftIcon?: ReactNode;
  isError?: boolean;
  hideLabel?: boolean;
}

interface ClassNameProps {
  size: TextFieldSizeValue;
  leftIcon?: ReactNode;
  isError: boolean;
  hideLabel: boolean;
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
  xxl: "px-[24px] py-[30px] text-heading2 leading-[36px]",
  xl: "px-[24px] py-[26px] text-heading3",
  large: "px-[20px] py-[22px] text-lg",
  medium: "px-[16px] py-[18px] text-md",
  small: "px-[16px] py-[14px] text-sm",
  xs: "px-[8px] py-[14px] text-xs",
};

const fontSizes: Record<TextFieldSizeValue, string> = {
  xxl: "text-heading2 leading-[36px]",
  xl: "text-heading3",
  large: "text-lg",
  medium: "text-md",
  small: "text-sm",
  xs: "text-xs",
};

const inputSizesWithLabelObj: Record<TextFieldSizeValue, string> = {
  xxl: "px-[24px] pb-[20px] pt-[40px] focus:px-[22px] focus:pb-[20px] focus:pt-[40px] placeholder-shown:px-[24px] placeholder-shown:py-[30px] text-heading2 leading-[36px]",
  xl: "px-[24px] pb-[16px] pt-[36px] focus:px-[22px] focus:pb-[16px] focus:pt-[36px] placeholder-shown:px-[24px] placeholder-shown:py-[26px] text-heading3",
  large:
    "px-[20px] pb-[12px] pt-[32px] focus:px-[18px] focus:pb-[12px] focus:pt-[32px] placeholder-shown:px-[20px] placeholder-shown:py-[22px] text-lg",
  medium:
    "px-[16px] pb-[8px] pt-[28px] focus:px-[14px] focus:pb-[8px] focus:pt-[28px] placeholder-shown:px-[16px] placeholder-shown:py-[18px] text-md", // Changed focus:px-[16px] to focus:px-[14]px] due to thick border when focus
  small:
    "px-[16px] pb-[4px] pt-[24px] focus:px-[14px] focus:pb-[4px] focus:pt-[24px] placeholder-shown:px-[16px] placeholder-shown:py-[14px] text-sm",
  xs: "px-[8px] pb-[6px] pt-[22px] focus:px-[7px] focus:pb-[6px] focus:pt-[22px] placeholder-shown:px-[8px] placeholder-shown:py-[14px] text-xs",
};

const labelSizes: Record<TextFieldSizeValue, string> = {
  xxl: "text-sm top-[20px] left-[24px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[20px] peer-placeholder-shown:text-heading2 peer-placeholder-shown:top-[30px] leading-[36px]",
  xl: "text-sm top-[16px] left-[24px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[16px] peer-placeholder-shown:text-heading3 peer-placeholder-shown:top-[26px]",
  large:
    "text-sm top-[12px] left-[20px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[12px] peer-placeholder-shown:text-lg peer-placeholder-shown:top-[22px]",
  medium:
    "text-sm top-[8px] left-[16px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[8px] peer-placeholder-shown:text-md peer-placeholder-shown:top-[18px]",
  small:
    "text-sm top-[4px] left-[16px] peer-focus:text-sm peer-focus:text-blue-600 peer-focus:top-[4px] peer-placeholder-shown:text-sm peer-placeholder-shown:top-[14px]",
  xs: "text-xs top-[6px] left-[8px] peer-focus:text-xs peer-focus:text-blue-600 peer-focus:top-[6px] peer-placeholder-shown:text-xs peer-placeholder-shown:top-[14px]",
};
const leftIconSizes: Record<TextFieldSizeValue, string> = {
  xxl: "top-[30px] left-[24px] w-[36px] h-[36px]",
  xl: "top-[26px] left-[24px] w-[32px] h-[32px]",
  large: "top-[22px] left-[20px] w-[28px] h-[28px]",
  medium: "top-[18px] left-[16px] w-[24px] h-[24px]",
  small: "top-[14px] left-[16px] w-[20px] h-[20px]",
  xs: "top-[14px] left-[8px] w-[16px] h-[16px]",
};

const rightIconSizes: Record<TextFieldSizeValue, string> = {
  xxl: "top-[30px] right-[24px] w-[36px] h-[36px]",
  xl: "top-[26px] right-[24px] w-[32px] h-[32px]",
  large: "top-[22px] right-[20px] w-[28px] h-[28px]",
  medium: "top-[18px] right-[16px] w-[24px] h-[24px]",
  small: "top-[14px] right-[16px] w-[20px] h-[20px]",
  xs: "top-[14px] right-[8px] w-[16px] h-[16px]",
};

const labelSizesWithLeftIcon: Record<TextFieldSizeValue, string> = {
  xxl: "pl-[48px]",
  xl: "pl-[44px]",
  large: "pl-[36px]",
  medium: "pl-[32px]",
  small: "pl-[28px]",
  xs: "pl-[22px]",
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
export const getClassName = ({
  size,
  leftIcon,
  isError,
  hideLabel,
}: ClassNameProps) => {
  const sharedLabelClassName = clsx(
    "absolute z-10 origin-[0] transform text-grey-500 duration-300 group-focus:text-blue group-active:text-blue",
    ["xl", "xxl"].includes(size) ? "font-semibold" : "font-normal",
    hideLabel && "peer-focus:hidden hidden peer-placeholder-shown:block"
  );
  const sharedInputClassName = clsx(
    isError ? "border-coral-500" : "border-opacity-black-8",
    "group bg-transparent peer block w-full placeholder-white focus:placeholder-grey-400 appearance-none rounded-lg border-[2px] text-grey-900 focus:border-blue active:border-blue focus:placeholder-grey-300 focus:outline-none focus:ring-0"
  );

  const borderSizeClassName = borderSize[size];

  const sharedLeftIconClassName = "absolute";
  const inputClassNameWithoutLabel = inputSizesWithoutLabel[size];
  const inputClassNameWithLabel = inputSizesWithLabelObj[size];
  const fontSizeClassName = fontSizes[size];

  const leftIconClassName = clsx(sharedLeftIconClassName, leftIconSizes[size]);
  const rightIconClassName = clsx(
    sharedLeftIconClassName,
    rightIconSizes[size]
  );
  const labelClassName = clsx(
    sharedLabelClassName,
    labelSizes[size],
    !!leftIcon && labelSizesWithLeftIcon[size]
  );
  const valueClassName = clsx(
    labelSizes[size],
    !!leftIcon && labelSizesWithLeftIcon[size]
  );
  const inputClassName = clsx(
    sharedInputClassName,
    borderSizeClassName,
    hideLabel ? inputClassNameWithoutLabel : inputClassNameWithLabel,
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

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      label,
      placeholder = " ",
      leftIcon,
      size = "medium",
      isError = false,
      hideLabel = false,
      ...inputProps
    } = props;
    const { labelClassName, inputClassName, leftIconClassName } = getClassName({
      leftIcon,
      size,
      isError,
      hideLabel,
    });

    const inputLabel = `floating_label_input_${inputProps.name}`;

    return (
      <div className="relative">
        <input
          type="text"
          id={inputLabel}
          placeholder={placeholder}
          className={inputClassName}
          ref={ref}
          {...inputProps}
        />
        <div className={leftIconClassName}>{leftIcon}</div>
        <label htmlFor={inputLabel} className={labelClassName}>
          {label}
        </label>
      </div>
    );
  }
);

export default TextField;
