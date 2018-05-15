"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const toml = require("toml");
const fs = require("fs");
const path = require("path");
class Parser {
    constructor(test) {
        this.extension = '';
        this.path = test ? '../../../test/' : '../../../';
    }
    read(filepath) {
        this.extension = path.extname(filepath);
        return fs.readFileSync(filepath, 'utf8');
    }
    translate(configString) {
        switch (this.extension) {
            case '.yaml':
                return Parser.yaml(configString);
            case '.toml':
                return Parser.toml(configString);
        }
    }
    static yaml(config) {
        return yaml.safeLoad(config);
    }
    static toml(config) {
        return toml.parse(config);
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map