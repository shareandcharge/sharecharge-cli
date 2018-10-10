import ConfigLogic from './config.logic';
import chalk from "chalk";
import { Argv } from 'yargs';

const configLogic = new ConfigLogic();

export default (yargs: Argv) => {

    return yargs
        .usage("Usage: config <command>")
        .demandCommand(1)

        .command("get [key]",
        chalk.yellow("Get Share & Charge configuration values"),
            (yargs: Argv) => {
                return yargs
                    .positional('key', {
                        desc: 'The key of the configuration value to get',
                        type: 'string'
                    });
            }, 
            configLogic.get)

        .command("set <key> <value>",
        chalk.yellow("Set Share & Charge configuration values"),
            (yargs: Argv) => {
                return yargs
                .positional('key', {
                    desc: 'The key of the configuration value to set',
                    type: 'string'
                })
                .positional('value', {
                    desc: 'The value to set the key to',
                    type: 'string'
                });
            }, 
            configLogic.set)
        .command("edit", "Open the Share & Charge configuration in your editor", {}, configLogic.edit)
}