import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();

enum TariffIds {
    'energy' = 0,
    'flat' = 1,
    'time' = 3
}

export default class ChargeLogic extends LogicBase {

    public requestStart = async () => {
        
        const token =  this.core.sc.token.address;

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        const connectors = location.getConnectors(evseId);
        const connectorId = (await prompter.getConnector(connectors)).connector[0];
        const connector = connectors.filter(c => c.id === connectorId)[0];

        const tariffs = await this.core.sc.store.getAllTariffsByCPO(this.core.wallet.coinbase);
        
        if (connector.tariff_id) {
            
            const tariff = tariffs[connector.tariff_id];

            if (tariff) {
            
                const tariffType: string = (await prompter.getTariffType(tariff)).type[0];
                let tariffValue;
                let price;
        
                switch (tariffType) {
                    case 'energy':
                        tariffValue = (await prompter.getTariffValue(tariffType)).value;
                        const kwh = tariff.elements.filter(el => el.price_components[0].type === 'ENERGY');
                        const pricePerKwh = kwh[0].price_components[0].price; 
                        const stepSizeKwh = kwh[0].price_components[0].step_size;
                        price = Math.round(pricePerKwh * Math.ceil(tariffValue / stepSizeKwh) * 100);
                        break;
                    case 'time':
                        // convert input minutes to hours
                        tariffValue = (await prompter.getTariffValue(tariffType)).value * 60;
                        const time = tariff.elements.filter(el => el.price_components[0].type === 'TIME');
                        const pricePerHour = time[0].price_components[0].price;
                        const stepSizeHour = time[0].price_components[0].step_size;
                        price = Math.round(pricePerHour * Math.ceil(tariffValue / stepSizeHour) * 100);
                        break;
                    case 'flat':
                        const flat = tariff.elements.filter(el => el.price_components[0].type === 'TIME');
                        price = Math.round(flat[0].price_components[0].price * 100);
                        break;
                    default:
                        console.log('Tariff not found');
                        return;
                }
        
                console.log('Your balance:   ', await this.core.sc.token.getBalance(this.core.wallet.coinbase), 'tokens');
                console.log('Estimated price:', price, 'tokens');
        
                const confirmed = (await prompter.getConfirmation('Agree to the estimated price?')).confirmed;
                if (!confirmed) {
                    return;
                }
        
                try {
                    await this.core.sc.charging.useWallet(this.core.wallet).requestStart(scId, evseId, TariffIds[tariffType], tariffValue, token, price);
                    console.log("Successfully requested remote start on", chalk.green(evseId));
                } catch (err) {
                    console.log(err.message);
                }
            
            } else {
                console.log('Tariff Id', connector.tariff_id, 'does not exist');
            }
        
        } else {
            console.log('No tariffs found for connector');
            return;
        }

    };

    public confirmStart = async () => {

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];
        const sessionId = '0x01';

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).confirmStart(scId, evseId, sessionId);
            console.log("Successfully confirmed remote session start on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    };

    public requestStop = async () => {

        const scId = (await prompter.getScId()).scId;
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).requestStop(scId, evseId);
            console.log("Succesfully requested remote stop on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    };

    public confirmStop = async () => {

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).confirmStop(scId, evseId);
            console.log("Successfully confirmed remote session stop on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    };

    public getSession = async () => {

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        try {
            const session = await this.core.sc.charging.getSession(scId, evseId);
            console.log(JSON.stringify(session, null, 2));
        } catch (err) {
            console.log(err.message);
        }
    }

    public reset = async () => {
        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).reset(scId,evseId);
            console.log("Successfully reset session on scId:" , scId, "evseId:", evseId);
        } catch (err) {
            console.log(err.message);
        }
    };

    public chargeDetailRecord = async () => {

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];
        const tariffValue = (await prompter.getTariffValue('0')).value * 1000;
        const amount = (await prompter.getAnswer('Enter final charging cost in tokens')).answer;

        try {
            await this.core.sc.charging.useWallet(this.core.wallet).chargeDetailRecord(scId, evseId, tariffValue, amount);
            console.log("Successfully issued charge detail record for session on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    }

}
