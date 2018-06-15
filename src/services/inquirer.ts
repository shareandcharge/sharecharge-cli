import { injectable } from "inversify";
import * as inquirer from "inquirer";

@injectable()
export default class Inquirer {

    constructor(){
    }
    
    public question (){
        const questions = [{
            name: 'driver',
            type: 'input',
            message: 'Please ender driver address: ',
            validate: (val) => {
                if (val.length){
                    return true;
                } else {
                    return 'Please enter your username'
                }
            }
        }];
        return inquirer.prompt(questions);
    }
}