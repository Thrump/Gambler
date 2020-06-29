User = require('../models/user').User;
const { Command } = require('discord-akairo');

class CurrencyCommand extends Command {
    constructor() {
        super('currency', {
            aliases: ['currency', 'balance', 'bal'],
            category: 'Money',
            description: {
                desc: "Posts current user's currency amount",
                format: "$currency",
                example: "$currency"
            },
        });
    }

    exec(message) {
        let user = new User(message.author.id);
        user.update().then((u) => {
            return message.channel.send(`Your current currency: ${u.currency}`);
        })
    }
}

module.exports = CurrencyCommand;