import { Message, TextChannel } from 'eris';
import {Embed, Error, Success} from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AddinviteCommand extends BaseCommand {
    constructor() {
        super({
            name: 'giveinvites',
            description: 'Give a user an invite',
            usage: 'giveinvites (<uuid/uid/discord>) amount',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0] && !message.mentions[0]) return message.channel.createMessage({
            embed: Error('Provide an identifier.'),
        });

        try {
            if(args[0] === "everyone"){
                await this.client.api.invWave(parseInt(args[1]));
                await message.channel.createMessage({
                    embed: Success('Invite wave go brr.'),
                });
            }else {
                await this.client.api.giveinv(message.mentions[0] ? message.mentions[0] .id : args[0], parseInt(args[1]));

                await message.channel.createMessage({
                    embed: Success('Added invite(s) successfully.'),
                });
            }
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
