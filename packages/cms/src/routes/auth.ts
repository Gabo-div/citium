import { Adapter } from "@citium/types/adapter";
import { userSchema } from "@citium/types/user";
import { Hono } from "hono";
import bcrypt from "bcrypt";
import { zValidator } from "@hono/zod-validator";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

export const getAuthRoutes = (adapter: Adapter) => {
  const hono = new Hono();

  hono.post(
    "/login",
    zValidator("json", userSchema.pick({ username: true, password: true })),
    async (c) => {
      const { username, password } = c.req.valid("json");

      const user = await adapter.getUserByUsername(username);

      if (!user) {
        return c.json({ error: "User not found" }, 401);
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return c.json({ error: "Invalid password" }, 401);
      }

      const { password: _, ...userData } = user;

      const token = await sign(userData, "secret");

      setCookie(c, "token", token);

      return c.json({
        token,
      });
    },
  );

  return hono;
};
