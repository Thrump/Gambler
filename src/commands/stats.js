const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
User = require('../models/user').User;

const coinEmoji = "<:coins:729903134536630314>";
class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            channel: 'guild',
            args: [{
                id: 'user',
                type: 'member'
            }],
            category: 'Info',
            description: {
                desc: "Shows the stats of a user",
                format: "$stats {@user}",
                example: '$stats @☆彡#1001'
            }
        })
    }

    async exec(message, args) {
        let embed = new MessageEmbed()
            .setColor(`#C4FAF8`);
        if (args.user === undefined) {
            embed.setTitle('ERROR: No user was found');
        } else {
            const account = args.user === null ? message.member : args.user;
            const accountInfo = await new User(account.id).update();
            embed.setAuthor(`${account.displayName}'s Page`, null, account.user.displayAvatarURL())
                .setThumbnail(account.user.displayAvatarURL())
                .addField('=====Currency=====', `${accountInfo.currency} ${coinEmoji}`, false)
                .addField('====Current Rank====', `${accountInfo.rank}`, false)
                .addField('Amount for Next Rank', `${100000 + 10000 * (accountInfo.rank) + 10000 * (Math.floor(accountInfo.rank/10))} ${coinEmoji}`, false)
                .addField('====Game Stats====', `${accountInfo.wins}W | ${accountInfo.losses}L`, false)
                .addField('=Time Joined Server==', `${account.joinedAt.getMonth() + 1}/${account.joinedAt.getDate()}/${account.joinedAt.getFullYear()}`, false)
                .addField('=Time Joined Discord=', `${account.user.createdAt.getMonth() + 1}/${account.user.createdAt.getDate()}/${account.user.createdAt.getFullYear()}`, false);
        }
        message.channel.send(embed);
    }
}

module.exports = StatsCommand;