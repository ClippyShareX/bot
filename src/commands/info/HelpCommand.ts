import { Message, TextChannel } from 'eris';
import { Embed } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: 'help',
            description: 'Get a list of all of the bot\'s commands.',
            usage: 'help',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        const commands = this.client.commands;
        const categories = [];

        commands.forEach((cmd) => {
            if (!categories.find((x) => x.name === cmd.category)) categories.push({
                name: cmd.category,
                value: `\`${process.env.PREFIX}help ${cmd.category}\``,
                inline: true,
            });
        });

        const command = commands.get(args[0]);
        const category = categories.find((x) => x.name === args[0]);
        const embed = new Embed();

        if (category) {
            const categoryCommands = [];

            commands.forEach((cmd) => {
                if (cmd.category === args[0]) categoryCommands.push({
                    name: cmd.name,
                    value: `\`${process.env.PREFIX}help ${cmd.name}\``,
                    inline: true,
                });
            });

            embed.setTitle(category.name.charAt(0).toUpperCase() + category.name.slice(1))
                .addFields(categoryCommands);

            message.channel.createMessage({
                embed: embed.embed,
            });
        } else if (!command) {
            embed.setTitle('Help and Information')
                .setDescription(`You can view specific commands by doing \`${process.env.PREFIX}help <category>\``)
                .addFields(categories);

            message.channel.createMessage({
                embed: embed.embed,
            });
        } else {
            embed.setTitle(`${command.name.charAt(0).toUpperCase() + command.name.slice(1)} Command`)
                .setDescription(command.description)
                .addFields([
                    {
                        name: 'Usage',
                        value: `${process.env.PREFIX}${command.usage}`,
                    },
                    {
                        name: 'Permissions',
                        value: `\`${command.permissions.join(', ')}\``,
                    },
                ]);

            message.channel.createMessage({
                embed: embed.embed,
            });
        }
    }
}
