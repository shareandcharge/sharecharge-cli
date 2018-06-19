import CdrLogic from './cdr.logic';
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const cdrLogic = new CdrLogic();

export default (yargs) => {

    yargs
        .usage("Usage: sc cdr <command> [options]")
        .config("config", "Path to plaintext config file", ConfigProvider.loadConfigFromFile)
        .demandCommand(1)

        .command("info",
            "Query and filter Charge Detail Records issued by Charge Point Operators",
            (yargs) => {
                yargs
                    .option("scId", {
                        alias: "s",
                        describe: "Filter by Share & Charge location ID",
                        type: 'string'
                    })
                    .option("evseId", {
                        alias: "e",
                        describe: "Filter by EVSE ID",
                        type: 'string'
                    })
                    .option("controller", {
                        alias: "c",
                        describe: "Filter by controller (driver)",
                        type: 'string'
                    })
                    .option("tokenAddress", {
                        alias: "t",
                        describe: "Filter by a particular token contract address",
                        type: 'string'
                    })
                    .option("start", {
                        describe: "Filter by start date in YYYY-MM-DD format (e.g. 2018-04-01)",
                        type: 'string'
                    })
                    .option("end", {
                        describe: "Filter by end date in YYYY-MM-DD format (note: not inclusive) (e.g. 2018-04-01)",
                        type: 'string'
                    })

            }, cdrLogic.getInfo)
}