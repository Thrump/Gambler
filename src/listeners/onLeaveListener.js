const { Listener } = require('discord-akairo');

class onLeaveListener extends Listener {
    constructor() {
        super('onLeave', {
            emitter: 'client',
            event: 'guildDelete'
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

module.exports = onLeaveListener;