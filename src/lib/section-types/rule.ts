import { z } from "zod";
import { textAlign, textAlignOptions } from "./base";

export interface RuleSection {
  id: string;
  align: textAlign;
  title: string;
  space: {
    top: string;
    bottom: string;
  };
  type: "rule";
  color: string;
  width?: string;
}

export const RuleSchema = z.object({
  align: z.enum(textAlignOptions),
  space: z.object({
    top: z.string(),
    bottom: z.string(),
  }),
  type: z.literal("rule"),
  width: z.string().optional(),
  color: z.string(),
});

export type RuleFormValues = z.infer<typeof RuleSchema>;
