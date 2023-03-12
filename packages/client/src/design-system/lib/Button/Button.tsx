/// <reference types="vite-plugin-svgr/client" />
import { IconInformative } from "../IconInformative/IconInformative";
import { ReactComponent } from "*.svg";
import clsx from "clsx";
import { ObjectValues } from "../../../lib";
import { Size } from "../../token.interface";

export const BUTTON_TYPE = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  TERTIARY: "TERTIARY",
  QUATERNARY: "QUATERNARY",
  DANGER_PRIMARY: "DANGER_PRIMARY",
  DANGER_SECONDARY: "DANGER_SECONDARY",
  DANGER_TERTIARY: "DANGER_TERTIARY",
  TEXT: "TEXT",
} as const;

export type ButtonTypeValues = ObjectValues<typeof BUTTON_TYPE>;

export const BUTTON_SIZE = {
  XXL: "XXL",
  XL: "XL",
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
  SMALL: "SMALL",
  XS: "XS",
} as const;

export type ButtonSizeValues = ObjectValues<typeof BUTTON_SIZE>;

export const BUTTON_WIDTH = {
  INHERIT: "INHERIT",
  FULL: "FULL",
} as const;

export type ButtonWidthValues = ObjectValues<typeof BUTTON_WIDTH>;

export const HTML_BUTTON_TYPE = {
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button",
} as const;

export type HtmlButtonTypes = ObjectValues<typeof HTML_BUTTON_TYPE>;

export interface ButtonProps {
  type?: ButtonTypeValues;
  buttonType?: HtmlButtonTypes;
  size?: ButtonSizeValues;
  width?: ButtonWidthValues;
  label: string;
  leftIcon?: typeof ReactComponent;
  rightIcon?: typeof ReactComponent;
  isSelected?: boolean;
  disabled?: boolean;
  inverted?: boolean;
  onClick?: (...args: never[]) => void;
  className?: string;
}

// TODO: UI labels are reusable, create as components and remove theme tokens if needed
const getSizeStyle = (size: ButtonSizeValues, type?: ButtonTypeValues) => {
  if (type === "TEXT") {
    return {
      [BUTTON_SIZE.XXL]: "text-xxl px-0",
      [BUTTON_SIZE.XL]: "text-xl px-0",
      [BUTTON_SIZE.LARGE]: "text-lg px-0",
      [BUTTON_SIZE.MEDIUM]: "text-md px-0",
      [BUTTON_SIZE.SMALL]: "text-sm px-0",
      [BUTTON_SIZE.XS]: "text-xs px-0",
    }[size];
  }
  return {
    [BUTTON_SIZE.XXL]: "text-xxl leading-xxl px-[32px] h-[84px]",
    [BUTTON_SIZE.XL]: "text-xl leading-xl px-[28px] h-[72px]",
    [BUTTON_SIZE.LARGE]: "text-lg leading-lg px-[24px] h-[60px]",
    [BUTTON_SIZE.MEDIUM]: "text-md leading-md px-[20px] h-[48px]",
    [BUTTON_SIZE.SMALL]: "text-sm leading-sm px-[16px] h-[36px]",
    [BUTTON_SIZE.XS]: "text-xs leading-xs px-[12px] h-[28px]",
  }[size];
};

