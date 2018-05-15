"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("../logicBase");
const sharecharge_lib_1 = require("@motionwerk/sharecharge-lib");
class CdrLogic extends logicBase_1.default {
    constructor() {
        super();
        this.getInfo = (argv) => __awaiter(this, void 0, void 0, function* () {
            if (!argv.json) {
                const cdrInfo = yield this.getCDRInfo(argv);
                console.log(JSON.stringify(cdrInfo, null, 2));
            }
        });
    }
    getCDRInfo(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            // filtering
            const filter = {};
            if (argv.scId) {
                console.log("Filtered by sc Id");
                filter['scId'] = argv.scId.toLowerCase();
            }
            if (argv.evseId) {
                console.log('Filtered by evse');
                const evseHex = sharecharge_lib_1.ToolKit.asciiToHex(argv.evseId);
                const evsePadded = evseHex.padEnd(66, '0');
                filter['evseId'] = evsePadded;
            }
            if (argv.controller) {
                console.log("Filtered by controller");
                filter['controller'] = argv.controller.toLowerCase();
            }
            if (argv.tokenAddress) {
                console.log("Filtered by token address");
                filter['tokenAddress'] = argv.tokenAddress.toLowerCase();
            }
            if (argv.start || argv.end) {
                const start = Math.round(new Date(argv.start).getTime() / 1000 || 0);
                const end = Math.round(new Date(argv.end).getTime() / 1000 || Date.now() / 1000);
                console.log("Filtered by date:", start, 'to', end);
                filter['timestamp'] = { start, end };
                console.log(filter);
            }
            const logDetails = yield this.core.sc.charging.contract.getLogs('ChargeDetailRecord', filter);
            let allLogs = logDetails.map(obj => ({
                timestamp: obj.timestamp,
                date: new Date(obj.timestamp * 1000).toUTCString(),
                evseId: sharecharge_lib_1.ToolKit.hexToString(obj.returnValues.evseId),
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
                finalPrice: obj.returnValues.finalPrice,
                tokenAddress: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }));
            return allLogs;
        });
    }
}
exports.default = CdrLogic;
//# sourceMappingURL=cdr.logic.js.map