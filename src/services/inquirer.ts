import { injectable } from "inversify";
import * as inquirer from "inquirer";

@injectable()
export default class Inquirer {

    constructor(){
    }
    
    public getDriver(){
        const questions = [{
            name: 'driver',
            type: 'input',
            message: 'Please enter the address of the driver : ',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please ebter 0the address of the driver '
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getAmount(){
        const questions = [{
            name: 'amount',
            type: 'input',
            message: 'Please enter the amount',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter the amount'
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getName(){
        const questions = [{
            name: 'name',
            type: 'input',
            message: 'Please enter the public name of your token (e.g. My MSP Token)',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter the public name of your token (e.g. My MSP Token)'
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getSymbol(){
        const questions = [{
            name: 'symbol',
            type: 'input',
            message: 'Please enter the short identifier of your token (e.g. MSP)',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter the short identifier of your token (e.g. MSP)'
                }
            }
        }];
        return inquirer.prompt(questions);
    }
    
    public getCharging(){
        const questions = [{
            name: 'charging',
            type: 'input',
            message: 'The charging contract to grant access to your MSP token',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'The charging contract to grant access to your MSP token'
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getOwner(){
        const questions = [{
            name: 'scId',
            type: 'input',
            message: 'Please enter "scId" to get owner of location',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter "scId" to get owner of location'
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getScId() {
        const questions = [{
            name: 'scId',
            type: 'input',
            message: 'Please enter "scId"',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter "scId"'
                }
            }
        }];
        return inquirer.prompt(questions);
    }

    public getEvseId() {
        const questions = [{
            name: 'evseId',
            type: 'input',
            message: 'Please enter "evseId"',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter "evseId"'
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
                    return 'Filter Charge Detail Records by'
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
                    return `To filter CDRs please provide ${item}:`;
                }
            }
        }];
        return inquirer.prompt(questions);
    }
}