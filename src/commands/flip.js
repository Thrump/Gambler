User = require('../models/user').User
client = require('../../main').client

module.exports = {
    name: 'flip',
    description: 'Gamble for flipping coins',
    execute(message, args) {
        if (args.length < 2) return message.reply('ERROR: %flip [side] [amount]');
        if (args[1] == 0) return message.reply('ERROR: Amount must be higher than 0');
        if (args[0] != 'h' && args[0] != 't' && args[0] != 'heads' && args[0] != 'tails')
            return message.reply('ERROR: Must be heads(h) or tails(t)');
        let user = new User(message.author.id);
        user.update().then((u) => {
            if (u.currency < args[1] || (args[1] == 'all' && u.currency == 0))
                return message.reply('ERROR: Insufficient funds');
            const randomNumber = Math.round(Math.random());
            const landed = randomNumber ? "tails" : "heads";
            // if (landed == "tails") {
            //     message.channel.send(`${client.emojis.find(emoji => emoji.name ==="tails")}`);
            // } else {
            //     message.channel.send(`${client.emojis.find(emoji => emoji.name ==="heads")}`);
            // }
            message.channel.send(`Landed on: ${landed}`);
            const value = args[1] == 'all' ? u.currency : args[1];
            if (args[0] == 'heads' || args[0] == 'h') {
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