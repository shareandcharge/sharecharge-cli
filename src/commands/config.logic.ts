import LogicBase from "../logicBase";
import { Arguments } from "yargs";
import { spawn } from 'child_process';
import { getConfigDir } from '@motionwerk/sharecharge-common';
import { join as joinPath } from 'path';

export default class ConfigLogic extends LogicBase {

    public get = (args: Arguments): void => {
        try {
            if (!args.key) {
                console.log(JSON.stringify(this.core.config.get(), null, 2));
            } else if (args.key.split('.').length === 2) {
                console.log(JSON.stringify(this.core.config.getNestedKey(args.key.split('.'))));
            } else {
                console.log(JSON.stringify(this.core.config[args.key], null, 2));
            }
        } catch (err) {
            console.log(err.message);
        }
        this.close();
    }

    public set = (args: Arguments): void => {
        try {
            const configPath = joinPath(getConfigDir(), 'config.json');
            const keys = args.key.split('.')
            if (keys.length === 2) {
                this.core.config.setNestedKey(keys, args.value);
            } else {
                this.core.config[args.key] = args.value;
            }
            console.log('Saved changes to', configPath);
        } catch (err) {
            console.log(err.message);
        }
        this.close();
    }

    public edit = () => {
        const configPath = joinPath(getConfigDir(), 'config.json');
        if (process.env.EDITOR) {
            spawn(process.env.EDITOR, [configPath], {
                stdio: 'inherit',
                detached: true
            }).on('data', (data) => {
                process.stdout.pipe(data);
            }).on('error', (err) => {
                console.log(err);
                process.exit();
            }).on('close', () => {
                console.log('Saved changes to', configPath);
                process.exit();
            })
        } else {
            console.log('No $EDITOR set');
            process.exit();
        }
    }

}