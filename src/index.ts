#!/usr/bin/env node

import * as yargs from "yargs";
import chargeHandler from "./commands/charge";
import tokenHandler from "./commands/token";
import storeHandler from "./commands/store";
import cdrHandler from "./commands/cdr";
import walletHandler from "./commands/wallet";
import configHandler from './commands/config';

const pkg = require('../package.json');

const argv = yargs
    .usage("Usage: sc-cli <command> [options]")
    .version(pkg.version)
    .alias("v", "version")
    .alias("h", "help")
    .option("json", {
        describe: "generate json output"
    })
    .command('config', 'Read and edit the Share & Charge configuration', configHandler, () => yargs.showHelp())
    .command("cdr", "Access and filter Charge Detail Records", cdrHandler, () => yargs.showHelp())
    .command("charging", "Control EV charging sessions", chargeHandler, () => yargs.showHelp())
    .command("store", "Add and query data stored on the Share & Charge EV Network", storeHandler, () => yargs.showHelp())
    .command("token", "Deploy and manage a Mobility Service Provider token", tokenHandler, () => yargs.showHelp())
    .command("wallet", "Create and manage a Share & Charge wallet", walletHandler, () => yargs.showHelp())
    .demandCommand(1)
    .argv
