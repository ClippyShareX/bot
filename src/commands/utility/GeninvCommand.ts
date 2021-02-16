import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class GeninvCommand extends BaseCommand {
    constructor() {
        super({
            name: 'geninv',
            description: 'Generate an invite and send to user.',
            usage: 'geninv (@user)',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!message.member.roles.includes(process.env.ADMIN_ROLE)) return;
        try {
            if (message.mentions[0]) {
                const dms = await message.mentions[0].getDMChannel();
                const { link, code } = await this.client.api.generateInvite(message.author.id);
                const embed = new Embed()
                    .setTitle('Here is your invite')
                    .setUrl(link)
                    .addFields([
                        {
                            name: 'Direct Link',
                            value: `[Click Here](${link})`,
                        },
                        {
                            name: 'Code',
                            value: `||\`${code}\`||`,
                        },
                    ]);

                await dms.createMessage({
                    embed: embed.embed,
                });
                const embed2 = new Embed()
                    .setTitle('Sent invite in DMS')
                    .setDescription('Successfully sent invite to ' + message.mentions[0].username);

                await message.channel.createMessage({
                    embed: embed2.embed,
                });
            } else {
                const { link, code } = await this.client.api.generateInvite(message.author.id);
                const embed = new Embed()
                    .setTitle('Here is an invite')
                    .setUrl(link)
                    .addFields([
                        {
                            name: 'Direct Link',
                            value: `[Click Here](${link})`,
                        },
                        {
                            name: 'Code',
                            value: `||\`${code}\`||`,
                        },
                    ]);

                await message.channel.createMessage({
                    embed: embed.embed,
                });
            }
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
