import { injectable } from "inversify";
import * as inquirer from "inquirer";
const invalidMsg = 'Invalid input';

@injectable()
export default class Inquirer {

    constructor(){
    }
    
    //

    public getAnswer(message: string) {
        const questions = [{
            name: 'answer',
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

    public getEvseId(choices: any[]) {
        const questions = [{
            name: 'evseId',
            type: 'checkbox',
            message: 'Enter an EVSE ID',
            choices,
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
            type: 'checkbox',
            message: 'Enter tariff type',
            choices: ['kwh', 'time', 'flat'],
            validate: (val) => val.length ? true : invalidMsg
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
