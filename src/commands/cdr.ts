import CdrLogic from './cdr.logic';
import ConfigProvider from "../services/configProvider";

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
                    .option("transactionHash", {
                        alias: "x",
                        describe: "Filter by transactionHash"
                    })
                    .option("controller", {
                        alias: "c",
                        describe: "Filter by controller (driver)"
                    })
                    .option("evseId", {
                        alias: "e",
                        describe: "Filter by EVSE ID"
                    })
                    .option("tokenAddress", {
                        alias: "t",
                        describe: "Filter by a particular token contract address",
                    })
                    .option("date", {
                        alias: "d",
                        describe: "Filter by date in YYYY-MM-DD format (e.g. 2018-04-01)",
                    })

            }, cdrLogic.getInfo)
}