export const getTypeStyle = (
  type: ButtonTypeValues,
  size: ButtonSizeValues,
  isSelected: boolean,
  inverted: boolean
) =>
  ({
    [BUTTON_TYPE.PRIMARY]: inverted
      ? ""
      : "bg-primary shadow-md border border-2 border-black text-opacity-black-92 hover:bg-primary-hover active:bg-opacity-black-68 focus:bg-opacity-black-76 disabled:cursor-not-allowed disabled:bg-opacity-black-4 disabled:text-opacity-black-24",
    [BUTTON_TYPE.SECONDARY]:
      "bg-blue-500 bg-opacity-8 text-blue-500 hover:text-blue-600 hover:bg-opacity-16 active:bg-opacity-24 active:text-blue-700 focus:bg-opacity-16 disabled:cursor-not-allowed disabled:bg-opacity-black-4 disabled:text-opacity-black-24",
    [BUTTON_TYPE.TERTIARY]: clsx(
      "border-solid border-opacity-black-76 hover:shadow-md hover:border-2 hover:border-black text-opacity-black-76",
      //   "active:bg-opacity-12 active:text-blue-700",
      //   "focus:border-opacity-0",
      "disabled:cursor-not-allowed disabled:bg-white disabled:text-opacity-black-24 disabled:border-opacity-black-8",
      size === BUTTON_SIZE.XS ? "border" : "border-2",
      isSelected ? "bg-blue-500 bg-opacity-8 text-blue-500 border-blue-500" : ""
    ),
    [BUTTON_TYPE.QUATERNARY]: inverted
      ? ""
      : clsx(
          isSelected
            ? "bg-blue-500 bg-opacity-8 text-blue-500"
            : "bg-black bg-opacity-0 text-opacity-black-76",
          "hover:bg-opacity-4 active:bg-opacity-8 focus:bg-opacity-4] disabled:cursor-not-allowed disabled:bg-opacity-0 disabled:text-opacity-black-24"
        ),
    [BUTTON_TYPE.DANGER_PRIMARY]: clsx(
      size === BUTTON_SIZE.XS ? "border" : "border-2",
      "bg-coral-100 bg-opacity-0 text-coral-500 border-solid border-coral-500 hover:bg-opacity-100 hover:text-coral-600 hover:border-coral-500 active:bg-coral-200 active:bg-opacity-100 active:text-coral-600 active:border-coral-500 focus:text-coral-600 active:focus:border-opacity-0 focus:border-opacity-0 disabled:cursor-not-allowed disabled:bg-opacity-black-4 disabled:text-opacity-black-24 disabled:border-opacity-black-8"
    ),
    [BUTTON_TYPE.DANGER_SECONDARY]:
      "bg-coral-100 text-coral-500 hover:bg-coral-200 hover:text-coral-600 active:bg-coral-300 active:text-coral-600 focus:bg-coral-200 focus:text-coral-600 disabled:cursor-not-allowed disabled:bg-opacity-black-4 disabled:text-opacity-black-24",
    [BUTTON_TYPE.DANGER_TERTIARY]:
      "bg-coral-100 bg-opacity-0 text-coral-500 hover:bg-opacity-100 active:bg-coral-200 active:bg-opacity-100 focus:bg-opacity-100 disabled:cursor-not-allowed disabled:bg-opacity-0 disabled:text-opacity-black-24",
    [BUTTON_TYPE.TEXT]: "",
  }[type]);

export const getWidthStyle = (width: ButtonWidthValues) =>
  width === BUTTON_WIDTH.FULL ? "w-full" : "";

const getContent = (
  size: ButtonSizeValues,
  label: string,
  leftIcon?: typeof ReactComponent,
  rightIcon?: typeof ReactComponent
) => {
  // TODO: fix size token format
  const iconSize = BUTTON_SIZE[size].toLowerCase() as Size;
  const spacingSize = {
    [BUTTON_SIZE.XXL]: "gap-3",
    [BUTTON_SIZE.XL]: "gap-3",
    [BUTTON_SIZE.LARGE]: "gap-2",
    [BUTTON_SIZE.MEDIUM]: "gap-2",
    [BUTTON_SIZE.SMALL]: "gap-1",
    [BUTTON_SIZE.XS]: "gap-1",
  };

  return (
    <div className={`flex items-center ${spacingSize[size]}`}>
      {!!leftIcon && (
        <IconInformative
          size={iconSize}
          context="contained"
          background="default"
        >
          {leftIcon}
        </IconInformative>
      )}
      <div className="mx-auto">{label}</div>
      {!!rightIcon && (
        <IconInformative
          size={iconSize}
          context="contained"
          background="default"
        >
          {rightIcon}
        </IconInformative>
      )}
    </div>
  );
};

export const getButtonStyles = (
  type: ButtonTypeValues,
  size: ButtonSizeValues,
  width: ButtonWidthValues,
  isSelected: boolean,
  inverted: boolean
) => ({
  baseStyle: "bg-transition rounded-sm font-semibold duration-300 ease-in-out",
  sizeStyle: getSizeStyle(size, type),
  typeStyle: getTypeStyle(type, size, isSelected, inverted),
  widthStyle: getWidthStyle(width),
});

// EarnIn button
const Button = ({
  type = BUTTON_TYPE.PRIMARY,
  size = BUTTON_SIZE.MEDIUM,
  width = BUTTON_WIDTH.INHERIT,
  label,
  leftIcon,
  rightIcon,
  buttonType = "button",
  isSelected = false,
  disabled = false,
  inverted = false,
  onClick,
  className,
}: ButtonProps) => {
  const { baseStyle, sizeStyle, typeStyle, widthStyle } = getButtonStyles(
    type,
    size,
    width,
    isSelected,
    inverted
  );
  const content = getContent(size, label, leftIcon, rightIcon);

  return (
    <button
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
      className={clsx(baseStyle, sizeStyle, typeStyle, widthStyle, className)}
    >
      {content}
    </button>
  );
};

export default Button;
