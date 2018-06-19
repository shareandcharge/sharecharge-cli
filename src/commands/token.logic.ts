import { ShareCharge } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class TokenLogic extends LogicBase {
    
    
    public deploy = async (argv) => {

        const name = argv.name.join(' ');
        const symbol = argv.symbol;
        const charging = this.core.sc.charging.address;

        // if(name === undefined || symbol === undefined || charging === undefined){
        //     name = (await prompter.getName()).name.join;
        //     symbol = (await prompter.getSymbol()).symbol;
        // }

        try {
            const result = await this.core.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
            await this.core.sc.token.useWallet(this.core.wallet).setAccess(charging);
            console.log(chalk.green(`New contract created at address ${chalk.blue(result)}`));
            console.log(chalk.blue(`Save this address in your config under "tokenAddress" to use it`));
        } catch (err) {
            console.log(chalk.red(err.message));
        }

    };

    public mint = async (argv) => {
        const owner = await this.isOwner();
        if (!owner) {
            console.log(chalk.red("You do not have the permission to mint tokens for this contract"));
            return;
        }
        let driver = argv.driver;
        let amount = argv.amount;

        if(argv.driver === undefined || argv.amount === undefined){
            driver = await prompter.getDriver();
            amount = await prompter.getAmount();
        }
        
        try {
            await this.core.sc.token.useWallet(this.core.wallet).mint(driver, amount);
            console.log(chalk.blue("Funded driver"));
            await this.balance({driver});
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    };

    public balance = async (argv) => {
        if(argv.driver === undefined) {
            const driver = await prompter.getDriver();
        }
        const driver = argv.driver || this.core.wallet.keychain[0].address;
        const balance = await this.core.sc.token.getBalance(driver);
        console.log(chalk.green(`Balance: ${balance}`));
    };

    public info = async () => {
        const name = await this.core.sc.token.contract.call("name");
        console.log(chalk.green(`Name:    ${chalk.blue(name)}`));
        const symbol = await this.core.sc.token.contract.call("symbol");
        console.log(chalk.green(`Symbol:  ${chalk.blue(symbol)}`));
        console.log(chalk.green(`Address: ${chalk.blue(this.core.sc.token.address)}`));
        const owner = await this.core.sc.token.getOwner();
        console.log(chalk.green(`Owner:   ${chalk.blue(owner)}`));
    };

    private isOwner = async () => {
        const owner = await this.core.sc.token.getOwner();
        return owner.toLowerCase() === this.core.wallet.keychain[0].address.toLowerCase();
    }

} 