const { Command } = require('discord-akairo');
const { User } = require('../models/user');

const coinEmoji = "<:coins:729903134536630314>";
class RemoveCommand extends Command {
    constructor() {
        super('remove', {
            aliases: ['remove', 'rm'],
            ownerOnly: true,
            description: {
                desc: "remove money from users",
                format: "$give (amount) ({@users})",
                example: "$give 1000 @☆彡",
            },
            channel: 'guild',
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
            embed.description = `Need to give amount to remove`;
        } else {
            args.users.forEach(async element => {
                let user = await new User(element.user.id).update();
                const amount = args.amount > user.currency ? user.currency : args.amount;
                user.setCurrency(user.currency - amount);
            });
            embed.description = `**User(s) has lost ${args.amount} ${coinEmoji}**`;
        }
        message.channel.send({ embed });
    }
}
module.exports = RemoveCommand;