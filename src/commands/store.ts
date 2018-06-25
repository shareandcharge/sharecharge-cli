import StoreLogic from "./store.logic";
import ConfigProvider from "../services/configProvider";
import chalk from "chalk";

const storeLogic = new StoreLogic();

export default (yargs) => {
    yargs
        .usage("Usage: sc store <command> [options]")
        .demandCommand(1)

        .command("add-locations",
            chalk.yellow("Add a location (charge point) on the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.addLocations)

        .command("update-locations",
            chalk.yellow("Update a location (charge point) on the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.updateLocations)

        .command("get-locations",
            chalk.yellow("Retrieve a location (charge point) from the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.getLocations)

        .command("get-location-ids",
            chalk.yellow("Retrieve Share & Charge location IDs"),
            yargs => {}, 
            storeLogic.getLocationIds)

        .command("remove-locations",
            chalk.yellow("Remove locations (charge point) from the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.removeLocations)

        .command("add-tariffs",
            chalk.yellow("Add tariffs data on the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.addTariffs)

        .command("update-tariffs",
            chalk.yellow("Update tariffs data on the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.updateTariffs)

        .command("get-tariffs",
            chalk.yellow("Retrieve CPO tariffs from the Share&Charge EV Network"),
            yargs => {}, 
            storeLogic.getTariffs)

        .command("get-owner",
        chalk.yellow("Retrieve owner of the location"),
            yargs => {}, 
            storeLogic.getOwner);
}