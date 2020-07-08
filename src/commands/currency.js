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
            args: [{
                id: 'user',
                type: 'member'
            }]
        });
    }

    async exec(message, args) {

        const embed = {
            color: `#C4FAF8`,
        };
        if (args.user === undefined) {
            embed.title = ('ERROR: No user was found');
        } else {
            const account = args.user === null ? message.member : args.user;
            let user = await new User(account.id).update();
            embed.title = `${account.displayName}'s Currency`;
            embed.description = `Amount: ${user.currency}`;
        }

        return message.channel.send({ embed });
    }
}

module.exports = CurrencyCommand;