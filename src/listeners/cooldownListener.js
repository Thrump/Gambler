const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {
        const embed = {
            color: `#C4FAF8`,
            title: `COOLDOWN`
        }
        var sec = Math.floor((remaining / 1000));
        var minute = Math.floor(sec / 60);
        var hour = Math.floor(minute / 60);
        var day = Math.floor(hour / 24);
        hour = hour % 24;
        minute = minute % 60;
        sec = sec % 60;
        if (command.id == "daily" || command.id == "hourly" || command.id == "weekly") {
            embed.description = `You have ${day} days, ${hour} hours, ${minute} mins, ${sec} secs left on your ${command}`
        } else embed.description = `Cooldown: ${sec}s on ${command}`;
        message.channel.send({ embed });
    }

}

module.exports = CooldownListener;