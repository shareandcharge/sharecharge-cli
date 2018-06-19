import { Wallet } from "@motionwerk/sharecharge-lib"
import LogicBase from '../logicBase';
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();

export default class WalletLogic extends LogicBase {

    public create = () => {
        console.log('creating wallet...');
    } 

    public info = () => {
        console.log('coinbase:', this.core.wallet.coinbase);
    }

    public balance = () => {
        console.log('getting balance...');
    }

    public fund = () => {
        console.log('requesting funds...');
    }

}
