import LogicBase from "../logicBase";
import chalk from "chalk";
import Inquirer from "../services/inquirer";
const prompter = new Inquirer();

enum TariffIds {
    'ENERGY' = 0,
    'FLAT' = 1,
    'TIME' = 3
}

export default class ChargeLogic extends LogicBase {

    public requestStart = async () => {
        
        const token =  this.core.sc.token.address;

        const scId = (await prompter.getScId()).scId
        const owner = await this.core.sc.store.getOwnerOfLocation(scId);
        const location = await this.core.sc.store.getLocationById(owner, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];

        const connectors = location.getConnectors(evseId);
        const connectorId = (await prompter.getConnector(connectors)).connector[0];

        const tariffId = location.getTariffId(evseId, connectorId);

        const tariffs = await this.core.sc.store.getAllTariffsByCPO(this.core.wallet.coinbase);
        
        if (tariffId) {
            
            const tariff = tariffs[tariffId];
            
            if (tariff) {
                
                const tariffChoices = tariff.getTypes();
                const tariffType: string = (await prompter.getTariffType(tariffChoices)).type[0].toUpperCase();
                let chargeUnits;
        
                switch (tariffType) {
                    // convert kwh to watt hour
                    case 'ENERGY':
                        chargeUnits = (await prompter.getTariffValue(tariffType)).value * 1000;
                        break;
                    // flat and time use duration - convert minutes to seconds
                    case 'FLAT':
                    case 'TIME':
                        chargeUnits = (await prompter.getTariffValue(tariffType)).value * 60;   
                        break;
                    default:
                        console.log('Tariff not found');
                        return;
                }

                const price = tariff.calculatePrice(tariffType, chargeUnits);
        
                console.log('Your balance:   ', await this.core.sc.token.getBalance(this.core.wallet.coinbase), 'tokens');
                console.log('Estimated price:', price, 'tokens');
        
                const confirmed = (await prompter.getConfirmation('Agree to the estimated price?')).confirmed;
                if (!confirmed) {
                    return;
                }
        
                try {
                    const request = this.core.sc.charging.useWallet(this.core.wallet).requestStart();
                    request.scId = scId;
                    request.evse = evseId;
                    request.connector = connectorId;
                    request.tariff = tariffType;
                    request.chargeUnits = chargeUnits;
                    request.tokenAddress = token;
                    request.estimatedPrice = price;
                    await request.send();
                    console.log("Successfully requested remote start on", chalk.green(evseId));
                } catch (err) {
                    console.log(err.message);
                }
            
            } else {
                console.log('Tariff Id', tariffId, 'does not exist');
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
            const request = this.core.sc.charging.useWallet(this.core.wallet).confirmStart();
            request.scId = scId;
            request.evse = evseId;
            request.sessionId = sessionId;
            await request.send();
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
            const request = this.core.sc.charging.useWallet(this.core.wallet).requestStop();
            request.scId = scId;
            request.evse = evseId;
            await request.send();
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
            const request = this.core.sc.charging.useWallet(this.core.wallet).confirmStop();
            request.scId = scId;
            request.evse = evseId;
            await request.send();
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

    public chargeDetailRecord = async () => {

        const scId = (await prompter.getScId()).scId
        const location = await this.core.sc.store.getLocationById(this.core.wallet.coinbase, scId);
        const evseIds = location.getEvseIds();
        const evseId = (await prompter.getEvseId(evseIds)).evseId[0];
        const chargedUnits = (await prompter.getTariffValue('0')).value * 1000;
        const price = (await prompter.getAnswer('Enter final charging cost in tokens')).answer;

        try {
            const request = this.core.sc.charging.useWallet(this.core.wallet).chargeDetailRecord();
            request.scId = scId;
            request.evse = evseId;
            request.chargedUnits = chargedUnits;
            request.finalPrice = price;
            await request.send();
            console.log("Successfully issued charge detail record for session on", chalk.green(evseId));
        } catch (err) {
            console.log(err.message);
        }
    }

}
