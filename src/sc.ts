import * as yargs from "yargs";
import chargingHandler from "./commands/charging";
import tokenHandler from "./commands/token";
import storageHandler from "./commands/storage";
import cdrHandler from "./commands/cdr";

const argv = yargs
    .usage("Usage: sc <command> [options]")
    .version("0.0.1")
    .alias("v", "version")
    .alias("h", "help")
    .option("json", {
        describe: "generate json output"
    })
    .command("cdr", "Access and filter Charge Detail Records", cdrHandler, (argv) => {
        yargs.showHelp();
    })
    .command("charging", "Control EV charging sessions", chargingHandler, (argv) => {
        yargs.showHelp();
    })
    .command("store", "Add and query data stored on the Share&Charge EV Network", storageHandler, (argv) => {
        yargs.showHelp();
    })
    .command("token", "Deploy and manage a Mobility Service Provider token", tokenHandler, (argv) => {
        yargs.showHelp();
    })
    .demandCommand(1)
    .argv;
