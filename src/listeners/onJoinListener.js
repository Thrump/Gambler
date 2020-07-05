const { Listener } = require('discord-akairo');

class onJoinListener extends Listener {
    constructor() {
        super('onJoin', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async updatePresence() {
        await this.client.user.setPresence({
            activity: {
                name: `${this.client.guilds.cache.array().length} servers | $help`,
                type: 'WATCHING'
            }
        })
    }

    exec(guild) {
        this.updatePresence();
    }
}

module.exports = onJoinListener;