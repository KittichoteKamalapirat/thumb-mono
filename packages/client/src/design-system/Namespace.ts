import { ObjectKeys, ObjectValues } from "../lib";

export const Namespaces = {
  DesignSystem: "Design System",
  LandingPage: "LandingPage",
  Onboarding: "Onboarding",
} as const;

export type NamespacesKeys = ObjectKeys<typeof Namespaces>;
export type NamespacesValues = ObjectValues<typeof Namespaces>;
