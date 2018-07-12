import LogicBase from "../logicBase";
import { Arguments } from "yargs";

export default class ConfigLogic extends LogicBase {

    public get = (args: Arguments): void => {
        if (!args.key) {
            console.log(JSON.stringify(this.core.config, null, 2));
        } else if (args.key.split('.').length === 2) {
            console.log(JSON.stringify(this.core.config.getNestedKey(args.key.split('.'))));
        } else {
            console.log(JSON.stringify(this.core.config[args.key], null, 2));
        }
    }

    public set = (args: Arguments): void => {
        const keys = args.key.split('.')
        if (keys.length === 2) {
            this.core.config.setNestedKey(keys, args.value);
        } else {
            this.core.config[args.key] = args.value;
        }
    }

}