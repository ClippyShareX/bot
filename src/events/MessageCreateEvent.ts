import { Message } from 'eris';
import { Error } from '../utils/Embeds';
import BaseCommand from '../utils/structures/BaseCommand';
import BaseEvent from '../utils/structures/BaseEvent';

const ignoredChannels = process.env.IGNORED_CHANNELS.split(' ');
const owners = process.env.OWNERS.split(' ');

export default class MessageCreateEvent extends BaseEvent {
    constructor() {
        super({
            name: 'messageCreate',
        });
    }

    /**
     * Determines if the user has the required permissions to run the command.
     * @param {BaseCommand} command The command to run.
     * @param {Message} message The message.
     * @return {boolean} The result.
     */
    hasPermission(command: BaseCommand, message: Message): boolean {
        for (const permission of command.permissions) {
            if (!message.member.permissions.has(permission)) return false;
        }

        return true;
    }

    async run(message: Message) {
        if (message.author.bot || message.channel.type === 1) return;

        const prefix = process.env.PREFIX;
        try {
            if (message.channel.id === '799622023323975741' && !message.content.startsWith('%suggest')) {
                await message.delete();
                return;
            }
            if ((ignoredChannels.includes(message.channel.id) && !owners.includes(message.author.id)) || !message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const name = args.shift().toLowerCase();
            const command: BaseCommand = this.client.commands.get(name);

            if (!command || (message.channel.type === 0 && !this.hasPermission(command, message))) return;

            return command.run(message, args);
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
