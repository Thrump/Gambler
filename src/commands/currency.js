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

    async exec(message) {
        let user = await new User(message.author.id).update();
        return message.channel.send(`Your current currency: ${user.currency}`);

    }
}

module.exports = CurrencyCommand;