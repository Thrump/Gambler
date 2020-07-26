const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

User = require('../models/user').User
client = require('../../main').client

const botOptions = ['rock', 'paper', 'scissors'];

class RPSCommand extends Command {
    constructor() {
        super('rps', {
            aliases: ['rps'],
            ownerOnly: false,
            description: {
                desc: "Gamble your money by playing a game of Rock-Paper-Scissors.",
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

        let userWin = false;
        let tie = false;
        let netGain = 0;
        let rand = Math.floor((Math.random() * 3) + 1);
        let botOption = botOptions[rand - 1];

        if (botOption == args.option) 
            tie = true;
        else if ((botOption == 'rock' && args.option == 'paper') || (botOption == 'paper' && args.option == 'scissors') || (botOption == 'scissors' && args.option == 'rock'))
            userWin = true;

        if (userWin && !tie) {
            netGain = args.amount;
            user.setWins(user.wins + 1);
        } else if (!userWin && !tie) {
            netGain = args.amount * -1;
            user.setLosses(user.losses + 1);
        }

        user.setCurrency(user.currency + netGain);

        const embed = new MessageEmbed();

        embed.setTitle('Rock-Paper-Scissors result');
        embed.setColor(`#C4FAF8`);

        if (netGain > 0) {
            embed.setDescription(`**You won!** \nYou gained ${Math.abs(netGain)} coins.`);
        } else if (netGain < 0) {
            embed.setDescription(`**You lost :(** \nYou lost ${Math.abs(netGain)} coins.`);
        } else {
            embed.setDescription('**You tied!** \nNo change in your coin amount.');
        }

        embed.addField('Your move: ', args.option, false);
        embed.addField('Opponent\'s move: ', botOption, false);

        message.channel.send({ embed });

    }
}

module.exports = RPSCommand;