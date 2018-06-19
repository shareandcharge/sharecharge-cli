import * as yargs from "yargs";
import chargeHandler from "./commands/charge";
import tokenHandler from "./commands/token";
import storeHandler from "./commands/store";
import cdrHandler from "./commands/cdr";
import walletHandler from "./commands/wallet";

const argv = yargs
    .usage("Usage: sc <command> [options]")
    .version("0.0.1")
    .alias("v", "version")
    .alias("h", "help")
    .option("json", {
        describe: "generate json output"
    })
    .command("cdr", "Access and filter Charge Detail Records", cdrHandler, yargs.showHelp)
    .command("charging", "Control EV charging sessions", chargeHandler, yargs.showHelp)
    .command("store", "Add and query data stored on the Share & Charge EV Network", storeHandler, yargs.showHelp)
    .command("token", "Deploy and manage a Mobility Service Provider token", tokenHandler, yargs.showHelp)
    .command("wallet", "Create and manage a Share & Charge wallet", walletHandler, yargs.showHelp)
    .demandCommand(1)
    .argv
