"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const symbols_1 = require("./symbols");
const inversify_1 = require("inversify");
const configProvider_1 = require("./services/configProvider");
const shareChargeProvider_1 = require("./services/shareChargeProvider");
const walletProvider_1 = require("./services/walletProvider");
const locationsProvider_1 = require("./services/locationsProvider");
const tariffsProvider_1 = require("./services/tariffsProvider");
let Core = Core_1 = class Core {
    constructor(configProvider, shareChargeProvider, locationsProvider, tariffsProvider, walletProvider) {
        this.configProvider = configProvider;
        this.shareChargeProvider = shareChargeProvider;
        this.locationsProvider = locationsProvider;
        this.tariffsProvider = tariffsProvider;
        this.walletProvider = walletProvider;
    }
    get sc() {
        return this.shareChargeProvider.obtain(this.configProvider);
    }
    get locations() {
        return this.locationsProvider.getLocations();
    }
    get tariffs() {
        return this.tariffsProvider.getTariffs();
    }
    get wallet() {
        return this.walletProvider.obtain();
    }
    get config() {
        return this.configProvider;
    }
    static getInstance() {
        if (!Core_1.container) {
            const container = new inversify_1.Container();
            container.bind(symbols_1.Symbols.ConfigProvider).to(configProvider_1.default).inSingletonScope();
            container.bind(symbols_1.Symbols.ShareChargeProvider).to(shareChargeProvider_1.default).inSingletonScope();
            container.bind(symbols_1.Symbols.LocationsProvider).to(locationsProvider_1.default).inSingletonScope();
            container.bind(symbols_1.Symbols.TariffsProvider).to(tariffsProvider_1.default).inSingletonScope();
            container.bind(symbols_1.Symbols.WalletProvider).to(walletProvider_1.default).inSingletonScope();
            Core_1.container = container;
        }
        return Core_1.container.resolve(Core_1);
    }
    static rebind(symb, obj) {
        if (!Core_1.container) {
            Core_1.getInstance();
        }
        Core_1.container.rebind(symb).to(obj).inSingletonScope();
    }
};
Core = Core_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(symbols_1.Symbols.ConfigProvider)),
    __param(1, inversify_1.inject(symbols_1.Symbols.ShareChargeProvider)),
    __param(2, inversify_1.inject(symbols_1.Symbols.LocationsProvider)),
    __param(3, inversify_1.inject(symbols_1.Symbols.TariffsProvider)),
    __param(4, inversify_1.inject(symbols_1.Symbols.WalletProvider)),
    __metadata("design:paramtypes", [configProvider_1.default,
        shareChargeProvider_1.default,
        locationsProvider_1.default,
        tariffsProvider_1.default,
        walletProvider_1.default])
], Core);
exports.default = Core;
var Core_1;
//# sourceMappingURL=core.js.map