const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
User = require('../models/user').User;

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
                .addField('=====Currency=====', `${accountInfo.currency}`, false)
                .addField('=Time Joined Server==', `${account.joinedAt.getMonth() + 1}/${account.joinedAt.getDate()}/${account.joinedAt.getFullYear()}`, false)
                .addField('=Time Joined Discord=', `${account.user.createdAt.getMonth() + 1}/${account.user.createdAt.getDate()}/${account.user.createdAt.getFullYear()}`, false);
        }
        message.channel.send(embed);
    }
}

module.exports = StatsCommand;