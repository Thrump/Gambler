const { Command } = require('discord-akairo');

User = require('../models/user').User
client = require('../../main').client

class FlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip'],
            ownerOnly: false,
            args: [{
                id: 'arg1',
                default: 0
            }, {
                id: 'arg2',
                default: 0
            }]
        });
    }

    exec(message, args) {

        if (args.length < 2) return message.reply('ERROR: %flip [side] [amount]');
        if (args.arg2 == 0) return message.reply('ERROR: Amount must be higher than 0');
        if (args.arg1 != 'h' && args.arg1 != 't' && args.arg1 != 'heads' && args.arg1 != 'tails')
            return message.reply('ERROR: Must be heads(h) or tails(t)');
        let user = new User(message.author.id);
        user.update().then((u) => {
            if (u.currency < args.arg2 || (args.arg2 == 'all' && u.currency == 0))
                return message.reply('ERROR: Insufficient funds');
            const randomNumber = Math.round(Math.random());
            const landed = randomNumber ? "tails" : "heads";
            // if (landed == "tails") {
            //     message.channel.send(`${client.emojis.find(emoji => emoji.name ==="tails")}`);
            // } else {
            //     message.channel.send(`${client.emojis.find(emoji => emoji.name ==="heads")}`);
            // }
            message.channel.send(`Landed on: ${landed}`);
            const value = args.arg2 == 'all' ? u.currency : args.arg2;
            if (args.arg1 == 'heads' || args.arg1 == 'h') {
                if (randomNumber == 0) {
                    message.channel.send(`Senpai you won ${parseInt(value) * 2} cummies`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                } else {
                    message.channel.send('booboo the fucking fool, shouldve bet on tails');
                    u.setCurrency(u.currency - parseInt(value));
                }
            } else {
                if (randomNumber == 1) {
                    message.channel.send(`Senpai you won ${parseInt(value) * 2} cummies`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                } else {
                    message.channel.send('booboo the fucking fool, shouldve bet on heads');
                    u.setCurrency(u.currency - parseInt(value));
                }
            }
        })
    }
}

module.exports = FlipCommand;