const { Command } = require("discord-akairo");
const { User } = require("../models/user");

class HourlyCommand extends Command {
    constructor() {
        super('hourly', {
            aliases: ['hourly'],
            cooldown: 3600000,
            description: {
                desc: "Recieve 10000 coins every 1 hour. +500 for each rankup",
                format: "$hourly",
                example: "$hourly",
            },
            category: 'Money'
        })
    }

    async exec(message) {
        let user = await new User(message.author.id).update();
        user.setCurrency(user.currency + 10000 + 500 * (user.rank - 1));
        const embed = {
            color: `#C4FAF8`,
            title: `AWARDED`,
            description: `You\'ve recieved your ${10000 + 500 * (user.rank - 1)} coins\nCome back in 1 Hour!`
        }
        return message.channel.send({ embed });
    }
}

module.exports = HourlyCommand;