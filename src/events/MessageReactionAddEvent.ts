import { Member, Emoji, PossiblyUncachedMessage } from 'eris';
import BaseEvent from '../utils/structures/BaseEvent';

export default class MessageReactionAddEvent extends BaseEvent {
    constructor() {
        super({
            name: 'messageReactionAdd',
        });
    }


    async run({ message, emoji, reactor }: { message: PossiblyUncachedMessage, emoji: Emoji, reactor: Member | { id: string } }) {
        if (reactor.id !== '409538753997307915' || message.channel.id !== '799622023323975741') return;

        if (emoji.name === '👍') await this.client.deleteMessage(message.channel.id, message.id);
    }
}
