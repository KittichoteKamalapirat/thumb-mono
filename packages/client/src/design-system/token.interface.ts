export type Size = "xxl" | "xl" | "large" | "medium" | "small" | "xs"; // TODO:
export type Context = "contained" | "standalone";
export type Background = "default" | "lightgrey" | "lightblue";

export interface TextFieldSize {
  XXL: "xxl"; // size of text and padding
  XL: "xl";
  LARGE: "large";
  MEDIUM: "medium";
  SMALL: "small";
  XS: "xs";
}

export type TextFieldSizeKey = keyof TextFieldSize; // "XXL" | "XL" ...
export type TextFieldSizeValue = TextFieldSize[TextFieldSizeKey]; // "xxl" | "xl" ...
