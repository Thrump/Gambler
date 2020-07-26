const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

User = require('../models/user').User
client = require('../../main').client

class RPSCommand extends Command {
    constructor() {
        super('rps', {
            aliases: ['rps'],
            ownerOnly: false,
            description: {
                desc: "Gamble your money by playing a game of Rock Paper Scissors.",
                format: "$rps (R/P/S) (amount)",
                example: "$rps P 50"
            },
            args: [{
                id: 'option',
                type: [
                    ['rock', 'r'],
                    ['paper', 'p'],
                    ['scissors', 'scissor', 's']
                ],
            }, {
                id: 'amount',
                type: 'number',
                default: 0
            }],
            category: 'Money'
        });
    }

    async exec(message, args) {
        let user = await new User(message.author.id).update();

        if (args.option != 'rock' && args.option != 'paper' && args.option != 'scissors')
            return message.channel.send('ERROR: Invalid option provided for rock/paper/scissors');

        if (user.currency < args.amount || (args.amount == 'all' && user.currency == 0))
            return message.channel.send('ERROR: Insufficient funds');

        if (args.amount == 0)
            return message.channel.send('ERROR: Cannot bet 0');
    }
}

module.exports = RPSCommand;