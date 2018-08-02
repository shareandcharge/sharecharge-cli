import TokenLogic from "./token.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const tokenLogic = new TokenLogic();

export default (yargs) => {
    
    return yargs
        .usage("Usage: token <command> [options]")
        .demandCommand(1)

        .command("deploy",
            chalk.yellow("Deploy a new MSP Token Contract (warning: high gas cost!)"),
            yargs => {},
            tokenLogic.deploy)

            .command("balance",
            chalk.yellow("Check balance of EV driver"),
            yargs => {}, 
            tokenLogic.balance)

        .command("info",
            chalk.yellow("Check MSP Token information"),
            {},
            tokenLogic.info)

        .command("mint",
            chalk.yellow("Mint tokens for an EV driver"),
            yargs => {}, 
            tokenLogic.mint)

        .command("burn",
            chalk.yellow("Burn tokens from your wallet"),
            yargs => {},
            tokenLogic.burn)

        .command('transfer',
            chalk.yellow('Transfer tokens to another wallet address'),
            yargs => {},
            tokenLogic.transfer)
}