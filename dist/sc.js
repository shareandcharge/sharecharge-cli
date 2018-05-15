"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const sharecharge_config_1 = require("@motionwerk/sharecharge-config");
const charge_1 = require("./commands/charge");
const token_1 = require("./commands/token");
const store_1 = require("./commands/store");
const cdr_1 = require("./commands/cdr");
sharecharge_config_1.prepareConfigLocation([
    "locations",
    "locations-bs",
    "tariffs"
]);
const argv = yargs
    .usage("Usage: sc <command> [options]")
    .version("0.0.1")
    .alias("v", "version")
    .alias("h", "help")
    .option("json", {
    describe: "generate json output"
})
    .command("cdr", "Access and filter Charge Detail Records", cdr_1.default, (argv) => {
    yargs.showHelp();
})
    .command("charging", "Control EV charging sessions", charge_1.default, (argv) => {
    yargs.showHelp();
})
    .command("store", "Add and query data stored on the Share&Charge EV Network", store_1.default, (argv) => {
    yargs.showHelp();
})
    .command("token", "Deploy and manage a Mobility Service Provider token", token_1.default, (argv) => {
    yargs.showHelp();
})
    .demandCommand(1)
    .argv;
//# sourceMappingURL=sc.js.map