import { z } from "zod";
import { adapterSchema } from "./adapter";

export const configSchema = z.object({
  adapter: adapterSchema,
  port: z.number(),
});

export type Config = z.infer<typeof configSchema>;
