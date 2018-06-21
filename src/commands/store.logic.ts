import { ShareCharge } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase"
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class StoreLogic extends LogicBase {

    public addLocations = async (argv) => {

        let locations;
        let results: { locId: string, scId: string, ipfs: string }[] = [];

        locations = this.core.locations || [];

        for (const location of locations) {
            try {
                // result should contain location id from OCPI structure
                const result = await this.core.sc.store.useWallet(this.core.wallet).addLocation(location);
                results.push(Object.assign({locId: location.id}, result));
            } catch (err) {
                console.log(err.message);
            }
        }

        console.log(`Added ${results.length} locations to network\n`);
        for (const res of results) {
            console.log(`${res.locId}\nscId: ${res.scId}\nipfs: ${res.ipfs}\n`);
        }

    };

    public updateLocations = async (argv) => {

        let locations;
        let results: { locId: string, scId: string, ipfs: string }[] = [];

        locations = this.core.locations || [];

        const evLocations = await this.core.sc.store.getLocationsByCPO(this.core.wallet.keychain[0].address);

        for (const location of locations) {
            try {

                const evLocation = evLocations.find(loc => {
                    return loc.data ? loc.data.id === location.id : false;
                });

                if (evLocation) {
                    // result should contain location id from OCPI structure
                    const result = await this.core.sc.store.useWallet(this.core.wallet)
                        .updateLocation(evLocation.scId, location);
                    results.push(Object.assign({locId: location.id}, result));
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        console.log(`Updated ${results.length} locations in the network\n`);
        for (const res of results) {
            console.log(`${res.locId}\nscId: ${res.scId}\nipfs: ${res.ipfs}\n`);
        }

    };

    public removeLocations = async (argv) => {

        let results: { scId: string }[] = [];

        const evLocations = await this.core.sc.store.getLocationsByCPO(this.core.wallet.keychain[0].address);

        for (const evLocation of evLocations) {
            try {
                if (evLocation.data) {
                    // result should contain location id from OCPI structure
                    const result = await this.core.sc.store.useWallet(this.core.wallet)
                        .removeLocation(evLocation.scId);
                    results.push(result);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        console.log(`Removed ${results.length} locations from the network\n`);

        for (const res of results) {
            console.log(`scId: ${res.scId}\n`);
        }

    };

    public getLocationIds = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        const ids = await this.core.sc.store.getIdsByCPO(cpo);
        for (const id of ids) {
            console.log(id);
        }
    };

    public getLocations = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        if (argv.id) {
            const locations = await this.core.sc.store.getLocationById(cpo, argv.id);
            console.log(JSON.stringify(locations, null, 2));
        } else {
            const location = await this.core.sc.store.getLocationsByCPO(cpo);
            console.log(JSON.stringify(location, null, 2));
        }
    };

    public addTariffs = async (argv) => {
        try {
            console.log(this.core.config);
            const result = await this.core.sc.store.useWallet(this.core.wallet)
                .addTariffs(this.core.tariffs);
            console.log(`Added tariffs data\nipfs: ${result}`);
        } catch (err) {
            console.log(err.message);
        }
    };

    public updateTariffs = async (argv) => {
        try {
            const result = await this.core.sc.store.useWallet(this.core.wallet)
                .updateTariffs(this.core.tariffs);
            console.log(`Updated tariffs data\nipfs: ${result}`);
        } catch (err) {
            console.log(err.message);
        }
    };

    public getTariffs = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        const result = await this.core.sc.store.getTariffsByCPO(cpo);
        console.log(JSON.stringify(result, null, 2));
    };

    public getOwner = async () => {
        const scId = (await prompter.getAnswer('Enter a Share & Charge Location ID')).answer;
        console.log(scId);
        const owner = await this.core.sc.store.getOwnerOfLocation(scId);
        console.log("Location owner: ",chalk.green(owner));
    }
    
}
