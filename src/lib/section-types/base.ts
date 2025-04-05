import { NormalboxSection } from "./normalBox";
import { RuleSection } from "./rule";
import { ShadowboxSection } from "./shadowBox";

export type SectionType = "shadowbox" | "rule" | "normalbox";

export type fontSize =
  | "default"
  | "tiny"
  | "scriptsize"
  | "footnotesize"
  | "small"
  | "normalsize"
  | "large"
  | "Large"
  | "LARGE"
  | "huge"
  | "Huge";

export type fontStyle =
  | "default"
  | "medium"
  | "bold"
  | "italic"
  | "upright"
  | "slanted"
  | "small caps";

export type textAlign = "default" | "center" | "left" | "right";

export const textAlignOptions = ["default", "center", "left", "right"] as const;
export const fontSizeOptions = [
  "default",
  "tiny",
  "scriptsize",
  "footnotesize",
  "small",
  "normalsize",
  "large",
  "Large",
  "LARGE",
  "huge",
  "Huge",
] as const;
export const fontStyleOptions = [
  "default",
  "medium",
  "bold",
  "italic",
  "upright",
  "slanted",
  "small caps",
] as const;

export type Section = ShadowboxSection | RuleSection | NormalboxSection;
