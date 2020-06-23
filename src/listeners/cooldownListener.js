const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {
        console.log('check2');
        const sec = Math.floor((remaining / 1000) % 60);
        message.reply(`Cooldown: ${sec}s on ${command}`);
    }
}

module.exports = CooldownListener;