const { Listener } = require('discord-akairo');

class OnReadyListener extends Listener {
    constructor() {
        super('onReady', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async setup() {
        await this.client.user.setPresence({
            activity: {
                name: `${this.client.guilds.cache.array().length} servers | $help`,
                type: 'WATCHING'
            }
        })
    }

    exec() {
        this.setup();
    }
}

module.exports = OnReadyListener;