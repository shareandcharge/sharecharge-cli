"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("../logicBase");
class StoreLogic extends logicBase_1.default {
    constructor() {
        super();
        this.addLocation = (argv) => __awaiter(this, void 0, void 0, function* () {
            let locations;
            let results = [];
            if (argv.file) {
                const path = '../../../' + argv.file;
                locations = require(path);
            }
            else {
                locations = this.core.locations || [];
            }
            for (const location of locations) {
                try {
                    // result should contain location id from OCPI structure
                    const result = yield this.core.sc.store.useWallet(this.core.wallet).addLocation(location);
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
        });
        this.getLocation = (argv) => __awaiter(this, void 0, void 0, function* () {
            const cpo = argv.cpo || this.core.wallet.keychain[0].address;
            if (argv.id) {
                const locations = yield this.core.sc.store.getLocationById(cpo, argv.id);
                console.log(JSON.stringify(locations, null, 2));
            }
            else {
                const location = yield this.core.sc.store.getLocationsByCPO(cpo);
                console.log(JSON.stringify(location, null, 2));
            }
        });
        this.addTariffs = (argv) => __awaiter(this, void 0, void 0, function* () {
            let tariffs;
            if (argv.file) {
                const path = '../../../' + argv.file;
                tariffs = require(path);
            }
            else {
                tariffs = this.core.tariffs;
            }
            try {
                const result = yield this.core.sc.store.useWallet(this.core.wallet).addTariffs(tariffs);
                console.log(`Added tariff data\nipfs: ${result}`);
            }
            catch (err) {
                console.log(err.message);
            }
        });
        this.getTariffs = (argv) => __awaiter(this, void 0, void 0, function* () {
            const cpo = argv.cpo || this.core.wallet.keychain[0].address;
            const result = yield this.core.sc.store.getTariffsByCPO(cpo);
            console.log(JSON.stringify(result, null, 2));
        });
    }
}
exports.default = StoreLogic;
//# sourceMappingURL=store.logic.js.map