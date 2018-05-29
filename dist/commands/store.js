"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_logic_1 = require("./store.logic");
const configProvider_1 = require("../services/configProvider");
const storeLogic = new store_logic_1.default();
exports.default = (yargs) => {
    yargs
        .usage("Usage: sc store <command> [options]")
        .config("config", "Path to plaintext config file", configProvider_1.default.loadConfigFromFile)
        .demandCommand(1)
        .command("add-locations", "Add a location (charge point) on the Share&Charge EV Network", (yargs) => {
        yargs
            .option("file", {
            alias: 'f',
            describe: 'json file path containing array of location objects',
        });
    }, storeLogic.addLocation)
        .command("get-ids", "Retrieve Share & Charge location IDs", (yargs) => {
        yargs
            .option("cpo", {
            alias: 'c',
            describe: 'address of the Charge Point Operator (default: your wallet)'
        })
            .string("_");
    }, storeLogic.getIds)
        .command("get-locations", "Retrieve a location (charge point) from the Share&Charge EV Network", (yargs) => {
        yargs
            .option("cpo", {
            alias: 'c',
            describe: 'address of the Charge Point Operator (default: your wallet)',
        })
            .option("id", {
            alias: 'i',
            describe: 'global identifier of a Charge Point'
        })
            .string("_");
    }, storeLogic.getLocation)
        .command("add-tariffs", "Add tariffs data on the Share&Charge EV Network", (yargs) => {
        yargs
            .option("file", {
            alias: 'f',
            describe: 'json file path containing tariffs data',
        });
    }, storeLogic.addTariffs)
        .command("get-tariffs", "Retrieve CPO tariffs from the Share&Charge EV Network", (yargs) => {
        yargs
            .option("cpo", {
            alias: 'c',
            describe: 'address of the Charge Point Operator (default: your wallet)'
        });
    }, storeLogic.getTariffs)
        .command("get-owner", "Retrieve owner of the location", (yargs) => {
        yargs
            .option("sc-id", {
            alias: 's',
            describe: 'The unique Share&Charge identifier for the location'
        });
    }, storeLogic.getOwner);
};
//# sourceMappingURL=store.js.map