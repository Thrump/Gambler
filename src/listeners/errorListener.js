const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    exec(error, message, command) {
        message.channel.send(`ERROR: something broke in the backend.\n Report ${command.aliases} command to ☆彡#1001`);
        console.error(error);
    }
}

// module.exports = ErrorListener;