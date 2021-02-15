import { Message, TextChannel } from 'eris';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class PingCommand extends BaseCommand {
    constructor() {
        super({
            name: 'ping',
            description: 'Get the bot\'s ping.',
            usage: 'ping',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, _args: Array<string>) {
        const start = Date.now();

        message.channel.createMessage('Pong!')
            .then((msg) => msg.edit(`\`${Date.now() - start}ms\``));
    }
}
