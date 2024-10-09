import { Hono } from "hono";
import citium from "../../index.js";
import { serve } from "@hono/node-server";
import { getConfig } from "../config";

const start = async () => {
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

start();
