"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charge_logic_1 = require("./charge.logic");
const configProvider_1 = require("../services/configProvider");
const chargeLogic = new charge_logic_1.default();
exports.default = (yargs) => {
    yargs
        .usage("Usage: sc charging <command> [options]")
        .config("config", "Path to plaintext config file", configProvider_1.default.loadConfigFromFile)
        .demandCommand(1)
        .command("request-start", "Request a charging session to start at a particular location", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location',
            demand: true
        })
            .option("evse-id", {
            alias: 'e',
            describe: 'An identifier for the EVSE at the location',
            demand: true
        })
            .option("token", {
            alias: 't',
            describe: 'The token address used to transfer funds for the charging session'
        })
            .option("amount", {
            alias: 'a',
            describe: 'The estimated amount of tokens that the charging session will cost',
            default: 0
        });
    }, chargeLogic.requestStart)
        .command("confirm-start", "Confirm the start of a charging session at a particular location", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location',
            demand: true
        })
            .option("evse-id", {
            alias: 'e',
            describe: 'An identifier for the EVSE at the location',
            demand: true
        })
            .option("session-id", {
            describe: 'The token address used to transfer funds for the charging session',
            default: '0x01'
        });
    }, chargeLogic.confirmStart)
        .command("request-stop", "Request a charging session to end at a particular location", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location',
            demand: true
        })
            .option("evse-id", {
            alias: 'e',
            describe: 'An identifier for the EVSE at the location',
            demand: true
        });
    }, chargeLogic.requestStop)
        .command("confirm-stop", "Confirm the end of a charging session at a particular location", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location',
            demand: true
        })
            .option("evse-id", {
            alias: 'e',
            describe: 'An identifier for the EVSE at the location',
            demand: true
        });
    }, chargeLogic.confirmStop)
        .command("cdr", "Issue a Charge Detail Record following the end of a session", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location',
            demand: true
        })
            .option("evse-id", {
            alias: 'e',
            describe: 'An identifier for the EVSE at the location',
            demand: true
        })
            .option("final-price", {
            alias: 'f',
            describe: 'The final price to be paid by the driver',
            default: 0
        });
    }, chargeLogic.chargeDetailRecord);
};
//# sourceMappingURL=charge.js.map