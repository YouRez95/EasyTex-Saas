import { z } from "zod";
import {
  fontSize,
  fontSizeOptions,
  fontStyle,
  fontStyleOptions,
  textAlign,
  textAlignOptions,
} from "./base";

export interface NormalboxSection {
  id: string;
  title: string;
  align?: textAlign;
  space: {
    top: string;
    bottom: string;
  };
  type: "normalbox";
  content: string;
  textAlign: textAlign;
  fontSize: fontSize;
  fontStyle: fontStyle;
  width?: string;
  height?: string;
  colback: {
    type: "single" | "mixte";
    color: string;
  };
  colframe: {
    type: "single" | "mixte";
    color: string;
  };
}

export const normalboxSchema = z.object({
  align: z.enum(textAlignOptions).optional(),
  space: z.object({
    top: z.string(),
    bottom: z.string(),
  }),
  type: z.literal("normalbox"),
  content: z.string().min(1, "Content is required"),
  textAlign: z.enum(textAlignOptions),
  fontSize: z.enum(fontSizeOptions),
  width: z.string().optional(),
  height: z.string().optional(),
  colback: z.object({
    type: z.enum(["single", "mixte"]),
    color: z.string(),
  }),
  colframe: z.object({
    type: z.enum(["single", "mixte"]),
    color: z.string(),
  }),
  fontStyle: z.enum(fontStyleOptions),
});

export type NormalboxFormValues = z.infer<typeof normalboxSchema>;
