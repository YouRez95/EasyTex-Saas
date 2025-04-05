import { z } from "zod";

const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

export const createFolderSchema = z.object({
  folderName: z
    .string()
    .min(2, { message: "Folder name must be at least 2 characters" })
    .max(50, { message: "You reached the max characters limit" }),
  folderDescription: z.string().max(200).optional(),
  folderColor: z.string().regex(hexColorRegex, { message: "Invalid color" }),
});

export type CreateFolderSchemaType = z.infer<typeof createFolderSchema>;

export const createFileSchema = z.object({
  fileName: z
    .string()
    .min(2, { message: "Folder name must be at least 2 characters" })
    .max(50, { message: "You reached the max characters limit" }),
});

export type CreateFileSchemaType = z.infer<typeof createFileSchema>;
