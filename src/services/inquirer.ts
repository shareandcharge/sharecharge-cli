import { injectable } from "inversify";
import * as inquirer from "inquirer";
import Connector from "@motionwerk/sharecharge-common/dist/models/ocpi/models/connector";
import { Tariff } from "@motionwerk/sharecharge-common";
const invalidMsg = 'Invalid input';

@injectable()
export default class Inquirer {

    constructor(){
    }

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

    public getConfirmation(message: string) {
        const questions = [{
            name: 'confirmed',
            type: 'confirm',
            message
        }];
        return inquirer.prompt(questions);
    }

    public getFromCheckbox(message, choices) {
        const questions = [
            {
                name: 'checked',
                type: 'checkbox',
                message,
                choices,
                validate: (val) => val.length ? true : invalidMsg
            }
        ];
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
            message: 'Select a Share & Charge Location ID',
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
            message: 'Select an EVSE ID',
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

    public getConnector(connectors: Connector[]) {
        const questions = [
            {
                name: 'connector',
                type: 'checkbox',
                message: 'Select a connector',
                choices: connectors.map(conn => conn.id),
                transformer: (val) => {
                    console.log('val:', val);
                    const standard = connectors.filter(c => c.id === val)[0].standard;
                    val += ': ' + standard;
                    return val;
                },
                validate: (val) => {
                    if (val.length) {
                        return true;
                    } else {
                        return invalidMsg;
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }

    public filterBy() {
        const questions = [{
            name: 'filter',
            type: 'checkbox',
            message: 'Filter Charge Detail Records by:',
            choices:['scId', 'evseId', 'sessionId', 'controller', 'tokenAddress', 'start', 'end'],
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

    public getTariffType(tariff: Tariff) {
        const questions = [{
            name: 'type',
            type: 'checkbox',
            message: 'Enter tariff type',
            choices: tariff.elements.map(el => el.price_components[0].type.toLowerCase()),
            validate: (val) => val.length ? true : invalidMsg
        }];
        return inquirer.prompt(questions);
    }

    public getTariffValue(tariffId) {
        const questions = [{
            name: 'value',
            type: 'input',
            message: `Enter charging session ${tariffId === 'energy' ? 'consumption (kWh)' : 'duration (minutes)'}`,
            validate: (val) => val.length ? true : invalidMsg
        }];
        return inquirer.prompt(questions);
    }
}
