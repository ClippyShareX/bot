import { Message, TextChannel } from 'eris';
import {Embed, Error, Success} from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'verifyemail',
            description: `verifyemail someone's email`,
            usage: 'verifyemail <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0] && !message.mentions[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });
        try {
            await this.client.api.verifyemail(message.mentions[0] ? message.mentions[0] .id : args[0]);

            await message.channel.createMessage({
                embed: Success('Verified user email'),
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
