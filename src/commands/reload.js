const { Command } = require('discord-akairo');


class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            ownerOnly: true,
        });
    }

    exec(message) {
        this.handler.reloadAll();
        message.channel.send('All commands have been reloaded');
    }
}

module.exports = ReloadCommand;