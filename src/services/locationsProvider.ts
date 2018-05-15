import { injectable, inject } from "inversify";
import * as path from "path";
import * as fs from "fs";
import { IConfig, getConfigDir } from "@motionwerk/sharecharge-config";
import { Symbols } from "../symbols";

@injectable()
export default class LocationsProvider {

    private locations: any[];

    constructor(@inject(Symbols.ConfigProvider) private configProvider: IConfig) {
        this.locations = LocationsProvider.loadLocationsFromPath(this.configProvider.locationsPath);
    }

    private static loadLocationsFromPath(locationsPath) {

        const fullPath = path.join(getConfigDir(), locationsPath);

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