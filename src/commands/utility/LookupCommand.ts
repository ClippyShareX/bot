import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'lookup',
            description: 'Lookup a user.',
            usage: 'lookup <uuid/uid/discord>)',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });
        try {
            const { user } = await this.client.api.getUser(message.mentions[0] ? message.mentions[0] .id : args[0]);
            const embed = new Embed()
                .setDescription(`UID ${user.uid} | [${user.username}](https://clippy.gg/u/${user.uid}) (${user.role})`)
                .setThumbnail({ url: user.avatar })
                .setFooter({
                    text: `UUID ${user.uuid} | Invited by ${user.invitedBy}`,
                })
                .addFields([
                    {
                        name: 'Statistics',
                        value: `Uploaded ${user.uploads} images\n Last login was ${new Date(user.lastLogin).toLocaleString()}, registered at ${new Date(user.registrationDate).toLocaleString()}`,
                        inline: true,
                    },
                    {
                        name: 'Discord',
                        value: user.discordId ? `<@${user.discordId}>` : 'Not Linked',
                        inline: true,
                    },
                    {
                        name: 'Invites',
                        value: user.invitedUsers[0] ? `\`\`\`${user.invitedUsers.join(', ')}\`\`\`` : 'None',
                        inline: false,
                    },
                ]);

            await message.channel.createMessage({
                embed: embed.embed,
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
