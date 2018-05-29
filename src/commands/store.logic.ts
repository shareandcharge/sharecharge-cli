import { ShareCharge } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase"

export default class StoreLogic extends LogicBase {

    public addLocation = async (argv) => {

        let locations;
        let results: { locId: string, scId: string, ipfs: string }[] = [];

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
            } catch (err) {
                console.log(err.message);
            }
        }
        
        console.log(`Added ${results.length} locations to network\n`);
        for (const res of results) {
            console.log(`${res.locId}\nscId: ${res.scId}\nipfs: ${res.ipfs}\n`);
        }

    }

    public getIds = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        const ids = await this.core.sc.store.getIdsByCPO(cpo);
        for (const id of ids) {
            console.log(id);
        }
    }

    public getLocation = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        if (argv.id) {
            const locations = await this.core.sc.store.getLocationById(cpo, argv.id);
            console.log(JSON.stringify(locations, null, 2));
        } else {
            const location = await this.core.sc.store.getLocationsByCPO(cpo);
            console.log(JSON.stringify(location, null, 2));
        }
    }

    public addTariffs = async (argv) => {
        // let tariffs;
        // if (argv.file) {
        //     const path = '../../../' + argv.file;
        //     tariffs = require(path);
        // } else {
        //     tariffs = this.core.tariffs;
        // }
        try {
            console.log(this.core.config);
            const result = await this.core.sc.store.useWallet(this.core.wallet).addTariffs(this.core.tariffs);
            console.log(`Added tariffs data\nipfs: ${result}`);
        } catch (err) {
            console.log(err.message);
        }
    }

    public updateTariffs = async (argv) => {
        try {
            const result = await this.core.sc.store.useWallet(this.core.wallet).updateTariffs(this.core.tariffs);
            console.log(`Updated tariffs data\nipfs: ${result}`);
        } catch (err) {
            console.log(err.message);
        }
    }

    public getTariffs = async (argv) => {
        const cpo = argv.cpo || this.core.wallet.keychain[0].address;
        const result = await this.core.sc.store.getTariffsByCPO(cpo);
        console.log(JSON.stringify(result, null, 2));
    }

    public getOwner = async (argv) => {
        const owner = await this.core.sc.store.getOwnerOfLocation(argv.scId);
        console.log(owner);
    }

}
