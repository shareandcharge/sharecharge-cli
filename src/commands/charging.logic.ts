import { Evse, ToolKit, Wallet } from "@motionwerk/sharecharge-lib";
import LogicBase from "../logicBase"

export default class ChargingLogic extends LogicBase {

    public requestStart = async (argv) => {
        const token = argv.token || this.core.sc.token.address;
        console.log('charging as', this.core.wallet.keychain[0].address);
        // console.log('params', argv.scId, argv.evseId, token, argv.amount);

        await this.core.sc.charging.useWallet(this.core.wallet).requestStart(argv.scId, argv.evseId, token, argv.amount);
        console.log('Successfully requested start');
    }

    public confirmStart = async (argv) => {
        await this.core.sc.charging.useWallet(this.core.wallet).confirmStart(argv.scId, argv.evseId, argv.sessionId);
        console.log('Successfully confirmed start');
    }

    public requestStop = async (argv) => {
        await this.core.sc.charging.useWallet(this.core.wallet).requestStop(argv.scId, argv.evseId);
        console.log('Succesfully requested stop');
    }

    public confirmStop = async (argv) => {
        await this.core.sc.charging.useWallet(this.core.wallet).confirmStop(argv.scId, argv.evseId);
        console.log('Successfully confirmed stop');
    }

    public chargeDetailRecord = async (argv) => {
        await this.core.sc.charging.useWallet(this.core.wallet).chargeDetailRecord(argv.scId, argv.evseId, argv.finalPrice);
        console.log('Successfully called charge detail record');
    }

}
