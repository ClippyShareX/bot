import DiscordClient from '../../client';

export default abstract class BaseEvent {
    /**
     * The discord client.
     */
    client: DiscordClient;

    /**
     * The name of the event.
     */
    name: EventString;

    constructor(event: { name: EventString }) {
        this.client;
        this.name = event.name;
    }

    /**
     * The function that is run when the event is triggered.
     * @param {any} args The event parameters.
     */
    abstract run(...args: any): Promise<any>;
}
