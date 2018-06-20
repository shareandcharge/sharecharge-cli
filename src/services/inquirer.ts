import { injectable } from "inversify";
import * as inquirer from "inquirer";

const invalidMsg = 'Invalid input';

@injectable()
export default class Inquirer {

    constructor(){
    }
    
    public getDriver(){
        const questions = [{
            name: 'driver',
            type: 'input',
            message: 'Enter the address of the driver',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getAmount(message: string) {
        const questions = [{
            name: 'amount',
            type: 'input',
            message,
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getName(){
        const questions = [{
            name: 'name',
            type: 'input',
            message: 'Enter the name of your token (e.g. My MSP Token)',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getSymbol(){
        const questions = [{
            name: 'symbol',
            type: 'input',
            message: 'Enter a symbol for your token (e.g. MSP)',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }
    
    public getCharging(){
        const questions = [{
            name: 'charging',
            type: 'input',
            message: 'Enter the charging contract to grant access to your MSP token',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getOwner(){
        const questions = [{
            name: 'scId',
            type: 'input',
            message: 'Enter a Share & Charge Location ID',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getScId() {
        const questions = [{
            name: 'scId',
            type: 'input',
            message: 'Enter a Share & Charge Location ID',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getEvseId() {
        const questions = [{
            name: 'evseId',
            type: 'input',
            message: 'Enter an EVSE ID',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public filterBy() {
        const questions = [{
            name: 'filter',
            type: 'checkbox',
            message: 'Filter Charge Detail Records by:',
            choices:['scId', 'evseId', 'controller', 'tokenAddress', 'start', 'end'],
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getInput(item) {
        const questions = [{
            name: 'filter',
            type: 'input',
            message: `To filter CDRs please provide ${item}:`,
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return `Invalid ${item}:`;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getTariffType() {
        const questions = [{
            name: 'type',
            type: 'input',
            message: 'Enter tariff type (options: kwh, time, flat)',
            validate: (val) => {
                if (['kwh', 'time', 'flat'].includes(val)) {
                    return true;
                } else {
                    return invalidMsg;
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getTariffValue(tariffId) {
        const tariffs = ['energy in kWh',,,'length in minutes']
        const questions = [{
            name: 'value',
            type: 'input',
            message: `Enter charging session ${tariffs[tariffId]}`,
            validate: (val) => val.length ? true : invalidMsg
        }];
        return inquirer.prompt(questions);
    }
}
