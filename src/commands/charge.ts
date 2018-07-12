import ChargeLogic from "./charge.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";


const chargeLogic = new ChargeLogic();

export default (yargs) => {

    return yargs
        .usage("Usage: charging <command> [options]")
        .demandCommand(1)

        .command("request-start",
            chalk.yellow("Request a charging session to start at a particular location"),
            yargs => {}, 
            chargeLogic.requestStart)

        .command("confirm-start",
            chalk.yellow("Confirm the start of a charging session at a particular location"),
            (yargs) => {}, 
            chargeLogic.confirmStart)

        .command("request-stop",
            chalk.yellow("Request a charging session to end at a particular location"),
            yargs => {}, 
            chargeLogic.requestStop)

        .command("confirm-stop",
            chalk.yellow("Confirm the end of a charging session at a particular location"),
            yargs => {}, 
            chargeLogic.confirmStop)

        .command("session",
            chalk.yellow("Query a session at an EVSE"),
            yargs => {}, 
            chargeLogic.getSession)


        .command("cdr",
            chalk.yellow("Issue a Charge Detail Record following the end of a session"),
            yargs => {}, 
            chargeLogic.chargeDetailRecord)

}
