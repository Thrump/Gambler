const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

User = require('../models/user').User
client = require('../../main').client

const diceImgLinks = ["https://cdn.discordapp.com/emojis/730765874763399168.png?v=1", "https://cdn.discordapp.com/emojis/730765922062827535.png?v=1", "https://cdn.discordapp.com/emojis/730765974999138377.png?v=1", "https://cdn.discordapp.com/emojis/730765993210544128.png?v=1", "https://cdn.discordapp.com/emojis/730766014349836369.png?v=1", "https://cdn.discordapp.com/emojis/730766033723457587.png?v=1"];

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            ownerOnly: false,
            description: {
                desc: "Gamble your money by guessing whether the sum of two dice rolled will be lower than seven, higher than seven, or is seven.",
                format: "$roll (H/L/S) (amount)",
                example: "$roll H 50"
            },
            args: [{
                id: 'option',
                type: [
                    ['high', 'h'],
                    ['low', 'l'],
                    ['seven', 'sevens', 's']
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

        if (args.option != 'high' && args.option != 'low' && args.option != 'seven')
            return message.channel.send('ERROR: Invalid option provided for high/low/seven');

        if (user.currency < args.amount || (args.amount == 'all' && user.currency == 0))
            return message.channel.send('ERROR: Insufficient funds');

        if (args.amount == 0)
            return message.channel.send('ERROR: Cannot bet 0');

        let profit = 0;
        let d1 = Math.floor((Math.random() * 6) + 1);
        let d2 = Math.floor((Math.random() * 6) + 1);

        const canvas = createCanvas(200, 100);
        const ctx = canvas.getContext('2d');

        const d1Img = await loadImage(diceImgLinks[d1 - 1]);
        const d2Img = await loadImage(diceImgLinks[d2 - 1]);
        ctx.drawImage(d1Img, 0, 0, 100, canvas.height);
        ctx.drawImage(d2Img, 100, 0, 100, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'diceRoll.png');

        const embed = new MessageEmbed().attachFiles(attachment).setImage('attachment://diceRoll.png');

        embed.setTitle('Roll result');
        embed.setColor(`#C4FAF8`);

        let actualResult = '';

        if (d1 + d2 > 7) {
            actualResult = 'high';
        } else if (d1 + d2 < 7) {
            actualResult = 'low';
        } else if (d1 + d2 == 7) {
            actualResult = 'seven';
        }

        if (args.option === actualResult && actualResult != 'seven') {
            profit = args.amount;
            user.setWins(user.wins + 1);
        } else if (args.option === actualResult && actualResult == 'seven') {
            profit = 4 * args.amount;
            user.setWins(user.wins + 1);
        } else {
            profit = -1 * args.amount;
            user.setLosses(user.losses + 1);
        }

        user.setCurrency(user.currency + profit);

        let net = profit > 0 ? 'gained' : 'lost';

        embed.setDescription(`You ${net} ${Math.abs(profit)} coins.`);

        embed.addField('Your prediction: ', args.option, true);
        embed.addField('Actual result: ', `${parseInt(d1 + d2)} (${actualResult})`, true);

        message.channel.send({ embed });
    }
}

module.exports = RollCommand;