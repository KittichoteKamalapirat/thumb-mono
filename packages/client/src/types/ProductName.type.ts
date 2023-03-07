import { ObjectValues } from "../lib";

// copied from server
export const PRODUCT_NAME = {
  FREE_PLAN: "Free Plan",
  STARTER_PLAN: "Starter Plan",
  PROFESSIONAL_PLAN: "Professional Plan",
} as const;

export type ProductName = ObjectValues<typeof PRODUCT_NAME>;
