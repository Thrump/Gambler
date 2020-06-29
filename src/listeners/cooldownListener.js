const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {
        var sec = Math.floor((remaining / 1000));
        var minute = Math.floor(sec / 60);
        sec = sec % 60;
        if (command.id == "daily") return message.reply(`You have ${minute} mins and ${sec} seconds left on your daily`);
        else message.reply(`Cooldown: ${sec}s on ${command}`);
    }
}

module.exports = CooldownListener;