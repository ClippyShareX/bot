import Axios, { Method } from 'axios';

/**
 * The API class, used to make requests to the backend.
 */
export default class API {
    /**
     * The api key, used to make requests to the backend.
     */
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Send a request to the api.
     * @param {{ endpoint: string, method: Method, body: object }} data The request data.
     */
    async request(data: { endpoint: string, method: Method, body?: object }) {
        try {
            const BASE_URL = process.env.BACKEND_URL;

            const res = await Axios({
                url: `${BASE_URL}${data.endpoint}`,
                method: data.method,
                headers: {
                    'Authorization': this.apiKey,
                },
                data: {
                    ...data.body,
                },
            });

            return res.data;
        } catch (err) {
            err = err.response.data.error;

            throw new Error(
                `${err.charAt(0).toUpperCase() + err.slice(1)}.`
            );
        }
    }

    async request2(data: { endpoint: string, method: Method, body?: object }) {
        try {
            const BASE_URL = process.env.BACKEND_URL;

            const res = await Axios({
                url: `${BASE_URL}${data.endpoint}`,
                method: data.method,
                headers: {
                    'Authorization': this.apiKey,
                },
                data: data.body
            });

            return res.data;
        } catch (err) {
            err = err.response.data.error;

            throw new Error(
                `${err.charAt(0).toUpperCase() + err.slice(1)}.`
            );
        }
    }
    /**
     * Deletes a current domain
     * @param {string} name Name of the domain
     */
    async deleteDomain(name: string) {
        return await this.request({
            endpoint: `/domains/${name}`,
            method: 'DELETE'
        });
    }
    /**
     * Deletes a current domain
     * @param {string} invite The invite
     */
    async deleteInvite(invite: string) {
        return await this.request({
            endpoint: `/invites/${invite}`,
            method: 'DELETE'
        });
    }
    /**
     * Deletes a current image
     * @param {string} filename filename of the image
     */
    async deleteImage(filename: string) {
        return await this.request({
            endpoint: `/admin/files/${filename}`,
            method: 'DELETE'
        });
    }
    async addDomain(name: string, wildcard: boolean, donated: boolean, donatedBy: string, userOnly: boolean) {
        return await this.request2({
            endpoint: `/domains/`,
            method: 'POST',
            body: [{
                name: name,
                wildcard: wildcard || false,
                donated: donated || false,
                donatedBy: donatedBy || "null",
                userOnly: userOnly || false
            }]
        });
    }
    /**
     * Get the statistics on the uploaded files.
     */
    async getFileStats() {
        return await this.request({
            endpoint: '/files',
            method: 'GET',
        });
    }

    /**
     * Get all of the server's statistics.
     */
    async getTotalStats() {
        const stats = (await this.request({
            endpoint: '/users',
            method: 'GET',
        }));
        const totalUsers = stats.total;
        const totalBans = stats.blacklisted;
        const premium = stats.premium;
        const filestats = (await this.getFileStats());
        const totalFiles = filestats.total;
        const storageUsed = filestats.storageUsed;
        const { count } = (await this.request({
            endpoint: '/domains',
            method: 'GET',
        }));
        return {
            totalUsers,
            totalFiles,
            totalBans,
            premium,
            storageUsed,
            count,
        };
    }

    /**
     * Generate an invite code.
     */
    async generateInvite(executer : string) {
        return await this.request({
            endpoint: '/admin/invites',
            method: 'POST',
            body: {
                executerId: executer,
            },
        });
    }
    /**
    * @param {string} command executor
    * @param {number} count of invites to create
    */

    async generateBulkInvites(executer : string, count: number) {
        return await this.request({
            endpoint: '/admin/bulkinvites',
            method: 'POST',
            body: {
                executerId: executer,
                count: count,
            },
        });
    }


    /**
     *
     * @param {string} id The user's identifier.
     * @param {string} reason The reason for the blacklist.
     */
    async blacklist(id: string, reason: string, executer : string) {
        return await this.request({
            endpoint: '/admin/blacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
                executerId: executer,
            },
        });
    }
    async premium(id: string) {
        return await this.request({
            endpoint: '/admin/premium',
            method: 'POST',
            body: {
                id,
            },
        });
    }
    async verifyemail(id: string) {
        return await this.request({
            endpoint: '/admin/verifyemail',
            method: 'POST',
            body: {
                id,
            },
        });
    }
    async wipeuser(id: string) {
        return await this.request({
            endpoint: '/admin/wipe',
            method: 'POST',
            body: {
                id,
            },
        });
    }
    async unblacklist(id: string, reason: string, executer : string) {
        return await this.request({
            endpoint: '/admin/unblacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
                executerId: executer,
            },
        });
    }
    async giveinv(id: string, amount: number) {
        return await this.request({
            endpoint: '/admin/inviteadd',
            method: 'POST',
            body: {
                id,
                amount: amount,
            },
        });
    }
    async setuid(id: string, newuid: number) {
        return await this.request({
            endpoint: '/admin/setuid',
            method: 'POST',
            body: {
                id,
                newuid: newuid,
            },
        });
    }
    async invWave(amount: number) {
        return await this.request({
            endpoint: '/admin/invitewave',
            method: 'POST',
            body: {
                amount: amount,
            },
        });
    }
    async addDomains(name: Object[]) {
        return await this.request2({
            endpoint: '/domains/',
            method: 'POST',
            body: name
        });
    }

    /**
     * Get a user.
     * @param {string} id The user's identifier.
     */
    async getUser(id: string) {
        return await this.request({
            endpoint: `/admin/users/${id}`,
            method: 'GET',
        });
    }
}