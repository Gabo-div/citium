import { collectionFieldSchema } from "./fields";
import { collectionSchema } from "./collection";
import { userSchema } from "./user";
import { z } from "zod";

export const adapterSchema = z.object({
  init: z.function().returns(z.promise(z.void())),
  createCollection: z
    .function()
    .args(z.string(), collectionFieldSchema.array())
    .returns(z.promise(z.boolean())),
  getCollection: z
    .function()
    .args(z.string())
    .returns(z.promise(collectionSchema.nullable())),
  getCollections: z
    .function()
    .args(z.void())
    .returns(z.promise(collectionSchema.array())),
  createUser: z
    .function()
    .args(z.string(), z.string())
    .returns(z.promise(z.boolean())),
  getUserByUsername: z
    .function()
    .args(z.string())
    .returns(z.promise(userSchema.nullable())),
  getUserById: z
    .function()
    .args(z.string())
    .returns(z.promise(userSchema.nullable())),
});

export type Adapter = z.infer<typeof adapterSchema>;
