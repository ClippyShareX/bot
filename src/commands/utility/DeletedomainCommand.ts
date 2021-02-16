import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class DeletedomainCommand extends BaseCommand {
    constructor() {
        super({
            name: 'deldomain',
            description: 'Deletes a domain',
            usage: 'deldomain domain',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Please specify an argument!\n`deldomain domain`'),
        });

        try {
            await this.client.api.deleteDomain(args[0]);

            await message.channel.createMessage({
                embed: Success('Sucessfully deleted domain: ' + args[0]),
            });
        } catch (e) {
            return await message.channel.createMessage({
                embed: Error(e.message),
            });
        }
    }
}
