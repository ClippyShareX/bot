import BaseEvent from '../utils/structures/BaseEvent';
import {VoiceChannel} from "eris";

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super({
            name: 'ready',
        });
    }

    /**
     * Update the bots status.
     */
    async changeStatus() {
        try {
            const {totalFiles, totalUsers, storageUsed, count} = await this.client.api.getTotalStats();
            const members = this.client.guilds.get('797483366634750063').memberCount
            const random = this.randomInteger(1, 4);
            if (random == 1) {
                this.client.editStatus('dnd', {
                    name: `${totalUsers} users.`,
                    type: 2,
                });
            } else if (random == 2) {
                this.client.editStatus('dnd', {
                    name: `over ${totalFiles} files.`,
                    type: 3,
                });
            } else if (random == 3) {
                this.client.editStatus('dnd', {
                    name: `over ${totalFiles} files.`,
                    type: 3,
                });
            } else {
                this.client.editStatus('dnd', {
                    name: `${count} domains.`,
                    type: 2,
                });
            }
            if ((this.client.getChannel("807290686260379649") as VoiceChannel).name != 'Members: ' + members) {
            await this.client.editChannel("807290686260379649", {
                name: 'Members: ' + members
            }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel("807290886773145650") as VoiceChannel).name !=  'Users: ' + totalUsers) {
                await this.client.editChannel("807290886773145650", {
                    name: 'Users: ' + totalUsers
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel("804986983881113630") as VoiceChannel).name !=  'Files: ' + totalFiles) {
                await this.client.editChannel("804986983881113630", {
                    name: 'Files: ' + totalFiles
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel("807290973113679909") as VoiceChannel).name !=  'Storage Used: ' + storageUsed) {
                await this.client.editChannel("807290973113679909", {
                    name: 'Storage Used: ' + storageUsed
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel("806508158733910136") as VoiceChannel).name !=  'Domains: ' + count) {
                await this.client.editChannel("806508158733910136", {
                    name: 'Domains: ' + count
                }).catch((e) => console.log(e));
            }
            setTimeout(async () => {
                await this.changeStatus();
            }, 300000);
        } catch (err) {}
    }
     randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async run() {
        await this.changeStatus();
        console.log(`Logged in as ${this.client.user.username}#${this.client.user.discriminator}`);
    }
}
