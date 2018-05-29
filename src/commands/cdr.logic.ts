import { log } from 'util';
import LogicBase from '../logicBase';
import { ToolKit } from '@motionwerk/sharecharge-lib';

export default class CdrLogic extends LogicBase {

    public getInfo = async (argv) => {
        if (!argv.json) {
            const cdrInfo = await this.getCDRInfo(argv);
            console.log(JSON.stringify(cdrInfo, null, 2));
        }
    };

    async getCDRInfo(argv): Promise<any> {

        // filtering
        const filter = {};
        if (argv.scId) {
            filter['scId'] = argv.scId.toLowerCase();
        }
        if (argv.evseId) {
            const evseHex = ToolKit.asciiToHex(argv.evseId);
            const evsePadded = evseHex.padEnd(66, '0');
            filter['evseId'] = evsePadded;
        }
        if (argv.controller) {
            filter['controller'] = argv.controller.toLowerCase();
        }
        if (argv.tokenAddress) {
            filter['tokenAddress'] = argv.tokenAddress.toLowerCase();
        }
        if (argv.start || argv.end) {
            const start = Math.round(new Date(argv.start).getTime() / 1000 || 0);
            const end = Math.round(new Date(argv.end).getTime() / 1000 || Date.now() / 1000);
            filter['timestamp'] = { start, end };
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
