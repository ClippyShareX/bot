import { promises } from 'fs';
import { join } from 'path';
import DiscordClient from '../client';
import BaseCommand from './structures/BaseCommand';
import BaseEvent from './structures/BaseEvent';

let currentDir = '';

/**
 * Handle the commands in a directory.
 * @param {DiscordClient} client The discord client.
 * @param {string} dir The directory to handle.
 */
async function handleCommands(client: DiscordClient, dir: string = join(__dirname, '../commands')) {
    const subDirs = await promises.readdir(dir);

    for (const file of subDirs) {
        const stat = await promises.lstat(join(dir, file));

        if (stat.isDirectory()) {
            currentDir = file;

            await handleCommands(
                client,
                join(dir, file)
            );
        }

        if (file.endsWith('.js') || file.endsWith('.ts')) {
            const { default: Command } = await import(join(dir, file));
            const command: BaseCommand = new Command();

            if (client.commands.get(command.name)) throw new Error(
                `${command.name} command has already been loaded`
            );

            command.category = currentDir;
            command.client = client;
            client.commands.set(command.name, command);
        }
    }
}

/**
 * Handle all of the events in the events directory.
 * @param {DiscordClient} client The discord client.
 */
async function handleEvents(client: DiscordClient) {
    const dir = join(__dirname, '../events');
    const files = await promises.readdir(dir);
    for (const file of files) {
        if (file.endsWith('.js') || file.endsWith('.ts')) {
            const { default: Event } = await import(join(dir, file));
            const event: BaseEvent = new Event();

            event.client = client;
            client.on(event.name, await event.run.bind(event));
        }
    }
}

export {
    handleCommands,
    handleEvents
};
