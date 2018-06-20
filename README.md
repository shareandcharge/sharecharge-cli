# Share & Charge Command Line Interface

The S&C CLI provides tools for creating and managing wallets, provisioning charge points and managing charge sessions on the Share & Charge e-Mobility network.

---

## Install

The S&C CLI is available as an NPM package:

```
npm install -g @motionwerk/sharecharge-cli
```

Run:

```
scli
```

Each command has a help flag for further information, for example:

```
scli token --help
```

---

## Documentation

```
Usage: sc <command> [options]

Commands:
  scli cdr       Access and filter Charge Detail Records
  scli charging  Control EV charging sessions
  scli store     Add and query data stored on the Share & Charge EV Network
  scli token     Deploy and manage a Mobility Service Provider token
  scli wallet    Create and manage a Share & Charge wallet

Options:
  --json         generate json output
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```