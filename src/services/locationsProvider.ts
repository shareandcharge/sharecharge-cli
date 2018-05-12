import { injectable, inject } from "inversify";
import * as path from "path";
import IConfig from "../interfaces/iConfig";
import { Symbols } from "../symbols";
import * as fs from "fs";
import { stat } from "fs";

@injectable()
export default class LocationsProvider {

    private locations: any;

    constructor(@inject(Symbols.ConfigProvider) private configProvider: IConfig) {
        this.locations = LocationsProvider.loadLocationsFromPath(this.configProvider.locationsPath);
    }

    private static loadLocationsFromPath(locationsPath) {

        const fullPath = path.join(__dirname, locationsPath);

        try {
            fs.statSync(fullPath);
            return require(fullPath);
        } catch (err) {
            console.log(err);
            return;
        }
    }

    getLocations() {
        return this.locations;
    }

    getEvses() {

        const evseIds: string[] = [];

        for (const location of this.locations) {
            for (const evse of location.evses) {
                evseIds.push(evse['evse_id']);
            }
        }

        return evseIds;
    }
}