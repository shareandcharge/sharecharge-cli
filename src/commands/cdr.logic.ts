import { log } from 'util';
import LogicBase from '../logicBase';
import { ToolKit } from '@motionwerk/sharecharge-lib';
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
export default class CdrLogic extends LogicBase {

    public getInfo = async (argv) => {
        if (!argv.json) {
            const cdrInfo = await this.getCDRInfo(argv);
            console.log(JSON.stringify(cdrInfo, null, 2));
        }
    };

    public filter = async (argv) => {
        const cdrInfo = await this.filterBy();
        console.log(JSON.stringify(cdrInfo, null, 2));
    }

    async getCDRInfo(argv): Promise<any> {
        const filter = {};

        const logDetails = await this.core.sc.charging.contract.getLogs('ChargeDetailRecord', filter);
        let allLogs: any = logDetails.map(obj => (
            {
                timestamp: obj.returnValues.timestamp,
                date: new Date(obj.returnValues.timestamp * 1000).toUTCString(),
                evseId: ToolKit.hexToString(obj.returnValues.evseId),
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
                finalPrice: obj.returnValues.finalPrice,
                tokenAddress: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }
        ));

        return allLogs;
    }

    async filterBy() {
        const choice = (await prompter.filterBy()).filter;
        const filter = {};

        for(let element of choice) {
            filter[element] = (await prompter.getInput(element)).filter;
        }

        const logDetails = await this.core.sc.charging.contract.getLogs('ChargeDetailRecord', filter);
        let allLogs: any = logDetails.map(obj => (
            {
                timestamp: obj.returnValues.timestamp,
                date: new Date(obj.returnValues.timestamp * 1000).toUTCString(),
                evseId: ToolKit.hexToString(obj.returnValues.evseId),
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
                finalPrice: obj.returnValues.finalPrice,
                tokenAddress: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }
        ));
        
        return allLogs;
    }


}
