import { injectable, inject } from "inversify";
import * as path from "path";
import * as fs from "fs";
import { IConfig, getConfigDir } from "@motionwerk/sharecharge-common";
import { Symbols } from "../symbols";

@injectable()
export default class TariffsProvider {

    private tariffs: any;

    constructor(@inject(Symbols.ConfigProvider) private configProvider: IConfig) {
        this.tariffs = TariffsProvider.loadTariffsFromPath(this.configProvider.tariffsPath);
    }

    private static loadTariffsFromPath(tariffsPath) {

        const fullPath = path.join(getConfigDir(), tariffsPath);

        try {
            fs.statSync(fullPath);
            return require(fullPath);
        } catch (err) {
            console.log(err);
            return;
        }
    }

    getTariffs() {
        return this.tariffs;
    }

}