import { injectable, inject } from "inversify";
import * as path from "path";
import IConfig from "../interfaces/iConfig";
import Parser from "../utils/parser";

@injectable()
export default class ConfigProvider implements IConfig {

    protected config: IConfig;

    constructor() {
        this.config = ConfigProvider.loadConfigFromFile("../../config/config.yaml")
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

    public static loadConfigFromFile(filename: string): IConfig {
        const configPath = filename.startsWith("/") ? filename : path.join(__dirname, filename);
        const parser = new Parser();
        //console.log("reading config from", configPath);
        const configString = parser.read(configPath);
        return <IConfig>ConfigProvider.createConfig(parser.translate(configString))
    };

    private static createConfig(argv: any): IConfig {
        return <IConfig>{
            locationsPath: argv.locationsPath,
            tariffsPath: argv.tariffsPath,
            stage: argv.stage,
            seed: argv.seed,
            gasPrice: argv.gasPrice,
            provider: argv.provider,
            tokenAddress: argv.tokenAddress
        };
    };
}