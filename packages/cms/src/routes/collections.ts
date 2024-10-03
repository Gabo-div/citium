import { Hono } from "hono";
import { Adapter } from "@citium/types/adapter";
import { collectionSchema } from "@citium/types/collection";
import { zValidator } from "@hono/zod-validator";

export const getCollectionsRoutes = (adapter: Adapter) => {
  const hono = new Hono();

  hono.get("/", async (c) => {
    const collections = await adapter.getCollections();
    return c.json(collections);
  });

  hono.get("/:name", async (c) => {
    const name = c.req.param("name");

    const collection = await adapter.getCollection(name);

    if (!collection) {
      return c.json({ error: "Collection not found" }, 404);
    }

    return c.json(collection);
  });

  hono.post("/", zValidator("json", collectionSchema), async (c) => {
    const validated = c.req.valid("json");

    const created = await adapter.createCollection(
      validated.name,
      validated.fields,
    );

    if (!created) {
      return c.json({ error: "Error creating collection" }, 500);
    }

    const collection = await adapter.getCollection(validated.name);

    if (!collection) {
      return c.json({ error: "Error getting collection" }, 500);
    }

    return c.json(collection);
  });

  return hono;
};
