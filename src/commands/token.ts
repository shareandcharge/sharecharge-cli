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

        .command("mint",
            chalk.yellow("Mint tokens for an EV driver"),
            yargs => {}, 
            tokenLogic.mint)

        .command("balance",
            chalk.yellow("Check balance of EV driver"),
            yargs => {}, 
            tokenLogic.balance)

        .command("info",
            chalk.yellow("Check MSP Token information"),
            {},
            tokenLogic.info)
}