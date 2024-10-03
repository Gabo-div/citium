import { Adapter } from "@citium/types/adapter";
import { Hono } from "hono";
export declare const getUsersRoutes: (adapter: Adapter) => Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
