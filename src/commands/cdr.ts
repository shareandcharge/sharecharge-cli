import CdrLogic from './cdr.logic';
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const cdrLogic = new CdrLogic();

export default (yargs) => {

    yargs
        .usage("Usage: sc cdr <command> [options]")
        .demandCommand(1)

        .command("info",
            "Query and filter Charge Detail Records issued by Charge Point Operators",
            yargs => {}, 
            cdrLogic.getInfo)

        .command("filter",
            "filter Charge Detail Records issued by Charge Point Operators",
            yargs => {}, 
            cdrLogic.filter)
}