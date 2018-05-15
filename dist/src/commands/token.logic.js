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
const sharecharge_lib_1 = require("@motionwerk/sharecharge-lib");
const logicBase_1 = require("../logicBase");
class TokenLogic extends logicBase_1.default {
    constructor() {
        super();
        this.deploy = (argv) => __awaiter(this, void 0, void 0, function* () {
            const name = argv.name.join(' ');
            const symbol = argv.symbol;
            const charging = argv.charging || this.core.sc.charging.address;
            try {
                const result = yield this.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
                yield this.sc.token.useWallet(this.core.wallet).setAccess(charging);
                console.log(`New contract created at address ${result}`);
                console.log(`Save this address in your config under "tokenAddress" to use it`);
            }
            catch (err) {
                console.log(err.message);
            }
        });
        this.mint = (argv) => __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.isOwner();
            if (!owner) {
                console.log("You do not have the permission to mint tokens for this contract");
                return;
            }
            const driver = argv.driver;
            const amount = argv.amount;
            try {
                yield this.sc.token.useWallet(this.core.wallet).mint(driver, amount);
                console.log("Funded driver");
                yield this.balance({ driver });
            }
            catch (err) {
                console.log(err.message);
            }
        });
        this.balance = (argv) => __awaiter(this, void 0, void 0, function* () {
            const driver = argv.driver || this.core.wallet.keychain[0].address;
            const balance = yield this.sc.token.getBalance(driver);
            console.log(`Balance: ${balance}`);
        });
        this.info = () => __awaiter(this, void 0, void 0, function* () {
            const name = yield this.sc.token.contract.call("name");
            console.log(`Name:    ${name}`);
            const symbol = yield this.sc.token.contract.call("symbol");
            console.log(`Symbol:  ${symbol}`);
            console.log(`Address: ${this.core.sc.token.address}`);
            const owner = yield this.sc.token.getOwner();
            console.log(`Owner:   ${owner}`);
        });
        this.isOwner = () => __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.sc.token.getOwner();
            return owner.toLowerCase() === this.core.wallet.keychain[0].address;
        });
        this.sc = sharecharge_lib_1.ShareCharge.getInstance({ tokenAddress: this.core.config.tokenAddress });
    }
}
exports.default = TokenLogic;
//# sourceMappingURL=token.logic.js.map