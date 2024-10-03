import { Options } from "@citium/types/options";
import bcrypt from "bcrypt";
import { getCollectionsRoutes } from "./routes/collections";
import { getAuthRoutes } from "./routes/auth";
import { getUsersRoutes } from "./routes/users";

export const init = async (config: Options): Promise<void> => {
  const { hono, adapter } = config;

  const adminHash = bcrypt.hashSync("admin", 10);
  adapter.createUser("admin", adminHash);

  hono.route("/auth", getAuthRoutes(adapter));
  hono.route("/collections", getCollectionsRoutes(adapter));
  hono.route("/users", getUsersRoutes(adapter));
};
