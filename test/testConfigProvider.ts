import { injectable, inject } from "inversify";
import ConfigProvider from "../src/services/configProvider";
import * as path from "path";

@injectable()
export default class TestConfigProvider extends ConfigProvider {

    constructor() {
        super();

        super.config = ConfigProvider.loadConfigFromFile(path.join(__dirname, "../../test/test-config.yaml"))
    }
}