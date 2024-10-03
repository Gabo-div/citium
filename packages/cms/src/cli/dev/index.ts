import type { Arguments } from "yargs-parser";
import { getConfig } from "../config";
import citium from "../../index.js";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

export const dev = async (flags: Arguments) => {
  const config = await getConfig();
  const app = new Hono();

  await citium.init({
    hono: app,
    adapter: config.adapter,
  });

  serve(
    {
      fetch: app.fetch,
      port: config.port,
    },
    (info) => {
      console.log(`Server running at http://localhost:${info.port}`);
    },
  );
};
