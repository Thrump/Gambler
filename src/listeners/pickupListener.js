const { Listener } = require('discord-akairo');

class PickupListener extends Listener {
    constructor() {
        super('pickup', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        if ((Math.floor(Math.random() * 100) + 1) > 10) return;
    }
}