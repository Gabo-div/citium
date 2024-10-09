import type { Arguments } from "yargs-parser";
import chokidar from "chokidar";
import { fork } from "child_process";

export const dev = async (flags: Arguments) => {
  const watcher = chokidar.watch("node_modules/@citium/cms/dist", {
    persistent: true,
  });

  const serverPath = "node_modules/@citium/cms/dist/esm/cli/dev/server.js";
  let child = fork(serverPath);

  const delay = 500;
  let timer: NodeJS.Timeout;

  watcher.on("change", async (path) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      console.log("Changes in package detected, restarting server...");
      child.kill();
      child = fork(serverPath);
    }, delay);
  });
};
