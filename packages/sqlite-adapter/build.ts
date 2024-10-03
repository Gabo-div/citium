import esbuild, { BuildOptions, PluginBuild } from "esbuild";
import yargs from "yargs-parser";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import { exec } from "node:child_process";

const flags = yargs(process.argv, {
  alias: {
    w: "watch",
  },
});

const isWatch = Boolean(flags.watch);
const entryPoints = glob.sync("./src/**/*.ts");

const addExtension = (
  extension: string = ".js",
  fileExtension: string = ".ts",
) => ({
  name: "add-extension",
  setup(build: PluginBuild) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.importer) {
        const p = path.join(args.resolveDir, args.path);
        let tsPath = `${p}${fileExtension}`;

        let importPath = "";
        if (fs.existsSync(tsPath)) {
          importPath = args.path + extension;
        } else {
          tsPath = path.join(
            args.resolveDir,
            args.path,
            `index${fileExtension}`,
          );
          if (fs.existsSync(tsPath)) {
            if (args.path.endsWith("/")) {
              importPath = `${args.path}index${extension}`;
            } else {
              importPath = `${args.path}/index${extension}`;
            }
          }
        }
        return { path: importPath, external: true };
      }
    });
  },
});

const commonOptions: BuildOptions = {
  entryPoints,
  logLevel: "info",
  platform: "node",
};

const cjsOptions: BuildOptions = {
  ...commonOptions,
  outbase: "./src",
  outdir: "./dist/cjs",
  format: "cjs",
};

const esmOptions: BuildOptions = {
  ...commonOptions,
  bundle: true,
  outbase: "./src",
  outdir: "./dist/esm",
  format: "esm",
  plugins: [addExtension(".js")],
};

if (isWatch) {
  const cjsContext = await esbuild.context(cjsOptions);
  const esmContext = await esbuild.context(esmOptions);

  cjsContext.watch();
  esmContext.watch();

  exec(
    `tsc -w --emitDeclarationOnly --declaration --project tsconfig.build.json`,
  );
} else {
  const cjsBuild = () => esbuild.build(cjsOptions);
  const esmBuild = () => esbuild.build(esmOptions);

  Promise.all([cjsBuild(), esmBuild()]);

  exec(`tsc --emitDeclarationOnly --declaration --project tsconfig.build.json`);
}
