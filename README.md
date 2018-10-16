# Share & Charge Command Line Interface

The S&C CLI provides tools for creating and managing wallets, provisioning charge points and managing charge sessions on the Share & Charge e-Mobility network.

---

## Install

The S&C CLI is available as an NPM package:

```
npm install -g @motionwerk/sharecharge-cli
```

Run and show possible commands:

```
sc-cli -h
```

The help flag can be used to invoke usage tips, for example:

```
sc-cli token -h
```

## Usage examples

There are several modules included:
- `config`:    Read and edit the Share & Charge configuration
- `cdr`:       Access and filter Charge Detail Records
- `charging`:  Control EV charging sessions
- `store`:     Add and query data stored on the Share & Charge EV Network
- `token`:     Deploy and manage a Mobility Service Provider token
- `wallet`:    Create and manage a Share & Charge wallet

### config

The Share & Charge software stack (including the CLI, the API and the Core Client) all read from a configuration file in `$HOME/.sharecharge`.

It is possible to edit this file directly via the CLI, should a [default editor](https://askubuntu.com/questions/432524/how-do-i-find-and-set-my-editor-environment-variable) already be set. 

```
sc-cli config edit
```

Additionally, it is possible to get the entire configuration, or individual values:
```
sc-cli config get
sc-cli config get ethProvider
```

Likewise, it is possible to set config values from the command line:
```
sc-cli config set ethProvider ws://localhost:8546
```

### wallet

With this subcommand it is possible to generate a wallet and get information about it. To generate a wallet:
```
$ sc-cli wallet generate
Wallet created. Update the seed in your configuration to use.
coinbase: 0x7fe79a250d9d24fa8fe13e27e30121dfe8623f2c
seed:     clog side swap city lawn disorder group pottery business armed swallow describe
```

Taking the seed, update the configuration accordingly:
```
sc-cli config set seed "clog side swap city lawn disorder group pottery business armed swallow describe"
```

Verify that the seed was correctly set by checking if the coinbase matches the previous output. The coinbase is the primary account of the wallet.

```
$ sc-cli wallet info
coinbase: 0x7fe79a250d9d24fa8fe13e27e30121dfe8623f2c
tx count: 0
```

It is also possible to check the quantity of Ether (infrastructure token of Ethereum based blockchains) which will be used to pay for transactions:

```
$ sc-cli wallet balance
balance: 1000000000000000000 Wei (1.00000000000000000 Ether)
```

### token

This modules provides functionality for managing Mobility Service Provider (MSP) tokens for drivers. As an MSP, a token contract can be deployed from which individual tokens of the kind specified by the contract may be minted for drivers to pay for charging sessions.

To deploy a new token contract, use the following command:
```
sc-cli token deploy
```

At the end, the address of the contract on the network should be displayed:
```
New contract created at address 0x176E2F60cFF83B8A1A7BEfa99E19fc077a123bCa
Save this address in your config under "tokenAddress" to use it
```

Save the address using the config module:
```
sc-cli config set tokenAddress 0x176E2F60cFF83B8A1A7BEfa99E19fc077a123bCa
```

To verify the address was correctly set, ensure the name, symbol and owner are correct:
```
$ sc-cli token info
Name:    Park & Charge Token
Symbol:  PCT
Address: 0x176E2F60cFF83B8A1A7BEfa99E19fc077a123bCa
Owner:   0x7fe79a250d9d24fa8fe13e27e30121dfe8623f2c
```

Following this, it is now possible to mint tokens for drivers:
```
$ sc-cli token mint
```

### store

The storage module allows adding location (charge point) and tariff data to the network via IPFS. 

Locations are stored in `$HOME/.sharecharge/locations.json`. in [OCPI format](https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description). 

After editing the `locations.json` file, the location(s) can be added to the network:
```
sc-cli store add-locations
```

The file can be updated, and similarly the network updated:
```
sc-cli store update-locations
```

The same is true for tariffs (also in [OCPI format](https://github.com/ocpi/ocpi/blob/master/mod_tariffs.md#3-object-description)):
```
sc-cli store add-tariffs
sc-cli store update-tariffs
```

### charging 

The CLI can also request charging session starts for drivers. In fact, all aspects of the charging session can be controlled via the CLI, including requesting session stops, confirming sessions and issuing charge detail records (CDRs).

To request a start:
```
sc-cli charging request-start
```

An interactive wizard will guide the driver through the request.

To request a stop:
```
sc-cli charging request-stop
```

In the event that errors occur during the charging session, the CLI can also be used to manage the driver's session on the network:

```
sc-cli charging confirm-start
sc-cli charging confirm-stop
sc-cli charging cdr
```

### cdr

The charge detail record module allows for querying CDRs issued by charge point operators on the network. To return all CDRs issued on the network:

```
sc-cli cdr info
```

To filter by specific CDR parameters:

```
sc-cli cdr filter
```
