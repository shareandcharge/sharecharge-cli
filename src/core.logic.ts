import LogicBase from "./logicBase"
import Core from "./core";

export default class CoreLogic extends LogicBase {

    public start = async (argv) => {

        Core.getInstance();

        return true;
    };
}