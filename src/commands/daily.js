const { Command } = require("discord-akairo");
const { User } = require("../models/user");

class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily'],
            cooldown: 1800000,
            description: {
                desc: "Recieve 10000 coins every 30 minutes",
                format: "$daily",
                example: "$daily",
            },
            category: 'Money'
        })
    }

    async exec(message) {
        let user = await new User(message.author.id).update();
        user.setCurrency(user.currency + 10000);
        return message.reply('You\'ve recieved your 10000 coins');
    }
}

module.exports = DailyCommand;