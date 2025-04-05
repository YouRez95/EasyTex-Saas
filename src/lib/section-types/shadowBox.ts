import { z } from "zod";
import {
  fontSize,
  fontSizeOptions,
  fontStyle,
  fontStyleOptions,
  textAlign,
  textAlignOptions,
} from "./base";

export interface ShadowboxSection {
  id: string;
  align: textAlign;
  title: string;
  space: {
    top: string;
    bottom: string;
  };
  type: "shadowbox";
  content: string;
  width: string;
  height: string;
  textAlign: textAlign;
  fontSize: fontSize;
  color: string;
  fontStyle: fontStyle;
}

export const shadowboxSchema = z.object({
  align: z.enum(textAlignOptions),
  space: z.object({
    top: z.string(),
    bottom: z.string(),
  }),
  type: z.literal("shadowbox"),
  content: z.string().min(1, "Content is required"),
  width: z.string(),
  height: z.string(),
  textAlign: z.enum(textAlignOptions),
  fontSize: z.enum(fontSizeOptions),
  color: z.string(),
  fontStyle: z.enum(fontStyleOptions),
});

export type ShadowboxFormValues = z.infer<typeof shadowboxSchema>;
