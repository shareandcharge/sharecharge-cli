import { ShareCharge } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase"

export default class TokenLogic extends LogicBase {

    public deploy = async (argv) => {

        const name = argv.name.join(' ');
        const symbol = argv.symbol;
        const charging = argv.charging || this.core.sc.charging.address;

        try {
            const result = await this.core.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
            await this.core.sc.token.useWallet(this.core.wallet).setAccess(charging);
            console.log(`New contract created at address ${result}`);
            console.log(`Save this address in your config under "tokenAddress" to use it`);
        } catch (err) {
            console.log(err.message);
        }

    };

    public mint = async (argv) => {
        const owner = await this.isOwner();
        if (!owner) {
            console.log("You do not have the permission to mint tokens for this contract");
            return;
        }
        const driver = argv.driver;
        const amount = argv.amount;

        try {
            await this.core.sc.token.useWallet(this.core.wallet).mint(driver, amount);
            console.log("Funded driver");
            await this.balance({driver});
        } catch (err) {
            console.log(err.message);
        }
    };

    public balance = async (argv) => {
        const driver = argv.driver || this.core.wallet.keychain[0].address;
        const balance = await this.core.sc.token.getBalance(driver);
        console.log(`Balance: ${balance}`);
    };

    public info = async () => {
        const name = await this.core.sc.token.contract.call("name");
        console.log(`Name:    ${name}`);
        const symbol = await this.core.sc.token.contract.call("symbol");
        console.log(`Symbol:  ${symbol}`);
        console.log(`Address: ${this.core.sc.token.address}`);
        const owner = await this.core.sc.token.getOwner();
        console.log(`Owner:   ${owner}`);
    };

    private isOwner = async () => {
        const owner = await this.core.sc.token.getOwner();
        return owner.toLowerCase() === this.core.wallet.keychain[0].address.toLowerCase();
    }
} 