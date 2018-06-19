"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inquirer = require("inquirer");
let Inquirer = class Inquirer {
    constructor() {
    }
    getDriver() {
        const questions = [{
                name: 'driver',
                type: 'input',
                message: 'Please enter the address of the driver : ',
                validate: (val) => {
                    if (val.length) {
                        return true;
                    }
                    else {
                        return 'Please ebter 0the address of the driver ';
                    }
                }
            }];
        return inquirer.prompt(questions);
    }
    getAmount() {
        const questions = [{
                name: 'amount',
                type: 'input',
                message: 'Please enter the amount of tokens to fund: ',
                validate: (val) => {
                    if (val.length) {
                        return true;
                    }
                    else {
                        return 'Please enter the amount of tokens to fund';
                    }
                }
            }];
        return inquirer.prompt(questions);
    }
    getName() {
        const questions = [{
                name: 'name',
                type: 'input',
                message: 'Please enter the public name of your token (e.g. My MSP Token)',
                validate: (val) => {
                    if (val.length) {
                        return true;
                    }
                    else {
                        return 'Please enter the public name of your token (e.g. My MSP Token)';
                    }
                }
            }];
        return inquirer.prompt(questions);
    }
    getSymbol() {
        const questions = [{
                name: 'symbol',
                type: 'input',
                message: 'Please enter the short identifier of your token (e.g. MSP)',
                validate: (val) => {
                    if (val.length) {
                        return true;
                    }
                    else {
                        return 'Please enter the short identifier of your token (e.g. MSP)';
                    }
                }
            }];
        return inquirer.prompt(questions);
    }
    getCharging() {
        const questions = [{
                name: 'charging',
                type: 'input',
                message: 'The charging contract to grant access to your MSP token',
                validate: (val) => {
                    if (val.length) {
                        return true;
                    }
                    else {
                        return 'The charging contract to grant access to your MSP token';
                    }
                }
            }];
        return inquirer.prompt(questions);
    }
};
Inquirer = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Inquirer);
exports.default = Inquirer;
//# sourceMappingURL=inquirer.js.map