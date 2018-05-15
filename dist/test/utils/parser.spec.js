"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const parser_1 = require("../../src/utils/parser");
describe("Parser", function () {
    let parser;
    let path = __dirname;
    beforeEach(function () {
        parser = new parser_1.default(true);
    });
    describe("#read()", () => {
        it("should read yaml file and return as string", function () {
            const configStr = parser.read(__dirname + "/test-config.yaml");
            chai_1.expect(configStr.substr(0, 3)).to.equal("---");
        });
        it("should read the yaml config string and translate to js object", function () {
            const configString = parser.read(__dirname + "/test-config.yaml");
            const config = parser.translate(configString);
            chai_1.expect(config.stage).to.equal("local");
        });
        it("should read the toml config string and translate to js object", function () {
            const configString = parser.read(__dirname + "/test-config.toml");
            const config = parser.translate(configString);
            chai_1.expect(config.stage).to.equal("local");
        });
    });
});
//# sourceMappingURL=parser.spec.js.map