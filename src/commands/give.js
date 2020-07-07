const { Command } = require('discord-akairo');
const { User } = require('../models/user');


class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give', 'gv'],
            ownerOnly: true,
            channel: 'guild',
            description: {
                desc: "Gives money to users",
                format: "$give (amount) ({@users}}",
                example: "$give 1000 @☆彡",
            },
            args: [{
                id: 'amount',
                type: 'number',
                default: 0
            }, {
                id: 'users',
                type: 'member',
                match: 'separate'
            }],
            category: 'Money'
        })
    }



    exec(message, args) {

        const embed = {
            color: `#C4FAF8`
        }
        if (args.users == null) {
            embed.title = `ERROR`;
            embed.description = `Need to @ users`;
        } else if (args.users.length != message.mentions.members.array().length) {
            embed.title = `ERROR`;
            embed.description = `Need to give amount to award`;
        } else {
            args.users.forEach(async element => {
                let user = await new User(element.user.id).update();
                user.setCurrency(user.currency + args.amount);
            });
            embed.description = `**User(s) have been awarded with ${args.amount} coins**`;
        }
        message.channel.send({ embed });
    }
}
module.exports = GiveCommand;