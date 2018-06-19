import TokenLogic from "./token.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const tokenLogic = new TokenLogic();

export default (yargs) => {
    yargs
        .usage(chalk.yellow.bold("Usage: sc msp <command> [options]"))
        .config("config", "Path to plaintext config file", ConfigProvider.loadConfigFromFile)
        .demandCommand(1)

        .command("deploy",
            chalk.yellow("Deploy a new MSP Token Contract (warning: high gas cost!)"),
            yargs => {},
            tokenLogic.deploy)

        .command("mint",
        chalk.yellow("Mint tokens for an EV driver"),
            yargs => {
                yargs
                    .option("driver", {
                        alias: "d",
                        describe: "the address of the driver to fund",
                        type: "string"
                    })
                    .string("_")
                    // .demand("driver");

                yargs
                    .option("amount", {
                        alias: "a",
                        describe: "the amount of tokens to fund",
                        type: "number"
                    })
                    // .demand("amount")
            }, tokenLogic.mint)

        .command("balance",
        chalk.yellow("Check balance of EV driver"),
            yargs => {
                yargs
                    .option("driver", {
                        alias: "d",
                        describe: "the address of the driver",
                        type: "string"
                    })
                    .string("_")

            }, tokenLogic.balance)

        .command("info",
        chalk.yellow("Check MSP Token information"),
            {},
            tokenLogic.info)
}