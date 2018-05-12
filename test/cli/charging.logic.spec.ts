import * as mocha from 'mocha';
import { expect } from 'chai';

import ChargingLogic from "../../src/commands/charging.logic";
import Core from "../../src/core";

import { Symbols } from "../../src/symbols";

import TestConfigProvider from "../testConfigProvider";
import TestShareChargeProvider from "../testShareChargeProvider";

import { ToolKit } from "@motionwerk/sharecharge-lib";

describe('ChargingLogic', () => {

    let chargingLogic: ChargingLogic;

    before(() => {
        chargingLogic = new ChargingLogic();
        Core.rebind(Symbols.ShareChargeProvider, TestShareChargeProvider);
        Core.rebind(Symbols.ConfigProvider, TestConfigProvider);
    });

    beforeEach(() => {
    });

});
