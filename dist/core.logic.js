"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logicBase_1 = require("./logicBase");
const core_1 = require("./core");
class CoreLogic extends logicBase_1.default {
    constructor() {
        super(...arguments);
        this.start = (argv) => __awaiter(this, void 0, void 0, function* () {
            if (!this.core.config.seed) {
                console.log("No seed configured!");
            }
            core_1.default.getInstance();
            return true;
        });
    }
}
exports.default = CoreLogic;
//# sourceMappingURL=core.logic.js.map