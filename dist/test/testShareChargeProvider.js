"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const shareChargeProvider_1 = require("../src/services/shareChargeProvider");
let TestShareChargeProvider = TestShareChargeProvider_1 = class TestShareChargeProvider extends shareChargeProvider_1.default {
    obtain() {
        return TestShareChargeProvider_1.scMock;
    }
};
TestShareChargeProvider.blockchain = {
    evses: {},
    stations: {}
};
TestShareChargeProvider.owner = "0x123456789";
TestShareChargeProvider.evseBatchModifiers = {
    create: (...evses) => {
        for (let evse of evses) {
            TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
        }
    }
};
TestShareChargeProvider.evseModifiers = {
    create: (evse) => {
        TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
    },
    update: (evse) => {
        TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
    },
    batch: () => {
        return TestShareChargeProvider_1.evseBatchModifiers;
    }
};
TestShareChargeProvider.stationBatchModifiers = {
    create: (...stations) => {
        for (let station of stations) {
            TestShareChargeProvider_1.blockchain.stations[station.id] = station;
        }
    }
};
TestShareChargeProvider.stationModifiers = {
    create: (station) => {
        TestShareChargeProvider_1.blockchain.stations[station.id] = station;
    },
    update: (station) => {
        TestShareChargeProvider_1.blockchain.stations[station.id] = station;
    },
    batch: () => {
        return TestShareChargeProvider_1.stationBatchModifiers;
    }
};
TestShareChargeProvider.chargingModifiers = {
    requestStart: (evse, seconds) => {
        TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
    },
    requestStop: (evse) => {
        TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
    },
    confirmStop: (evse) => {
        TestShareChargeProvider_1.blockchain.evses[evse.id] = evse;
    }
};
TestShareChargeProvider.scMock = {
    evses: {
        useWallet: (wallet, keyIndex = 0) => {
            return TestShareChargeProvider_1.evseModifiers;
        },
        getById: (id) => {
            return TestShareChargeProvider_1.blockchain.evses[id] || {
                id: id,
                owner: TestShareChargeProvider_1.owner
            };
        },
        getByUid: (uid) => {
            let result = {};
            for (let key of Object.keys(TestShareChargeProvider_1.blockchain.evses)) {
                const e = TestShareChargeProvider_1.blockchain.evses[key];
                if (e.uid === uid) {
                    result = e;
                    break;
                }
            }
            return result;
        },
        getSession: (uid) => {
            return {
                controller: "0x123456"
            };
        }
    },
    stations: {
        useWallet: (wallet, keyIndex = 0) => {
            return TestShareChargeProvider_1.stationModifiers;
        },
        getById: (id) => {
            return TestShareChargeProvider_1.blockchain.stations[id] || {
                id: id,
                owner: "0x00",
                openingHours: "0x00"
            };
        }
    },
    charging: {
        contract: {},
        useWallet: (wallet) => {
            return TestShareChargeProvider_1.chargingModifiers;
        }
    },
    on: () => {
    },
    startListening: () => {
    }
};
TestShareChargeProvider = TestShareChargeProvider_1 = __decorate([
    inversify_1.injectable()
], TestShareChargeProvider);
exports.default = TestShareChargeProvider;
var TestShareChargeProvider_1;
//# sourceMappingURL=testShareChargeProvider.js.map