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

    constructor() {
        this.config = ConfigProvider.load(getConfigDir() + "config.json");
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

    get ethProvider() {
        return this.config.ethProvider;
    }

    get tokenAddress() {
        return this.config.tokenAddress;
    }

    get jwtPrivateKey() {
        return this.config.jwtPrivateKey;
    }

    public static loadConfigFromFile(configPath: string): IConfig {
        return <IConfig>ConfigProvider.createConfig(ConfigProvider.load(configPath))
    };

    private static createConfig(argv: any): IConfig {
        return <IConfig>{
            locationsPath: argv.locationsPath,
            tariffsPath: argv.tariffsPath,
            stage: argv.stage,
            seed: argv.seed,
            gasPrice: argv.gasPrice,
            ethProvider: argv.ethProvider,
            tokenAddress: argv.tokenAddress
        };
    };
}