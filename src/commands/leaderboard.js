const { Command } = require('discord-akairo');
Guild = require(`../models/guild`).Guild;


User = require('../models/user').User;



class LeaderboardCommand extends Command {
    constructor() {
        super('leaderboard', {
            aliases: ['lb', 'leaderboard'],
            channel: 'guild',
            args: [{
                    id: 'rank',
                    match: 'flag',
                    flag: '--r'
                },
                {
                    id: 'page',
                    type: 'integer',
                    default: 1
                }
            ],
            category: 'Money',
            description: {
                desc: `See who at the top in your guild!`,
                format: `$leaderboard {--r} {page #}`,
                example: `$leaderboard 2`
            }
        })
    }

    async exec(message, args) {
        const list = await User.getUsers();
        const guildMemberId = message.guild.members.cache.map(guildMember => guildMember.user.id);
        let guildList = list.filter(object => guildMemberId.includes(object.user_id));
        let type;
        if (args.rank) {
            guildList.sort(function(a, b) {
                return b.rank - a.rank;
            })
            type = 'rank';
        } else {
            guildList.sort(function(a, b) {
                return b.currency - a.currency;
            })
            type = 'currency';
        }
        const pages = Math.ceil(guildList.length / 10);
        const paginatedItems = guildList.slice((args.page - 1) * 10).slice(0, 10);
        const embed = {
            color: `#C4FAF8`,
            title: `LEADERBOARD - ${type == 'rank' ? 'RANKS' : 'CURRENCY'} - Page ${args.page}`,
            fields: [],

        }
        if (paginatedItems.length == 0) {
            embed.description = `No Data on this page`;
        } else {
            embed.footer = {
                text: `${args.page} out of ${pages}`
            }
            const guild = message.guild.members.cache;
            paginatedItems.forEach((element, index) => {
                const displayName = guild.get(element.user_id).user.tag;
                if ((type == "rank" && element.rank != 1) || (type == "currency" && element.currency != 0)) {
                    embed.fields.push({
                        name: `${args.page == 1 || index == 9 ? '' : args.page - 1}${index == 9 && args.page != 1 ? args.page * 10 : index + 1}. ${displayName}`,
                        value: `${type == 'rank' ? 'Rank ' + element.rank : element.currency + ' <:coin:754568123201618011>'}`,
                    })
                }

            });
        }
        message.channel.send({ embed });
    }

}

module.exports = LeaderboardCommand;