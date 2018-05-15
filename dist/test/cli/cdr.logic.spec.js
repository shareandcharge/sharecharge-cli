"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdr_logic_1 = require("../../src/commands/cdr.logic");
const core_1 = require("../../src/core");
const symbols_1 = require("../../src/symbols");
const testShareChargeProvider_1 = require("../testShareChargeProvider");
describe('CdrLogic', () => {
    let cdrLogic = new cdr_logic_1.default;
    before(() => {
        core_1.default.rebind(symbols_1.Symbols.ShareChargeProvider, testShareChargeProvider_1.default);
    });
    beforeEach(() => {
        testShareChargeProvider_1.default.blockchain.evses = {};
    });
    // describe('#info()', () => {
    //     it('should display charge detail records', async () => {
    //         const test = [{
    //             transactionHash: '0x03fd14753dbc0755de3559e94f5f91258912531dba345f0b3ab81ed1c6bac60f',
    //             address: '0x7B499171AaB93EEc3aC9c2460986Dd7928973d77',
    //             returnValues: {
    //                 evseId: '0x5d9048c95ae85c8c1d914258779913cf1c524c87218c1c76b499a07860c7eddc',
    //                 controller: '0x2a48d3C794b5dF0BE9f230502A17f91c0CF9e9aF',
    //                 tokenAddress: '0xb4d953Bd29D09b7fA6De9299baB4d63A88E44D40'
    //             }
    //         }];
    //         TestShareChargeProvider.scMock.charging.contract = {
    //             getLogs: () => test
    //         }
    //         const info = await cdrLogic.getCDRInfo("");
    //         expect(info.txHash).to.equal(test[0].transactionHash);
    //         expect(info.address).to.equal(test[0].address);
    //         expect(info.evseId).to.equal(test[0].returnValues.evseId);
    //         expect(info.controller).to.equal(test[0].returnValues.controller);
    //         expect(info.tokenAddress).to.equal(test[0].returnValues.tokenAddress);
    //     });
    // });
});
//# sourceMappingURL=cdr.logic.spec.js.map