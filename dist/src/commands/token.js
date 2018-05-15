"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_logic_1 = require("./token.logic");
const configProvider_1 = require("../services/configProvider");
const tokenLogic = new token_logic_1.default();
exports.default = (yargs) => {
    yargs
        .usage("Usage: sc msp <command> [options]")
        .config("config", "Path to plaintext config file", configProvider_1.default.loadConfigFromFile)
        .demandCommand(1)
        .command("deploy", "Deploy a new MSP Token Contract (warning: high gas cost!)", yargs => {
        yargs
            .option("name", {
            alias: "n",
            describe: "the public name of your token (e.g. My MSP Token)",
            type: "array"
        })
            .demand("name");
        yargs
            .option("symbol", {
            alias: "s",
            describe: "the short identifier of your token (e.g. MSP)",
            type: "string"
        })
            .demand("symbol");
        yargs
            .option("charging", {
            alias: "c",
            describe: "The charging contract to grant access to your MSP token",
            type: "string"
        });
    }, tokenLogic.deploy)
        .command("mint", "Mint tokens for an EV driver", yargs => {
        yargs
            .option("driver", {
            alias: "d",
            describe: "the address of the driver to fund",
            type: "string"
        })
            .string("_")
            .demand("driver");
        yargs
            .option("amount", {
            alias: "a",
            describe: "the amount of tokens to fund",
            type: "number"
        })
            .demand("amount");
    }, tokenLogic.mint)
        .command("balance", "Check balance of EV driver", yargs => {
        yargs
            .option("driver", {
            alias: "d",
            describe: "the address of the driver",
            type: "string"
        })
            .string("_");
    }, tokenLogic.balance)
        .command("info", "Check MSP Token information", {}, tokenLogic.info);
};
//# sourceMappingURL=token.js.map