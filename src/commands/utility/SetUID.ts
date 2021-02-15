import { Message, TextChannel } from 'eris';
import {Embed, Error, Success} from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AddinviteCommand extends BaseCommand {
    constructor() {
        super({
            name: 'setuid',
            description: 'Set nice uid for peeps',
            usage: 'setuid (<uuid/uid/discord>) newuid',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0] && !message.mentions[0]) return message.channel.createMessage({
            embed: Error('Provide an identifier.'),
        });

        try {
                await this.client.api.setuid(message.mentions[0] ? message.mentions[0] .id : args[0], parseInt(args[1]));
                await message.channel.createMessage({
                    embed: Success('Set uid successfully'),
                });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
