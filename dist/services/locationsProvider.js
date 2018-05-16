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
const inversify_1 = require("inversify");
const path = require("path");
const fs = require("fs");
const sharecharge_config_1 = require("@motionwerk/sharecharge-config");
const symbols_1 = require("../symbols");
let LocationsProvider = LocationsProvider_1 = class LocationsProvider {
    constructor(configProvider) {
        this.configProvider = configProvider;
        this.locations = LocationsProvider_1.loadLocationsFromPath(this.configProvider.locationsPath);
    }
    static loadLocationsFromPath(locationsPath) {
        const fullPath = path.join(sharecharge_config_1.getConfigDir(), locationsPath);
        try {
            fs.statSync(fullPath);
            return require(fullPath);
        }
        catch (err) {
            console.log(err);
            return;
        }
    }
    getLocations() {
        return this.locations;
    }
    getEvses() {
        const evseIds = [];
        for (const location of this.locations) {
            for (const evse of location.evses) {
                evseIds.push(evse['evse_id']);
            }
        }
        return evseIds;
    }
};
LocationsProvider = LocationsProvider_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(symbols_1.Symbols.ConfigProvider)),
    __metadata("design:paramtypes", [typeof (_a = typeof sharecharge_config_1.IConfig !== "undefined" && sharecharge_config_1.IConfig) === "function" && _a || Object])
], LocationsProvider);
exports.default = LocationsProvider;
var LocationsProvider_1, _a;
//# sourceMappingURL=locationsProvider.js.map