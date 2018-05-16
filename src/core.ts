import { ShareCharge, Wallet } from "@motionwerk/sharecharge-lib";
import { IConfig } from "@motionwerk/sharecharge-common";
import "reflect-metadata";
import { Symbols } from "./symbols"
import { Container, injectable, inject } from "inversify";
import ConfigProvider from "./services/configProvider";
import ShareChargeProvider from "./services/shareChargeProvider";
import WalletProvider from "./services/walletProvider";
import LocationsProvider from "./services/locationsProvider";
import TariffsProvider from "./services/tariffsProvider";

@injectable()
export default class Core {

    private static container: Container;

    constructor(@inject(Symbols.ConfigProvider) private configProvider: ConfigProvider,
                @inject(Symbols.ShareChargeProvider) private shareChargeProvider: ShareChargeProvider,
                @inject(Symbols.LocationsProvider) private locationsProvider: LocationsProvider,
                @inject(Symbols.TariffsProvider) private tariffsProvider: TariffsProvider,
                @inject(Symbols.WalletProvider) private walletProvider: WalletProvider) {
    }

    get sc(): ShareCharge {
        return this.shareChargeProvider.obtain(this.configProvider);
    }

    get locations(): any[] {
        return this.locationsProvider.getLocations();
    }

    get tariffs(): any {
        return this.tariffsProvider.getTariffs();
    }

    get wallet(): Wallet {
        return this.walletProvider.obtain();
    }

    get config(): IConfig {
        return this.configProvider;
    }

    static getInstance(): Core {

        if (!Core.container) {
            const container = new Container();
            container.bind<ConfigProvider>(Symbols.ConfigProvider).to(ConfigProvider).inSingletonScope();
            container.bind<ShareChargeProvider>(Symbols.ShareChargeProvider).to(ShareChargeProvider).inSingletonScope();
            container.bind<LocationsProvider>(Symbols.LocationsProvider).to(LocationsProvider).inSingletonScope();
            container.bind<TariffsProvider>(Symbols.TariffsProvider).to(TariffsProvider).inSingletonScope();
            container.bind<WalletProvider>(Symbols.WalletProvider).to(WalletProvider).inSingletonScope();
            Core.container = container;
        }

        return Core.container.resolve(Core);
    }

    static rebind(symb, obj) {

        if (!Core.container) {
            Core.getInstance();
        }

        Core.container.rebind(symb).to(obj).inSingletonScope();
    }
}