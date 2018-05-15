"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("../logicBase");
class ChargeLogic extends logicBase_1.default {
    constructor() {
        super(...arguments);
        this.requestStart = async (argv) => {
            const token = argv.token || this.core.sc.token.address;
            console.log('Charging as', this.core.wallet.keychain[0].address);
            console.log(`Committing ${argv.amount} tokens to charging session (token address: ${token})`);
            try {
                await this.core.sc.charging.useWallet(this.core.wallet).requestStart(argv.scId, argv.evseId, token, argv.amount);
                console.log(`Successfully requested remote start on ${argv.evseId}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.confirmStart = async (argv) => {
            try {
                await this.core.sc.charging.useWallet(this.core.wallet).confirmStart(argv.scId, argv.evseId, argv.sessionId);
                console.log(`Successfully confirmed remote session start on ${argv.evseId}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.requestStop = async (argv) => {
            try {
                await this.core.sc.charging.useWallet(this.core.wallet).requestStop(argv.scId, argv.evseId);
                console.log(`Succesfully requested remote stop on ${argv.evseId}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.confirmStop = async (argv) => {
            try {
                await this.core.sc.charging.useWallet(this.core.wallet).confirmStop(argv.scId, argv.evseId);
                console.log(`Successfully confirmed remote session stop on ${argv.evseId}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.chargeDetailRecord = async (argv) => {
            try {
                await this.core.sc.charging.useWallet(this.core.wallet).chargeDetailRecord(argv.scId, argv.evseId, argv.finalPrice);
                console.log(`Successfully issued charge detail record for session on ${argv.evseId}`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
    }
}
exports.default = ChargeLogic;
//# sourceMappingURL=charge.logic.js.map