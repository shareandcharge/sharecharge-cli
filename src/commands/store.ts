import StoreLogic from "./store.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const storeLogic = new StoreLogic();

export default (yargs) => {
    yargs
        .usage("Usage: sc store <command> [options]")
        .config("config", "Path to plaintext config file", ConfigProvider.loadConfigFromFile)
        .demandCommand(1)

        .command("add-locations",
            "Add a location (charge point) on the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("file", {
                        alias: 'f',
                        describe: 'json file path containing array of location objects',
                    });

            }, storeLogic.addLocations)

        .command("update-locations",
            "Update a location (charge point) on the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("file", {
                        alias: 'f',
                        describe: 'json file path containing array of location objects',
                    });

            }, storeLogic.updateLocations)

        .command("get-locations",
            "Retrieve a location (charge point) from the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("cpo", {
                        alias: 'c',
                        describe: 'address of the Charge Point Operator (default: your wallet)',
                    })
                    .option("id", {
                        alias: 'i',
                        describe: 'global identifier of a Charge Point'
                    })
                    .string("_")
            }, storeLogic.getLocations)

        .command("get-location-ids",
            "Retrieve Share & Charge location IDs",
            (yargs) => {
                yargs
                    .option("cpo", {
                        alias: 'c',
                        describe: 'address of the Charge Point Operator (default: your wallet)'
                    })
                    .string("_")
            }, storeLogic.getLocationIds)

        .command("remove-locations",
            "Remove all locations (charge point) from the Share&Charge EV Network",
            (yargs) => {

            }, storeLogic.removeLocations)

        .command("add-tariffs",
            "Add tariffs data on the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("file", {
                        alias: 'f',
                        describe: 'json file path containing tariffs data',
                    })

            }, storeLogic.addTariffs)

        .command("update-tariffs",
            "Update tariffs data on the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("file", {
                        alias: 'f',
                        describe: 'json file path containing tariffs data',
                    })

            }, storeLogic.updateTariffs)

        .command("get-tariffs",
            "Retrieve CPO tariffs from the Share&Charge EV Network",
            (yargs) => {

                yargs
                    .option("cpo", {
                        alias: 'c',
                        describe: 'address of the Charge Point Operator (default: your wallet)'
                    })

            }, storeLogic.getTariffs)

        .command("get-owner",
            "Retrieve owner of the location",
            (yargs) => {

                yargs
                    .option("sc-id", {
                        alias: 's',
                        describe: 'The unique Share&Charge identifier for the location'
                    })

            }, storeLogic.getOwner);
}