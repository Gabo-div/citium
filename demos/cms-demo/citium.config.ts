import { Config } from "@citium/types/config";
import sqliteAdapter from "@citium/sqlite-adapter";

export default {
  adapter: sqliteAdapter({
    url: "file:./database.db",
  }),
  port: 3000,
} satisfies Config;
