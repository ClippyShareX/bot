import { Message } from 'eris';
import { CommandInterface } from '../interfaces/CommandInterface';
import DiscordClient from '../../client';

export default abstract class BaseCommand {
    /**
     * The discord client.
     */
    client: DiscordClient;

    /**
     * The command's name.
     */
    name: string;

    /**
     * A description of the command.
     */
    description: string

    /**
     * A example usage of the command.
     */
    usage: string;

    /**
     * The command's category.
     */
    category: string;

    /**
     * A list of required permissions to run the command.
     */
    permissions: Array<PermissionString>;

    constructor(command: CommandInterface) {
        this.client;
        this.name = command.name;
        this.description = command.description;
        this.usage = command.usage;
        this.category;
        this.permissions = command.permissions;
    }

    /**
     * The function run when a command is triggered.
     * @param {Message} message The message that was run that triggered the command.
     * @param {Array<string>} args The command arguments, if any.
     */
    abstract run (message: Message, args: Array<string>): Promise<any>;
}
