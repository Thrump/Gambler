const { Command } = require("discord-akairo");
const { User } = require("../models/user");

const coinEmoji = "<:coins:729903134536630314>";
class WeeklyCommand extends Command {
    constructor() {
        super('weekly', {
            aliases: ['weekly'],
            cooldown: 604800000,
            description: {
                desc: "Recieve 50000 coins every week. +1000 for each rankup",
                format: "$weekly",
                example: "$weekly",
            },
            category: 'Money'
        })
    }

    async exec(message) {
        let user = await new User(message.author.id).update();
        user.setCurrency(user.currency + 75000 + 1500 * (user.rank - 1));
        const embed = {
            color: `#C4FAF8`,
            title: `AWARDED`,
            description: `You\'ve recieved your ${75000 + 1500 * (user.rank - 1)} ${coinEmoji}\nCome back in 7 days!`
        }
        return message.channel.send({ embed });
    }
}

module.exports = WeeklyCommand;