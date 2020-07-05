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
                type: 'number',
                default: 0
            }],
            category: 'Money'
        });
    }

    exec(message, args) {

        if (args.length < 2) return message.reply('ERROR: %flip [side] [amount]');
        if (args.amount == 0) return message.reply('ERROR: Amount must be higher than 0');
        if (args.side != 'heads' && args.side != 'tails')
            return message.reply('ERROR: Must be heads(h) or tails(t)');
        let user = new User(message.author.id);
        user.update().then((u) => {
            if (u.currency < args.amount || (args.amount == 'all' && u.currency == 0))
                return message.reply('ERROR: Insufficient funds');
            const randomNumber = Math.round(Math.random());
            const landed = randomNumber ? "tails" : "heads";

            const embed = new MessageEmbed()
                .setColor('#C4FAF8')
                .setTitle(`Flip: ${landed}`);
            const value = args.amount == 'all' ? u.currency : args.amount;
            if (args.side == 'heads') {
                if (randomNumber == 0) {
                    embed.setDescription(`You won ${parseInt(value) * 2} coins`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                    u.setWins(u.wins + 1);
                } else {
                    embed.setDescription('Sorry, it landed on tails :(');
                    u.setCurrency(u.currency - parseInt(value));
                    u.setLosses(u.losses + 1);
                }
            } else {
                if (randomNumber == 1) {
                    embed.setDescription(`You won ${parseInt(value) * 2} coins`);
                    u.setCurrency(u.currency + 2 * parseInt(value));
                    u.setWins(u.wins + 1);
                    u.setLosses(u.losses + 1);
                } else {
                    embed.setDescription('Sorry, it landed on heads :(');
                    u.setCurrency(u.currency - parseInt(value));
                    u.setLosses(u.losses + 1);
                }
            }
            message.channel.send(embed);
        })
    }
}

module.exports = FlipCommand;