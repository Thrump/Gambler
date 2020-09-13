const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
User = require('../models/user').User;

const coinEmoji = "<:coins:729903134536630314>";
class RankUpCommand extends Command {
    constructor() {
        super('rankup', {
            aliases: ['rankup', 'ru'],
            description: {
                desc: "Spend money to rank up to the next rank",
                format: "$rankup",
                example: "$rankup"
            },
            category: 'Money'
        })
    }

    async exec(message) {
        const user = await new User(message.author.id).update();
        const curr = user.currency;
        const nextRank = 100000 + 10000 * (user.rank) + 10000 * (Math.floor(user.rank / 10));
        let embed;
        if (curr < nextRank) {
            embed = {
                color: '#C4FAF8',
                title: 'ERROR',
                description: `You need ${nextRank - curr} ${coinEmoji} more before next rankup`
            };
            return message.channel.send({ embed });
        } else {
            user.setRank(user.rank + 1);
            user.setCurrency(user.currency - nextRank);
            embed = {
                color: '#C4FAF8',
                title: 'CONGRATS',
                description: `You've rankup to ${user.rank}\nNext rank amount: ${100000 + 10000 * (user.rank) + 10000 * (Math.floor(user.rank / 10))} ${coinEmoji}`
            };
            return message.channel.send({ embed });
        }
    }
}

module.exports = RankUpCommand;