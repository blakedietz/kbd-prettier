import * as cli from "commander";
import * as fs from "fs";
import * as path from "path";
import { prettifyKeymapFile } from "../keymap";

const { version } = JSON.parse(
  fs
    .readFileSync(path.resolve(path.join(__dirname, "../../package.json")))
    .toString()
);

export function runCLI(process: any) {
  cli
    .version(version)
    .option("-f --file <path>", "The file to prettify")
    .option(
      "-c --config <path>",
      "The file containing the file and layout mappings"
    )
    .parse(process.argv);

  if (!Boolean(cli.file) && !Boolean(cli.config)) {
    throw new Error("Arguments config or file are not defined");
    process.exit(1);
  }

  prettifyKeymapFile(cli.file, cli.config);
}
