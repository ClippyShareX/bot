import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class StatsCommand extends BaseCommand {
    constructor() {
        super({
            name: 'stats',
            description: 'Get Clippy\'s statistics.',
            usage: 'stats',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, _args: Array<string>) {
        try {
            const { totalFiles, totalUsers, totalBans, premium, storageUsed, count } = await this.client.api.getTotalStats();
            const embed = new Embed()
                .setTitle('Total Stats')
                .addFields([
                    {
                        name: 'Users',
                        value: `\`${totalUsers}\``,
                        inline: true,
                    },
                    {
                        name: 'Files',
                        value: `\`${totalFiles}\``,
                        inline: true,
                    },
                    {
                        name: 'Blacklists',
                        value: `\`${totalBans}\``,
                        inline: true,
                    },
                    {
                        name: 'Premium Users',
                        value: `\`${premium}\``,
                        inline: true,
                    },
                    {
                        name: 'Total Storage Used',
                        value: `\`${storageUsed}\``,
                        inline: true,
                    },
                    {
                        name: 'Domains',
                        value: `\`${count}\``,
                        inline: true,
                    },
                ]);

            message.channel.createMessage({
                embed: embed.embed,
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
