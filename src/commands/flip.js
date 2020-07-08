const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

User = require('../models/user').User
client = require('../../main').client

class FlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip'],
            ownerOnly: false,
            description: {
                desc: "Gamble your money with flipping a coin",
                format: "$flip (side) (amount)",
                example: "$flip head 100"
            },
            args: [{
                id: 'side',
                type: [
                    ['heads', 'h', 'he', 'hea', 'head'],
                    ['tails', 't', 'ta', 'tai', 'tail']
                ],
            }, {
                id: 'amount',
                default: 0
            }],
            category: 'Money'
        });
    }

    exec(message, args) {
        const embed = new MessageEmbed()
            .setColor('#C4FAF8');
        if (args.length < 2) {
            embed.setDescription('ERROR: %flip [side] [amount]');
            return message.channel.send(embed);
        }
        if (args.amount < 1 || isNaN(args.amount)) {
            embed.setDescription('ERROR: Amount must be higher than 0');
            return message.channel.send(embed);
        }
        if (args.side != 'heads' && args.side != 'tails') {
            embed.setDescription('ERROR: Must be heads(h) or tails(t)');
            return message.channel.send(embed);
        }
        let user = new User(message.author.id);
        user.update().then((u) => {
            if (u.currency < args.amount || ((args.amount == 'all' || args.amount == 'half') && u.currency == 0))
                return message.reply('ERROR: Insufficient funds');
            const randomNumber = Math.round(Math.random());
            const landed = randomNumber ? "tails" : "heads";


            const value = args.amount == 'all' ? u.currency : args.amount == 'half' ? u.currency / 2 : Math.floor(args.amount);
            u.setCurrency(u.currency - parseInt(value));
            if (args.side == 'heads') {
                if (randomNumber == 0) {
                    embed.setDescription(`You won ${parseInt(value) * 2} coins`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                    u.setWins(u.wins + 1);
                } else {
                    embed.setDescription('Sorry, it landed on tails :(');
                    u.setLosses(u.losses + 1);
                }
            } else {
                if (randomNumber == 1) {
                    embed.setDescription(`You won ${parseInt(value) * 2} coins`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                    u.setWins(u.wins + 1);
                } else {
                    embed.setDescription('Sorry, it landed on heads :(');
                    u.setLosses(u.losses + 1);
                }
            }
            message.channel.send(embed);
        })
    }
}

module.exports = FlipCommand;