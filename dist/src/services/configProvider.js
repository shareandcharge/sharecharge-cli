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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const path = require("path");
const parser_1 = require("../utils/parser");
let ConfigProvider = ConfigProvider_1 = class ConfigProvider {
    constructor() {
        this.config = ConfigProvider_1.loadConfigFromFile(path.join(__dirname, "../../config/config.yaml"));
    }
    get locationsPath() {
        return this.config.locationsPath;
    }
    get tariffsPath() {
        return this.config.tariffsPath;
    }
    get gasPrice() {
        return this.config.gasPrice || 2;
    }
    get seed() {
        return this.config.seed;
    }
    get stage() {
        return this.config.stage || "local";
    }
    get provider() {
        return this.config.provider;
    }
    get tokenAddress() {
        return this.config.tokenAddress;
    }
    static loadConfigFromFile(configPath) {
        const parser = new parser_1.default();
        //console.log("reading config from", configPath);
        const configString = parser.read(configPath);
        return ConfigProvider_1.createConfig(parser.translate(configString));
    }
    ;
    static createConfig(argv) {
        return {
            locationsPath: argv.locationsPath,
            tariffsPath: argv.tariffsPath,
            stage: argv.stage,
            seed: argv.seed,
            gasPrice: argv.gasPrice,
            provider: argv.provider,
            tokenAddress: argv.tokenAddress
        };
    }
    ;
};
ConfigProvider = ConfigProvider_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ConfigProvider);
exports.default = ConfigProvider;
var ConfigProvider_1;
//# sourceMappingURL=configProvider.js.map