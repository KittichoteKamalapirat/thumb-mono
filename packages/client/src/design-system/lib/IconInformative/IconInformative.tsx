import { ReactComponent } from "*.svg";
import clsx from "clsx";

import { Size, Background, Context } from "../../token.interface";

const widthHeight = new Map<string, string>([
  ["xxl", "36"],
  ["xl", "32"],
  ["large", "28"],
  ["medium", "24"],
  ["small", "20"],
  ["xs", "16"],
]);

const containedPadding = new Map<string, string>([
  ["xxl", "p-[3px]"],
  ["xl", "p-1"],
  ["large", "p-1"],
  ["medium", "p-1"],
  ["small", "p-[3px]"],
  ["xs", "p-[2px]"],
]);

const standalonePadding = new Map<string, string>([
  ["xxl", "p-6"],
  ["xl", "p-5"],
  ["large", "p-4"],
  ["medium", "p-3"],
  ["small", "p-2"],
  ["xs", "p-1.5"],
]);

export interface IconProps {
  size: Size;
  context: Context;
  background?: Background;
  children: typeof ReactComponent;
  className?: string;
}

export const IconInformative = ({
  background = "default",
  size,
  context,
  className,
  children: Icon,
}: IconProps) => {
  const backgroundClass = clsx(
    background === "default"
      ? ""
      : background === "lightblue"
      ? "bg-lightblue"
      : "bg-lightgrey"
  );
  if (context === "contained") {
    return (
      <div
        className={clsx(
          backgroundClass,
          containedPadding.get(size),
          "w-fit rounded-full",
          className
        )}
      >
        <Icon width={widthHeight.get(size)} height={widthHeight.get(size)} />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        backgroundClass,
        standalonePadding.get(size),
        "w-fit rounded-full",
        className
      )}
    >
      <Icon width={widthHeight.get(size)} height={widthHeight.get(size)} />
    </div>
  );
};
