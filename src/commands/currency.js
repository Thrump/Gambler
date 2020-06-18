User = require('../models/user').User
const { Command } = require('discord-akairo');

class CurrencyCommand extends Command {
    constructor() {
        super('currency', {
            aliases: ['currency']
        });
    }

    exec(message) {
        let user = new User(message.author.id);
        user.update().then((u) => {
            console.log(u);
            return message.channel.send(`Your current currency: ${u.currency}`);
        })
    }
}

module.exports = CurrencyCommand;