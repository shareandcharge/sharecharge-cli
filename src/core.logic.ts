import LogicBase from "./logicBase"
import Core from "./core";

export default class CoreLogic extends LogicBase {

    public start = async (argv) => {

        if (!this.core.config.seed) {
            console.log("No seed configured!");
        }

        Core.getInstance();

        return true;
    };
}