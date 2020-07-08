const { Command } = require("discord-akairo");
const { User } = require("../models/user");

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
        user.setCurrency(user.currency + 50000 + 1000 * (user.rank - 1));
        const embed = {
            color: `#C4FAF8`,
            title: `AWARDED`,
            description: `You\'ve recieved your ${50000 + 1000 * (user.rank - 1)} coins\nCome back in 7 days!`
        }
        return message.channel.send({ embed });
    }
}

module.exports = WeeklyCommand;