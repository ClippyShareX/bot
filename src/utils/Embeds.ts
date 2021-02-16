/* eslint-disable valid-jsdoc */
import { EmbedInterface } from './interfaces/EmbedInterface';
import colors from './colors.json';
import { EmbedFooterOptions, EmbedImageOptions } from 'eris';

/**
 * The embed builder class.
 */
class Embed {
    /**
     * The default embed, with your own specified colors and fields.
     */
    embed: EmbedInterface;

    constructor() {
        this.embed = {
            author: {
                name: null,
                icon_url: null,
            },
            title: null,
            footer: null,
            thumbnail: null,
            description: null,
            color: colors.default,
            timestamp: null,
            fields: [],
            url: null,
        };
    }

    /**
     * Change the embed's title.
     * @param {string} title The embed title.
     */
    setTitle(title: string) {
        this.embed.title = title;
        return this;
    }

    setFooter(footer: EmbedFooterOptions) {
        this.embed.footer = footer;
        return this;
    }
    setTimestamp(timestamp: Date) {
        this.embed.timestamp = timestamp;
        return this;
    }

    /**
     * Change the embed's image.
     * @param {string} image The embed thumbnail.
     */
    setThumbnail(image: EmbedImageOptions) {
        this.embed.thumbnail = image;
        return this;
    }


    /**
     * Set the embed url.
     * @param {string} url The embed url.
     */
    setUrl(url: string) {
        this.embed.url = url;

        return this;
    }

    /**
     * Change the embed's description.
     * @param {string} description The embed description.
     */
    setDescription(description: string) {
        this.embed.description = description;

        return this;
    }

    /**
     * Add a array of fields to the embed.
     * @param {Array<any>} fields The fields.
     */
    addFields(fields: Array<{ name: string, value: string, inline?: boolean }>) {
        for (const { name, value, inline } of fields) {
            this.addField({
                name,
                value,
                inline,
            });
        }

        return this;
    }

    /**
     * Add a field to an embed.
     * @param param0 The field data.
     */
    addField({ name, value, inline }: { name: string, value: string, inline?: boolean }) {
        this.embed.fields.push({
            name,
            value,
            inline: inline || false,
        });

        return this;
    }
}

/**
 * Return a embed preset for a error message.
 * @param {string} message The message, defaults to "Something went wrong, please try again."
 * @return {{ description: string, color: number }} The preset embed.
 */
function Error(message: string = 'Something went wrong, please try again.'): { description: string, color: number } {
    return {
        description: message,
        color: colors.error,
    };
}

/**
 * Return a embed preset for a success message.
 * @param {string} message The message, defaults to "Completed action successfully."
 * @return {{ description: string, color: number }} The preset embed.
 */
function Success(message: string = 'Completed action successfully.'): { description: string, color: number } {
    return {
        description: message,
        color: colors.success,
    };
}

export {
    Success,
    Error,
    Embed
};
