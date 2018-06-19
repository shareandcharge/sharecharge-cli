import { Wallet } from "@motionwerk/sharecharge-lib"
import LogicBase from '../logicBase';
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();
const Web3 = require('web3');

export default class WalletLogic extends LogicBase {

    public create = () => {
        const newWallet = Wallet.generate();
        console.log('Wallet created. Update the seed in your configuration to use.');
        console.log(`coinbase: ${newWallet.wallet.coinbase}`);
        console.log(`seed:     ${chalk.blue(newWallet.seed)}`);
    } 

    public info = () => {
        console.log('coinbase:', this.core.wallet.coinbase);
    }

    public balance = async () => {
        const web3 = new Web3(this.core.config.ethProvider);
        const balance = await web3.eth.getBalance(this.core.wallet.coinbase);
        console.log('balance:', balance);
    }

    public fund = async () => {
        const web3 = new Web3(this.core.config.ethProvider);
        const coinbase = await web3.eth.getCoinbase();
        await web3.eth.sendTransaction({ from: coinbase, to: this.core.wallet.coinbase, value: web3.utils.toWei('1') });
        console.log('funded wallet 1 ether');
    }

}
