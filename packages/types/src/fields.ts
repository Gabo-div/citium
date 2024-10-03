import { z } from "zod";

export const fieldTypeSchema = z.enum(["string", "number", "boolean"]);

export type FieldType = z.infer<typeof fieldTypeSchema>;

export const collectionFieldSchema = z.object({
  name: z.string(),
  type: fieldTypeSchema,
});

export type CollectionField = z.infer<typeof collectionFieldSchema>;
