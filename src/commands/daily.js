const { Command } = require("discord-akairo");
const { User } = require("../models/user");

class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily'],
            cooldown: 86400000,
            description: {
                desc: "Recieve 30000 coins every 24. +750 for every rankup.",
                format: "$daily",
                example: "$daily",
            },
            category: 'Money'
        })
    }

    async exec(message) {

        let user = await new User(message.author.id).update();
        user.setCurrency(user.currency + 30000 + 1000 * (user.rank - 1));
        const embed = {
            color: `#C4FAF8`,
            title: `AWARDED`,
            description: `You\'ve recieved your ${30000 + 1000 * (user.rank - 1)} coins\nCome back in 24 hours!`
        }
        return message.channel.send({ embed });
    }
}

module.exports = DailyCommand;