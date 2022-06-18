#! /usr/bin/env node
const { program } = require("commander");
const figlet = require("figlet");

const { login } = require("./src/login");
const { read } = require("./src/getFile");
const { checkVersion } = require("./src/checkVersion");
const { handleProcessedData } = require("./src/handleVersion");
const { writeFile } = require("./src/writeCSV");
const { callLoadingFunc } = require("./src/getSpinner");

program.command("hi").action(async () => {
  let chalk = new (await import("chalk")).Chalk();
  console.log(
    chalk.hex("E2F3F6")(
      figlet.textSync("Dependable Bot", { horizontalLayout: "full" })
    )
  );
  console.log(chalk.hex("#ffc0cb")("(. ❛ ᴗ ❛.)") + " Hey there \n");
});

program
  .command("start")
  .description("Start the program")
  .requiredOption("-i, --input <string>", "csv filename")
  .requiredOption("-t, --token <string>", "github personal access token")
  .option("-u, --update", "flag to create a update PR")
  .argument("<string>", "the dependency to be checked")
  .action(async (dep, options) => {
    let chalk = new (await import("chalk")).Chalk();
    console.log(
      chalk.hex("E2F3F6")(
        figlet.textSync("Dependable Bot", { horizontalLayout: "full" })
      )
    );
    console.log(
      "Built with" +
        chalk.hex("E02743").bold(" <3 ") +
        chalk.hex("286FC6").underline("https://github.com/Dark0017")
    );

    const octokit = await login(options.token);

    //const data = await read(process.cwd() + `/${options.input}`);
    const data = await callLoadingFunc("Loading file", "File Loaded", read, [
      process.cwd() + `/${options.input}`,
    ]);

    // const proccessedData = await checkVersion(data, octokit, dep);
    const proccessedData = await callLoadingFunc(
      "Checking dependencies",
      "Dependencies verified",
      checkVersion,
      [data, octokit, dep]
    );
    //console.log("PROCESSED:", proccessedData);
    if (options.update) {
      // const handledData = await handleProcessedData(
      //   proccessedData,
      //   octokit,
      //   dep
      // );
      const handledData = await callLoadingFunc(
        "Creating PRs",
        "PR creation finished",
        handleProcessedData,
        [proccessedData, octokit, dep]
      );
      //console.log("HANDLED: ", handledData);

      await callLoadingFunc(
        "Writing file",
        "File writing finished",
        writeFile,
        [handledData, true]
      );
    } else {
      await callLoadingFunc(
        "Writing file",
        "File writing finished",
        writeFile,
        [proccessedData]
      );
    }
  });

program.parse();

module.exports = { program };
