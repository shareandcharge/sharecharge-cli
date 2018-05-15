"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("./logicBase");
const core_1 = require("./core");
class CoreLogic extends logicBase_1.default {
    constructor() {
        super(...arguments);
        this.start = async (argv) => {
            if (!this.core.config.seed) {
                console.log("No seed configured!");
            }
            core_1.default.getInstance();
            return true;
        };
    }
}
exports.default = CoreLogic;
//# sourceMappingURL=core.logic.js.map