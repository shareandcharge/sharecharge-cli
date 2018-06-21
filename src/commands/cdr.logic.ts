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

    public getFilter = async (argv) => {
        const cdrInfo = await this.filterBy();
        console.log(JSON.stringify(cdrInfo, null, 2));
    }

    async getCDRInfo(argv): Promise<any> {
        
        const filters = {};
        // filtering
        if (argv.scId) {
            filters['scId'] = argv.scId.toLowerCase();
        }

        if (argv.evseId) {
            const evseHex = ToolKit.asciiToHex(argv.evseId);
            const evsePadded = evseHex.padEnd(66, '0');
            filters['evseId'] = evsePadded;
        }
        if (argv.controller) {
            filters['controller'] = argv.controller.toLowerCase();
        }
        if (argv.tokenAddress) {
            filters['tokenAddress'] = argv.tokenAddress.toLowerCase();
        }
        if (argv.start || argv.end) {
            const start = Math.round(new Date(argv.start).getTime() / 1000 || 0);
            const end = Math.round(new Date(argv.end).getTime() / 1000 || Date.now() / 1000);
            filters['timestamp'] = { start, end };
        }

        const logDetails = await this.core.sc.charging.contract.getLogs('ChargeDetailRecord', filters);
        let allLogs: any = logDetails.map(obj => (
            {
                scId: obj.returnValues.scId,
                evseId: ToolKit.hexToString(obj.returnValues.evseId),
                start: new Date(obj.returnValues.startTime * 1000).toUTCString(),
                end: new Date(obj.returnValues.endTime * 1000).toUTCString(),
                finalPrice: obj.returnValues.finalPrice,
                tariffId: obj.returnValues.tariffId,
                chargedUnits: obj.returnValues.finalTariffValue,
                controller: obj.returnValues.controller,
                tokenAddress: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }
        ));

        return allLogs;
    }

    async filterBy(): Promise<any> {
        const filters = {};

        const choice = (await prompter.filterBy()).filter;

        for(let element of choice) {
            if (element === 'evseId') {
                let evse = (await prompter.getInput(element)).filter;
                const evseHex = ToolKit.asciiToHex(evse);
                const evsePadded = evseHex.padEnd(66, '0');
                filters[element] = evsePadded;
            }else {
                filters[element] = (await prompter.getInput(element)).filter.toLowerCase();
            }
        }

        const logDetails = await this.core.sc.charging.contract.getLogs('ChargeDetailRecord', filters);
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
