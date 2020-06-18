const { Command } = require('discord-akairo');
// module.exports = {
//   name: 'restart',
//   description: 'Restarts the bot',
//   execute(message, args) {
//     //If PM2 is running, it will restart the procress
//     //otherwise the program will stop
//     if (message.author.id != require('../config.json').ownerId) return;
//     message.channel.send('Restarting bot');
//     console.log('Bot is restarting');
//     setTimeout(function () {
//       process.exit();
//     }, 100);
//   },
// };

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart'],
            ownerOnly: false,
            channel: 'guild'
        });
    }

    exec(message) {
        message.channel.send('Restarting bot');
        console.log('bot is restarting');
        setTimeout(function() {
            process.exit();
        }, 100);
    }
}

module.exports = RestartCommand;