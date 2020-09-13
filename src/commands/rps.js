const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

User = require('../models/user').User
client = require('../../main').client

const coinEmoji = "<:coin:754568123201618011>";

const botOptions = ['rock', 'paper', 'scissors'];
const imgLinks = ["https://cdn.discordapp.com/emojis/737275263129354251.png?v=1", "https://cdn.discordapp.com/emojis/737288503490117713.png?v=1", "https://cdn.discordapp.com/emojis/737289554137972806.png?v=1"];

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
                default: 0
            }],
            category: 'Money'
        });
    }

    async exec(message, args) {
        let user = await new User(message.author.id).update();

        const embed = new MessageEmbed();
        embed.setColor(`#C4FAF8`);

        if (args.amount < 1 || (isNaN(args.amount) && (args.amount != 'all' && args.amount != 'half'))) {
            embed.setDescription('ERROR: Amount must be higher than 0');
            return message.channel.send(embed);
        }

        if (args.option != 'rock' && args.option != 'paper' && args.option != 'scissors') {
            embed.setDescription('ERROR: Invalid argument provided for rock/paper/scissors option');
            return message.channel.send({ embed });
        }

        if (user.currency < args.amount || (args.amount == 'all' && user.currency == 0)) {
            embed.setDescription('ERROR: Insufficient funds');
            return message.channel.send({ embed });
        }

        let userBetAmt = 0;

        if (args.amount == 'all') {
            userBetAmt = user.currency;
        } else if (args.amount == 'half') {
            userBetAmt = Math.floor(user.currency / 2);
        } else {
            userBetAmt = parseInt(args.amount);
        }

        user.setCurrency(user.currency - userBetAmt); // User's bet is subtracted from their current amount

        let rand = Math.floor((Math.random() * 3) + 1);
        let botOption = botOptions[rand - 1];

        const canvas = createCanvas(200, 100);
        const ctx = canvas.getContext('2d');

        const botImg = await loadImage(imgLinks[rand - 1]);
        const userImg = await loadImage(imgLinks[botOptions.indexOf(args.option)]);

        ctx.drawImage(botImg, 0, 0, 100, canvas.height);
        ctx.drawImage(userImg, 100, 0, 100, canvas.height);

        embed.setTitle('Rock-Paper-Scissors Result');
        const attachment = new MessageAttachment(canvas.toBuffer(), 'rps.png');
        embed.attachFiles(attachment).setImage('attachment://rps.png');

<<<<<<< HEAD
        embed.addField('Opponent: ', botOption, true);        
=======
        embed.addField('Opponent: ', botOption, true);
>>>>>>> c0c37b60ead7e4dd7c229e62544d674d2f0de827
        embed.addField('You: ', args.option, true);

        if (botOption == args.option) {
            user.setCurrency(user.currency + userBetAmt); // User ties, gains back what they bet
            embed.setDescription(`**You tied!** \nNo change to your ${coinEmoji}`);
        } else if ((botOption == 'rock' && args.option == 'paper') || (botOption == 'paper' && args.option == 'scissors') || (botOption == 'scissors' && args.option == 'rock')) {
            user.setCurrency(user.currency + userBetAmt * 2); // User wins, gains double what they bet
            user.setWins(user.wins + 1);
            embed.setDescription(`**You won!** \nYou gained ${userBetAmt} ${coinEmoji}`);
        } else {
            // User loses, gains no money back
            user.setLosses(user.losses + 1);
            embed.setDescription(`**You lost :(** \nYou lost ${userBetAmt} ${coinEmoji}`);
        }

        message.channel.send({ embed });

    }
}

module.exports = RPSCommand;