import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AdddomainCommand extends BaseCommand {
    constructor() {
        super({
            name: 'adddomain',
            description: 'Adds 1 domain',
            usage: 'adddomain domain wildcard donated donatedby useronly',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4]) return message.channel.createMessage({
            embed: Error('Please specify an argument!\n`adddomain domain wildcard donated donatedby useronly`'),
        });

        try {
            const domainInfo = {
                name: args[0],
                wildcard: JSON.parse(args[1]),
                donated: JSON.parse(args[2]),
                donatedBy: args[3],
                userOnly: JSON.parse(args[4]),
            };

            await this.client.api.addDomain(
                domainInfo.name,
                domainInfo.wildcard,
                domainInfo.donated,
                domainInfo.donatedBy,
                domainInfo.userOnly
            );

            message.channel.createMessage({
                embed: Success('Successfully added domain: ' + args[0]),
            });
        } catch (e) {
            return await message.channel.createMessage({
                embed: Error(e.message),
            });
        }
    }
}
