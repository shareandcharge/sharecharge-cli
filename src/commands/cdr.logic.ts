import { log } from 'util';
import { Evse, ShareCharge, ToolKit } from "@motionwerk/sharecharge-lib";
import LogicBase from '../logicBase';

export default class CdrLogic extends LogicBase {

    constructor() {
        super();
    }

    public getInfo = async (argv) => {
        if (!argv.json) {
            const cdrInfo = await this.getCDRInfo(argv);
            console.log(JSON.stringify(cdrInfo, null, 2));
        }
    }

    async getCDRInfo(argv): Promise<any> {

        // filtering
        // const filter = {};
        // if (argv.transactionHash) {
        //     filter['transactionHash'] = argv.transactionHash;
        // }

        const logDetails = await this.core.sc.charging.contract.getLogs('ChargeDetailRecord'/*, filter*/);
        let allLogs = logDetails.map(obj => (
            {
                date: new Date(obj.timestamp * 1000).toUTCString(),
                evseId: obj.returnValues.evseId,
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
                finalPrice: obj.returnValues.finalPrice,
                tokenContract: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }

        ));

        // filtering
        if (argv.transactionHash) {
            allLogs = allLogs.filter(log => (
                log.transactionHash === argv.transactionHash
            ));
            // console.log("Filtered by transaction hash");
        }

        if (argv.controller) {
            allLogs = allLogs.filter(log => (
                log.controller === argv.controller
            ));
            // console.log("Filtered by controller");
        }

        if (argv.scId) {
            allLogs = allLogs.filter(log => {
                log.evseId === argv.evseId
            });
            // console.log("Filtered by Share&Charge Location ID");
        }

        if (argv.evseId) {
            allLogs = allLogs.filter(log => (
                log.evseId === argv.evseId
            ));
            // console.log("Filtered by EVSE ID");
        }

        if (argv.tokenAddress) {
            allLogs = allLogs.filter(log => (
                log.tokenContract === argv.tokenAddress
            ));
            // console.log("Filtered by e-Mobility Service Provider token");
        }

        if (argv.timestamp) {
            allLogs = allLogs.filter(log => (
                log.timestamp === argv.timestamp
            ));
            // console.log("Filtered by timestamp");
        }

        if (argv.date) {
            let date = new Date(argv.date).getTime() / 1000;
            allLogs = allLogs.filter(log => (
                log.timestamp >= date
            ));
            // console.log("Filtered by date");
        }

        return allLogs;
    }
}
