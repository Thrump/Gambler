const { Command } = require('discord-akairo');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart'],
            ownerOnly: true,
            channel: 'guild',
            category: 'development'
        });
    }

    exec(message) {
        //If PM2 is running, it will restart the procress
        //otherwise the program will stop
        message.channel.send('Restarting bot');
        console.log('bot is restarting');
        setTimeout(function() {
            process.exit();
        }, 100);
    }
}

module.exports = RestartCommand;