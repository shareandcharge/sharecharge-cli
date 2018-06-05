"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("../logicBase");
class StoreLogic extends logicBase_1.default {
    constructor() {
        super(...arguments);
        this.addLocations = async (argv) => {
            let locations;
            let results = [];
            // if (argv.file) {
            //     const path = '../../../' + argv.file;
            //     locations = require(path)
            // } else {
            //     locations = this.core.locations || [];
            // }
            locations = this.core.locations || [];
            for (const location of locations) {
                try {
                    // result should contain location id from OCPI structure
                    const result = await this.core.sc.store.useWallet(this.core.wallet).addLocation(location);
                    results.push(Object.assign({ locId: location.id }, result));
                }
                catch (err) {
                    console.log(err.message);
                }
            }
            console.log(`Added ${results.length} locations to network\n`);
            for (const res of results) {
                console.log(`${res.locId}\nscId: ${res.scId}\nipfs: ${res.ipfs}\n`);
            }
        };
        this.updateLocations = async (argv) => {
            let locations;
            let results = [];
            // if (argv.file) {
            //     const path = '../../../' + argv.file;
            //     locations = require(path)
            // } else {
            //     locations = this.core.locations || [];
            // }
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
                        results.push(Object.assign({ locId: location.id }, result));
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
            console.log(`Updated ${results.length} locations in the network\n`);
            for (const res of results) {
                console.log(`${res.locId}\nscId: ${res.scId}\nipfs: ${res.ipfs}\n`);
            }
        };
        this.removeLocations = async (argv) => {
            let results = [];
            const evLocations = await this.core.sc.store.getLocationsByCPO(this.core.wallet.keychain[0].address);
            for (const evLocation of evLocations) {
                try {
                    if (evLocation.data) {
                        // result should contain location id from OCPI structure
                        const result = await this.core.sc.store.useWallet(this.core.wallet)
                            .removeLocation(evLocation.scId);
                        results.push(result);
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
            console.log(`Removed ${results.length} locations from the network\n`);
            for (const res of results) {
                console.log(`scId: ${res.scId}\n`);
            }
        };
        this.getLocationIds = async (argv) => {
            const cpo = argv.cpo || this.core.wallet.keychain[0].address;
            const ids = await this.core.sc.store.getIdsByCPO(cpo);
            for (const id of ids) {
                console.log(id);
            }
        };
        this.getLocations = async (argv) => {
            const cpo = argv.cpo || this.core.wallet.keychain[0].address;
            if (argv.id) {
                const locations = await this.core.sc.store.getLocationById(cpo, argv.id);
                console.log(JSON.stringify(locations, null, 2));
            }
            else {
                const location = await this.core.sc.store.getLocationsByCPO(cpo);
                console.log(JSON.stringify(location, null, 2));
            }
        };
        this.addTariffs = async (argv) => {
            // let tariffs;
            // if (argv.file) {
            //     const path = '../../../' + argv.file;
            //     tariffs = require(path);
            // } else {
            //     tariffs = this.core.tariffs;
            // }
            try {
                console.log(this.core.config);
                const result = await this.core.sc.store.useWallet(this.core.wallet)
                    .addTariffs(this.core.tariffs);
                console.log(`Added tariffs data\nipfs: ${result}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.updateTariffs = async (argv) => {
            try {
                const result = await this.core.sc.store.useWallet(this.core.wallet)
                    .updateTariffs(this.core.tariffs);
                console.log(`Updated tariffs data\nipfs: ${result}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.getTariffs = async (argv) => {
            const cpo = argv.cpo || this.core.wallet.keychain[0].address;
            const result = await this.core.sc.store.getTariffsByCPO(cpo);
            console.log(JSON.stringify(result, null, 2));
        };
        this.getOwner = async (argv) => {
            const owner = await this.core.sc.store.getOwnerOfLocation(argv.scId);
            console.log(owner);
        };
    }
}
exports.default = StoreLogic;
//# sourceMappingURL=store.logic.js.map