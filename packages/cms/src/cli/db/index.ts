import type { Arguments } from "yargs-parser";
import { getConfig } from "../config";

export const db = async (flags: Arguments) => {
  const { _: args } = flags;
  const command = args[3];

  if (command === "init") {
    const { adapter } = await getConfig();
    console.log("Initializing database...");

    adapter
      .init()
      .then(() => {
        console.log("Database initialized.");
        process.exit(0);
      })
      .catch((err) => {
        console.log("Error initializing database:", err);
        process.exit(1);
      });
  }
};
