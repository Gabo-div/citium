import { z } from "zod";
import { adapterSchema } from "./adapter";
import { Hono } from "hono";

export const optionsSchema = z.object({
  hono: z.instanceof(Hono),
  adapter: adapterSchema,
});

export type Options = z.infer<typeof optionsSchema>;
