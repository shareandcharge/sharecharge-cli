import { injectable, inject } from "inversify";
import * as fs from "fs";
import * as path from "path";
import { getConfigDir, IConfig, prepareConfigLocation } from "@motionwerk/sharecharge-common";

prepareConfigLocation(path.join(__dirname, "/../../config-templates/"), [
    "locations.json",
    "locations-bs.json",
    "tariffs.json"
]);

@injectable()
export default class ConfigProvider implements IConfig {

    protected config: IConfig;

    static load(file): IConfig {
        return <IConfig>JSON.parse(fs.readFileSync(file, "UTF8"))
    }

    static save(config: IConfig) {
        const configPath = getConfigDir() + 'config.json';
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }

    constructor() {
        this.config = ConfigProvider.load(getConfigDir() + "config.json");
    }

    get(): IConfig {
        return this.config;
    }

    get locationsPath() {
        return this.config.locationsPath;
    }

    set locationsPath(value: string) {
        this.config.locationsPath = value;
        ConfigProvider.save(this.config);
    }

    get bridgePath() {
        return this.config.bridgePath;
    }

    set bridgePath(value: string) {
        this.config.bridgePath = value;
        ConfigProvider.save(this.config);
    }

    get tariffsPath() {
        return this.config.tariffsPath;
    }

    set tariffsPath(value: string) {
        this.config.tariffsPath = value;
        ConfigProvider.save(this.config);
    }

    get gasPrice() {
        return this.config.gasPrice || 2;
    }

    set gasPrice(value: number) {
        this.config.gasPrice = value;
        ConfigProvider.save(this.config);
    }

    get seed() {
        return this.config.seed;
    }

    set seed(value: string) {
        this.config.seed = value;
        ConfigProvider.save(this.config);
    }

    get stage() {
        return this.config.stage || "local";
    }

    set stage(value: string) {
        this.config.stage = value;
        ConfigProvider.save(this.config);
    }

    get ethProvider() {
        return this.config.ethProvider;
    }

    set ethProvider(value: string | undefined) {
        this.config.ethProvider = value;
        ConfigProvider.save(this.config);
    }

    get ipfsProvider() {
        return this.config.ipfsProvider;
    }

    get tokenAddress() {
        return this.config.tokenAddress;
    }

    set tokenAddress(value: string | undefined) {
        this.config.tokenAddress = value;
        ConfigProvider.save(this.config);
    }

    get jwtPrivateKey() {
        return this.config.jwtPrivateKey;
    }

    set jwtPrivateKey(value: string | undefined) {
        this.config.jwtPrivateKey = value;
        ConfigProvider.save(this.config);
    }

    getNestedKey(keys: string[]): any {
        return this.config[keys[0]][keys[1]]
    }

    setNestedKey(keys: string[], value): void {
        this.config[keys[0]][keys[1]] = value;
        ConfigProvider.save(this.config);
    }

    public static loadConfigFromFile(configPath: string): IConfig {
        return <IConfig>ConfigProvider.createConfig(ConfigProvider.load(configPath))
    };

    private static createConfig(argv: any): IConfig {
        return <IConfig>{
            locationsPath: argv.locationsPath,
            tariffsPath: argv.tariffsPath,
            bridgePath: argv.bridgePath,
            stage: argv.stage,
            seed: argv.seed,
            gasPrice: argv.gasPrice,
            ethProvider: argv.ethProvider,
            ipfsProvider: argv.ipfsProvider,
            tokenAddress: argv.tokenAddress
        };
    };
}