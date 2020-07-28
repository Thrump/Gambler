const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

User = require('../models/user').User
client = require('../../main').client

const coinEmoji = "<:coins:729903134536630314>";

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

        const embed = new MessageEmbed();
        embed.setColor(`#C4FAF8`);

        if (args.option == null) {
            embed.setTitle('ERROR: Invalid argument provided for high/low/seven option');
            return message.channel.send({ embed })
        }

        if (user.currency < args.amount || (args.amount == 'all' && user.currency == 0)) {
            embed.setTitle('ERROR: Insufficient funds');
            return message.channel.send({ embed });
        }

        if (args.amount == 0) {
            embed.setTitle('ERROR: Cannot bet 0');
            return message.channel.send({ embed });
        }

        user.setCurrency(user.currency - args.amount); // User's bet is subtracted from current amount

        embed.setTitle('Roll Result');

        let d1 = Math.floor((Math.random() * 6) + 1);
        let d2 = Math.floor((Math.random() * 6) + 1);

        const canvas = createCanvas(200, 100);
        const ctx = canvas.getContext('2d');

        const d1Img = await loadImage(diceImgLinks[d1 - 1]);
        const d2Img = await loadImage(diceImgLinks[d2 - 1]);
        ctx.drawImage(d1Img, 0, 0, 100, canvas.height);
        ctx.drawImage(d2Img, 100, 0, 100, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'diceRoll.png');

        embed.attachFiles(attachment).setImage('attachment://diceRoll.png');

        let actualResult = '';
        if (d1 + d2 > 7) {
            actualResult = 'high';
        } else if (d1 + d2 < 7) {
            actualResult = 'low';
        } else if (d1 + d2 == 7) {
            actualResult = 'seven';
        }

        let profit = 0;
        if (args.option === actualResult && actualResult != 'seven') {
            user.setCurrency(user.currency + args.amount * 2); // User wins (but prediction is not 7); gains twice what they bet
            user.setWins(user.wins + 1);
            embed.setDescription(`You gained ${parseInt(args.amount)} ${coinEmoji}`);
        } else if (args.option === actualResult && actualResult == 'seven') {
            user.setCurrency(user.currency + args.amount * 5); // User wins (prediction is 7); net gains 4x their bet
            user.setWins(user.wins + 1);
            embed.setDescription(`You gained ${parseInt(args.amount * 4)} ${coinEmoji}`);
        } else {
            // User gains nothing back.
            user.setLosses(user.losses + 1);
            embed.setDescription(`You lost ${parseInt(args.amount)} ${coinEmoji}`);
        }

        embed.addField('Your prediction: ', args.option, true);
        embed.addField('Actual result: ', `${parseInt(d1 + d2)} (${actualResult})`, true);

        message.channel.send({ embed });
    }
}

module.exports = RollCommand;