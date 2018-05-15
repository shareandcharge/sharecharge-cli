"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharecharge_lib_1 = require("@motionwerk/sharecharge-lib");
const logicBase_1 = require("../logicBase");
class TokenLogic extends logicBase_1.default {
    constructor() {
        super();
        this.deploy = async (argv) => {
            const name = argv.name.join(' ');
            const symbol = argv.symbol;
            const charging = argv.charging || this.core.sc.charging.address;
            try {
                const result = await this.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
                await this.sc.token.useWallet(this.core.wallet).setAccess(charging);
                console.log(`New contract created at address ${result}`);
                console.log(`Save this address in your config under "tokenAddress" to use it`);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.mint = async (argv) => {
            const owner = await this.isOwner();
            if (!owner) {
                console.log("You do not have the permission to mint tokens for this contract");
                return;
            }
            const driver = argv.driver;
            const amount = argv.amount;
            try {
                await this.sc.token.useWallet(this.core.wallet).mint(driver, amount);
                console.log("Funded driver");
                await this.balance({ driver });
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.balance = async (argv) => {
            const driver = argv.driver || this.core.wallet.keychain[0].address;
            const balance = await this.sc.token.getBalance(driver);
            console.log(`Balance: ${balance}`);
        };
        this.info = async () => {
            const name = await this.sc.token.contract.call("name");
            console.log(`Name:    ${name}`);
            const symbol = await this.sc.token.contract.call("symbol");
            console.log(`Symbol:  ${symbol}`);
            console.log(`Address: ${this.core.sc.token.address}`);
            const owner = await this.sc.token.getOwner();
            console.log(`Owner:   ${owner}`);
        };
        this.isOwner = async () => {
            const owner = await this.sc.token.getOwner();
            return owner.toLowerCase() === this.core.wallet.keychain[0].address;
        };
        this.sc = sharecharge_lib_1.ShareCharge.getInstance({ tokenAddress: this.core.config.tokenAddress });
    }
}
exports.default = TokenLogic;
//# sourceMappingURL=token.logic.js.map