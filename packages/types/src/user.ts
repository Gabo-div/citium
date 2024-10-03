import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["user", "admin"]),
});

export type User = z.infer<typeof userSchema>;
