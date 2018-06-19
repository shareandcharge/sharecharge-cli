import { ShareCharge } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class TokenLogic extends LogicBase {
    
    
    public deploy = async () => {

        const name = (await prompter.getName()).name;
        let symbol = (await prompter.getSymbol()).symbol;
        const charging = this.core.sc.charging.address;

        try {
            const result = await this.core.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
            await this.core.sc.token.useWallet(this.core.wallet).setAccess(charging);
            console.log(`New contract created at address ${chalk.green(result)}`);
            console.log(chalk.yellow(`Save this address in your config under "tokenAddress" to use it`));
        } catch (err) {
            console.log(chalk.red(err.message));
        }

    };

    public mint = async () => {
        const owner = await this.isOwner();
        if (!owner) {
            console.log(chalk.red("You do not have the permission to mint tokens for this contract"));
            return;
        }

        const driver = (await prompter.getDriver()).driver;
        const amount = (await prompter.getAmount()).amount;
        
        try {
            await this.core.sc.token.useWallet(this.core.wallet).mint(driver, amount);
            console.log(chalk.green("Funded driver"));
            // await this.balance();
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    };

    public balance = async () => {
        const driver = (await prompter.getDriver()).driver || this.core.wallet.keychain[0].address;
        const balance = await this.core.sc.token.getBalance(driver);
        console.log(chalk.green(`Balance: ${balance}`));
    };

    public info = async () => {
        const name = await this.core.sc.token.contract.call("name");
        console.log(`Name:    ${chalk.green(name)}`);
        const symbol = await this.core.sc.token.contract.call("symbol");
        console.log(`Symbol:  ${chalk.green(symbol)}`);
        console.log(`Address: ${chalk.green(this.core.sc.token.address)}`);
        const owner = await this.core.sc.token.getOwner();
        console.log(`Owner:   ${chalk.green(owner)}`);
    };

    private isOwner = async () => {
        const owner = await this.core.sc.token.getOwner();
        return owner.toLowerCase() === this.core.wallet.keychain[0].address.toLowerCase();
    }

} 