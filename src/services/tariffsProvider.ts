import { injectable, inject } from "inversify";
import * as path from "path";
import IConfig from "../interfaces/iConfig";
import { Symbols } from "../symbols";
import * as fs from "fs";
import { stat } from "fs";

@injectable()
export default class TariffsProvider {

    private tariffs: any;

    constructor(@inject(Symbols.ConfigProvider) private configProvider: IConfig) {
        this.tariffs = TariffsProvider.loadTariffsFromPath(this.configProvider.tariffsPath);
    }

    private static loadTariffsFromPath(tariffsPath) {

        const fullPath = path.join(__dirname, tariffsPath);

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