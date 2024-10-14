import { Config, configSchema } from "@citium/types/config";
import esbuild from "esbuild";
import fs from "fs";
import fsp from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { glob } from "glob";

export const getConfig = async (): Promise<Config> => {
  const files = await glob("citium.config.{js,mjs,cjs,ts}", {
    ignore: "node_modules/**",
  });

  if (files.length === 0) {
    throw new Error(`No config file found`);
  }

  const fileName = files[0] as string;
  const code = await bundleConfigFile(fileName);
  const config = await loadConfig(code, fileName);

  const result = configSchema.safeParse(config);

  if (!result.success) {
    throw new Error(`Invalid config file`);
  }

  return result.data;
};

const bundleConfigFile = async (fileName: string): Promise<string> => {
  const result = await esbuild.build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    write: false,
    target: [`node${process.versions.node}`],
    platform: "node",
    bundle: true,
    format: "esm",
    mainFields: ["main"],
    sourcemap: "inline",
    metafile: true,
    packages: "external",
  });

  if (result.outputFiles.length === 0) {
    process.exit(1);
  }

  const code = result.outputFiles[0]?.text;

  if (!code) {
    process.exit(1);
  }

  return code;
};

const loadConfig = async (code: string, fileName: string): Promise<unknown> => {
  const fileBase = `${fileName}.timestamp-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
  const fileNameTmp = `${fileBase}.mjs`;
  const fileUrl = `${pathToFileURL(fileBase)}.mjs`;
  await fsp.writeFile(fileNameTmp, code);
  try {
    return (await import(fileUrl)).default;
  } finally {
    fs.unlink(fileNameTmp, () => {});
  }
};
