import * as cli from "commander";
import { prettifyKeymapFile } from "../keymap";

export function runCLI(process: any) {
  cli
    // .version(version)
    .option("-f --file <path>", "The file to prettify")
    .option(
      "-c --config <path>",
      "The file containing the file and layout mappings"
    )
    .parse(process.argv);

  if (!Boolean(cli.file) && !Boolean(cli.config)) {
    throw new Error("Arguments config or file are not defined");
  }

  prettifyKeymapFile(cli.file, cli.config);
}
