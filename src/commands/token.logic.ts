import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class TokenLogic extends LogicBase {

    public deploy = async () => {

        const name = (await prompter.getAnswer('Enter the name of your token (e.g. My MSP Token)')).answer;
        let symbol = (await prompter.getAnswer('Enter a symbol for your token (e.g. MSP)')).answer;
        const charging = this.core.sc.charging.address;

        try {
            const result = await this.core.sc.token.useWallet(this.core.wallet).deploy(name, symbol);
            await this.core.sc.token.useWallet(this.core.wallet).setAccess(charging);
            console.log(`New contract created at address ${chalk.green(result)}`);
            console.log(chalk.yellow(`Save this address in your config under "tokenAddress" to use it`));
        } catch (err) {
            console.log(err.message);
        }

    };

    public mint = async () => {
        const owner = await this.isOwner();
        if (!owner) {
            console.log(chalk.red("You do not have the permission to mint tokens for this contract"));
            return;
        }

        const driver = (await prompter.getAnswer('Enter the address of the driver')).answer;
        const amount = (await prompter.getAnswer('Enter the amount of tokens to mint for the driver')).answer;
        
        try {
            await this.core.sc.token.useWallet(this.core.wallet).mint(driver, amount);
            console.log(chalk.green("Funded driver"));
            // await this.balance();
        } catch (err) {
            console.log(err.message);
        }
    };

    public burn = async () => {
        const balance = await this.core.sc.token.getBalance(this.core.wallet.coinbase);
        console.log('Your token balance:', balance);
        const value = (await prompter.getAnswer('Enter number of tokens to burn')).answer || '0';
        const confirmed = (await prompter.getConfirmation(`Confirm burning of ${value} tokens?`)).confirmed;
        if (!confirmed) {
            return;
        }
        await this.core.sc.token.useWallet(this.core.wallet).burn(value);
        const newBalance = await this.core.sc.token.getBalance(this.core.wallet.coinbase);
        console.log('New balance:', newBalance);
    }

    public transfer = async () => {
        const recipient = (await prompter.getAnswer('Enter recipient address')).answer || '0x0';
        const balance = await this.core.sc.token.getBalance(this.core.wallet.coinbase);
        console.log('Your token balance:', balance);
        const value = (await prompter.getAnswer('Enter number of tokens to transfer')).answer || '0';
        const confirmed = (await prompter.getConfirmation(`Confirm transfer of ${value} tokens to ${recipient}?`)).confirmed;
        if (!confirmed) {
            return;
        }
        await this.core.sc.token.useWallet(this.core.wallet).transfer(recipient, value);
        console.log('New balance:', await this.core.sc.token.getBalance(this.core.wallet.coinbase));
    }

    public balance = async () => {
        const driver = (await prompter.getAnswer('Enter the address of the driver')).answer || this.core.wallet.keychain[0].address;
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