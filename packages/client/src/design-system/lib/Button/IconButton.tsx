import { MouseEventHandler } from "react";
import { ReactComponent } from "*.svg";

import { IconInformative } from "../IconInformative/IconInformative";
import {
  ButtonSizeValues,
  ButtonTypeValues,
  BUTTON_SIZE,
  BUTTON_TYPE,
  getButtonStyles,
} from "./Button";
import clsx from "clsx";
import { Context, Size } from "../../token.interface";

interface ButtonProps {
  type?: ButtonTypeValues;
  size?: ButtonSizeValues;
  icon: typeof ReactComponent;
  isSelected?: boolean;
  disabled?: boolean;
  inverted?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  context?: Context;
  className?: string;
}

const getSizeStyle = (size: ButtonSizeValues) =>
  ({
    [BUTTON_SIZE.XXL]: "text-xxl leading-xxl focus:ring-blue-600 focus:ring-2",
    [BUTTON_SIZE.XL]: "text-xl leading-xl focus:ring-blue-600 focus:ring-2",
    [BUTTON_SIZE.LARGE]: "text-lg leading-lg focus:ring-blue-600 focus:ring-2",
    [BUTTON_SIZE.MEDIUM]: "text-md leading-md focus:ring-blue-600 focus:ring-2",
    [BUTTON_SIZE.SMALL]:
      "text-sm leading-sm.5 focus:ring-blue-600 focus:ring-2",
    [BUTTON_SIZE.XS]: "text-xs leading-xs focus:ring-blue-600 focus:ring-1",
  }[size]);

// EarnIn button
const IconButton = ({
  type = BUTTON_TYPE.PRIMARY,
  size = BUTTON_SIZE.MEDIUM,
  icon,
  isSelected = false,
  disabled = false,
  inverted = false,
  context = "contained",
  onClick,
  className,
}: ButtonProps) => {
  const { baseStyle, typeStyle, widthStyle } = getButtonStyles(
    type,
    size,
    "INHERIT",
    isSelected,
    inverted
  );
  // customize size for IconButton
  const sizeStyle = getSizeStyle(size);
  // TODO: fix size token format
  const iconSize = BUTTON_SIZE[size].toLowerCase() as Size;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={clsx(
        "flex",
        baseStyle,
        typeStyle,
        sizeStyle,
        widthStyle,
        className
      )}
    >
      <IconInformative size={iconSize} context={context} background="default">
        {icon}
      </IconInformative>
    </button>
  );
};

export default IconButton;
