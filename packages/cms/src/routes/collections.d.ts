import { Hono } from "hono";
import { Adapter } from "@citium/types/adapter";
export declare const getCollectionsRoutes: (adapter: Adapter) => Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
