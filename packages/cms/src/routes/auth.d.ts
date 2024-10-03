import { Adapter } from "@citium/types/adapter";
import { Hono } from "hono";
export declare const getAuthRoutes: (adapter: Adapter) => Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
