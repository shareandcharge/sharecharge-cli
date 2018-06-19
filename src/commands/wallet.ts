import ConfigProvider from "../services/configProvider";
import chalk from "chalk";
import WalletLogic from "./wallet.logic";

const walletLogic = new WalletLogic();

export default (yargs) => {
    yargs
        .usage("Usage: sc wallet <command> [options]")
        .demandCommand(1)

        .command("create",
            chalk.yellow("Create a new Share & Charge e-Mobility wallet"),
            {},
            walletLogic.create)

        .command("info",
            chalk.yellow("Show information about the current wallet"),
            {},
            walletLogic.info)

        .command("balance",
        chalk.yellow("Show the network balance of the current wallet"),
            {}, 
            walletLogic.balance)

        .command("fund",
        chalk.yellow("Request funds from the coinbase of the ethProvider"),
            {}, 
            walletLogic.fund)
}