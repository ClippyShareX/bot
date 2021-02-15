import { Message, TextChannel } from 'eris';
import {Embed, Error, Success} from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AddDomainCommand extends BaseCommand {
    constructor() {
        super({
            name: 'adddomains',
            description: 'Add multiple domains',
            usage: 'adddomain domain1 domain2',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide atleast one domain.'),
        });

        try {
            const domains = [];
            for(const arg of args){
                var domain = {
                    name: arg,
                    wildcard: true,
                }
                domains.push(domain)
            }
            await this.client.api.addDomains(domains);

            await message.channel.createMessage({
                embed: Success('Added domain successfully.'),
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
