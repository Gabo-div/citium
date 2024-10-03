#!/usr/bin/env node

(async () => {
  return import("./dist/esm/cli/index.js")
    .then(({ cli }) => cli(process.argv))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
})();
