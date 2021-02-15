import { Message, TextChannel } from 'eris';
import {Embed, Error, Success} from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AddDomainCommand extends BaseCommand {
    constructor() {
        super({
            name: 'wipeuser',
            description: 'Wipe a user + their files.',
            usage: 'wipeuser <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a user to wipe'),
        });

        try {
        await this.client.api.wipeuser(message.mentions[0] ? message.mentions[0] .id : args[0]);

        await message.channel.createMessage({
                embed: Success('Wiped user successfully.'),
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
