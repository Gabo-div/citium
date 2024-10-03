import { z } from "zod";
import { collectionFieldSchema } from "./fields";

export const collectionSchema = z.object({
  name: z.string(),
  fields: z.array(collectionFieldSchema),
});

export type Collection = z.infer<typeof collectionSchema>;
