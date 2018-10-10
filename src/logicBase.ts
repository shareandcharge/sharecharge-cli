import Core from "./core";

export default class LogicBase {

    get core() {
        return Core.getInstance();
    }

    public close = () => process.exit();
}