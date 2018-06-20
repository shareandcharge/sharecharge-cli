import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class ChargeLogic extends LogicBase {

    public requestStart = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;
        const token =  this.core.sc.token.address;
        const amount = (await prompter.getAmount()).amount;

        console.log('Charging as', chalk.green(this.core.wallet.keychain[0].address));
        console.log(`Committing ${amount} tokens to charging session (token address: ${token})`);
        try {
            await this.core.sc.charging.useWallet(this.core.wallet).requestStart(scId, evseId, token, amount);
            console.log("Successfully requested remote start on ", chalk.green(evseId));
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    };

    public confirmStart = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;
        const sessionId = '0x01';

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).confirmStart(scId, evseId, sessionId);
            console.log("Successfully confirmed remote session start on ", chalk.green(evseId));
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    };

    public requestStop = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).requestStop(scId, evseId);
            console.log("Succesfully requested remote stop on ", chalk.green(evseId));
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    };

    public confirmStop = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).confirmStop(scId, evseId);
            console.log("Successfully confirmed remote session stop on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    };

    public getSession = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;

        try {
            const session = await this.core.sc.charging.getSession(scId, evseId);
            console.log(JSON.stringify(session, null, 2));
        } catch (err) {
            console.log(chalk.red(err.message));
        }
    }

    public reset = async () => {
        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).reset(scId,evseId);
            console.log("Successfully reset session on scId: " , scId, " evseId: ", evseId);
        } catch (err) {
            console.log(err.message);
        }
    };

    public chargeDetailRecord = async () => {

        const scId = (await prompter.getScId()).scId
        const evseId = (await prompter.getEvseId()).evseId;
        const amount = (await prompter.getAmount()).amount;

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).chargeDetailRecord(scId, evseId, amount);
            console.log("Successfully issued charge detail record for session on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    }

}
