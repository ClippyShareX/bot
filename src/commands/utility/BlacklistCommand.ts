import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class BlacklistCommand extends BaseCommand {
    constructor() {
        super({
            name: 'blacklist',
            description: 'Blacklist a user.',
            usage: 'blacklist <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide an identifier.'),
        });

        try {
            const reason = args.slice(1).join(' ');

            await this.client.api.blacklist(message.mentions[0] ? message.mentions[0] .id : args[0], reason, message.author.id);

            message.channel.createMessage({
                embed: Success('Blacklisted user successfully.'),
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
