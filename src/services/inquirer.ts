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
            message: 'Please enter the amount of tokens to fund: ',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter the amount of tokens to fund'
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
}