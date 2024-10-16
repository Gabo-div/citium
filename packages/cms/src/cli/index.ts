import yargs, { Arguments } from "yargs-parser";
import { CITIUM_VERSION } from "../constants";
import * as colors from "kleur/colors";

enum CLICommand {
  help = "help",
  version = "version",
  db = "db",
  dev = "dev",
}

export const cli = async (args: string[]) => {
  const flags = yargs(args);

  const cmd = resolveCommand(flags);

  try {
    await runCommand(cmd, flags);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const resolveCommand = (flags: Arguments): CLICommand => {
  if (flags.version) return CLICommand.version;

  const cmd = flags._[2] as string;

  if (CLICommand[cmd as keyof typeof CLICommand]) {
    return cmd as CLICommand;
  }

  return CLICommand.help;
};

const runCommand = async (cmd: CLICommand, flags: Arguments) => {
  if (cmd === "help") {
    printHelp();
    return;
  }

  if (cmd === "version") {
    printVersion();
    return;
  }

  if (cmd === "db") {
    const { db } = await import("./db/index.js");
    db(flags);
    return;
  }

  if (cmd === "dev") {
    const { dev } = await import("./dev/index.js");
    dev(flags);
    return;
  }

  throw new Error(`Unhandled command: ${cmd}`);
};

export const printHelp = () => {
  console.log("help");
};

function printVersion() {
  console.log();
  console.log(
    `  ${colors.bgGreen(colors.black(` CITIUM `))} ${colors.green(`v${CITIUM_VERSION}`)}`,
  );
}
