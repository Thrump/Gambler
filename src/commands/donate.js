const { Command } = require('discord-akairo');
User = require('../models/user').User;

class DonateCommand extends Command {
    constructor() {
        super('donate', {
            aliases: ['donate', 'dn'],
            channel: 'guild',
            args: [{
                    id: 'user',
                    type: 'member'
                },
                {
                    id: 'amount',
                    type: 'integer'
                },
            ],
            category: 'Money',
            description: {
                desc: 'Donate your money to someone else!',
                format: '$donate (@user) (amount)',
                example: '$donate @☆彡#1001 1000',
            }
        })
    }

    async exec(message, args) {
        let embed = {
            color: `#C4FAF8`
        }
        if (args.user === undefined) {
            embed.title = 'ERROR: no user was found'
        } else if (args.amount < 1) {
            embed.title = `ERROR: Amount must be greater than 0`
        } else {
            const reciever = await new User(args.user.id).update();
            const giver = await new User(message.member.id).update();
            if (args.amount > giver.currency) {
                embed.title = `ERROR: Insufficient Funds`
            } else {
                reciever.setCurrency(reciever.currency + args.amount);
                giver.setCurrency(giver.currency - args.amount);
                embed.title = `DONATED`
                embed.description = `${args.amount} was given to ${args.user.displayName}`;
            }
        }

        message.channel.send({ embed });
    }
}

module.exports = DonateCommand;