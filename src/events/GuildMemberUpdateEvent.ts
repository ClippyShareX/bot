import {Member, Guild, TextChannel} from 'eris';
import { Embed } from '../utils/Embeds';
import BaseEvent from '../utils/structures/BaseEvent';

export default class guildMemberUpdateEvent extends BaseEvent {
    constructor() {
        super({
            name: 'guildMemberUpdate',
        });
    }

    async run(_guild: Guild, newMember: Member, oldMember: Member ) {
        if (newMember.roles.includes(process.env.BOOSTER_ROLE) && !oldMember.roles.includes(process.env.BOOSTER_ROLE)) {
            try {
                await (await newMember.user.getDMChannel()).createMessage({
                    embed: new Embed()
                        .setTitle('Thank you for boosting!')
                        .setDescription(`Hello, ${newMember.user.username}.\n\nThank you for boosting Clippy, in order to claim your invite, please create a ticket in the support channel, (<#799233642651058216>).`).embed,
                });
                await (await this.client.getChannel("799242540069945364") as TextChannel).createMessage({
                    embed: new Embed()
                        .setTitle(newMember.username + " just boosted clippy.gg!")
                        .setDescription(`<@${newMember.id}> just boosted the server! \nIn order to claim your free invite, please create a ticket in the support channel, (<#799233642651058216>).`).embed,
                });

            } catch (err) {}
        }
    }
}
