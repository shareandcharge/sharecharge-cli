"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charge_logic_1 = require("../../src/commands/charge.logic");
const core_1 = require("../../src/core");
const symbols_1 = require("../../src/symbols");
const testConfigProvider_1 = require("../testConfigProvider");
const testShareChargeProvider_1 = require("../testShareChargeProvider");
describe('ChargingLogic', () => {
    let chargingLogic;
    before(() => {
        chargingLogic = new charge_logic_1.default();
        core_1.default.rebind(symbols_1.Symbols.ShareChargeProvider, testShareChargeProvider_1.default);
        core_1.default.rebind(symbols_1.Symbols.ConfigProvider, testConfigProvider_1.default);
    });
    beforeEach(() => {
    });
});
//# sourceMappingURL=charging.logic.spec.js.map