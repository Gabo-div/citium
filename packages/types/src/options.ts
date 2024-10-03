import { z } from "zod";
import { adapterSchema } from "./adapter";
import { Hono } from "hono";

export const configSchema = z.object({
  hono: z.instanceof(Hono),
  adapter: adapterSchema,
});

export type Config = z.infer<typeof configSchema>;
