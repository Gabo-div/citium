import { Adapter } from "@citium/types/adapter";
import { Hono } from "hono";

export const getUsersRoutes = (adapter: Adapter) => {
  const hono = new Hono();

  hono.get("/:id", async (c) => {
    const id = c.req.param("id");

    const user = await adapter.getUserById(id);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const { password: _, ...userData } = user;

    return c.json(userData);
  });

  return hono;
};
