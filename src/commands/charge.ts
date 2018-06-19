import ChargeLogic from "./charge.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";


const chargeLogic = new ChargeLogic();

export default (yargs) => {

    yargs
        .usage("Usage: sc charging <command> [options]")
        .demandCommand(1)

        .command("request-start",
            chalk.yellow("Request a charging session to start at a particular location"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         // demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
                //     .option("token", {
                //         alias: 't',
                //         describe: 'The token address used to transfer funds for the charging session'
                //     })
                //     .option("amount", {
                //         alias: 'a',
                //         describe: 'The estimated amount of tokens that the charging session will cost',
                //         default: 0
                //     })
            }, chargeLogic.requestStart)

        .command("confirm-start",
        chalk.yellow("Confirm the start of a charging session at a particular location"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
                //     .option("session-id", {
                //         describe: 'The token address used to transfer funds for the charging session',
                //         default: '0x01'
                //     })
            }, chargeLogic.confirmStart)

        .command("request-stop",
        chalk.yellow("Request a charging session to end at a particular location"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
            }, chargeLogic.requestStop)

        .command("confirm-stop",
        chalk.yellow("Confirm the end of a charging session at a particular location"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
            }, chargeLogic.confirmStop)

        .command("session",
        chalk.yellow("Query a session at an EVSE"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
            }, chargeLogic.getSession)

        .command("reset",
        chalk.yellow("Resets a charging session"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
            }, chargeLogic.reset)

        .command("cdr",
        chalk.yellow("Issue a Charge Detail Record following the end of a session"),
            (yargs) => {
                // yargs
                //     .option("sc-id", {
                //         alias: 's',
                //         describe: 'The unique Share&Charge identifier for the location',
                //         demand: true
                //     })
                //     .option("evse-id", {
                //         alias: 'e',
                //         describe: 'An identifier for the EVSE at the location',
                //         demand: true
                //     })
                //     .option("final-price", {
                //         alias: 'f',
                //         describe: 'The final price to be paid by the driver',
                //         default: 0
                //     })
            }, chargeLogic.chargeDetailRecord)

}
