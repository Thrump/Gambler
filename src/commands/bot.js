const { Command } = require('discord-akairo');
const { Guild } = require('../models/guild');

class BotCommand extends Command {
    constructor() {
        super('bot', {
            aliases: ['bot', 'b'],
            category: 'Info',
            description: {
                desc: "Shows information about the bot",
                format: "$bot",
                example: "$bot"
            }
        })
    }

    async exec(message) {
        const guild = await new Guild(message.guild.id).update();
        let time = process.uptime();
        let day = Math.floor(time / 86400);
        time = time % 86400;
        let hour = Math.floor(time / 3600);
        time = time % 3600;
        let min = Math.floor(time / 60);
        time = time % 60;
        let sec = Math.floor(time);
        let embed = {
            color: '#C4FAF8',
            author: {
                name: 'Bot Info',
                icon_url: null,
                url: this.client.user.displayAvatarURL()
            },
            thumbnail: {
                url: this.client.user.displayAvatarURL()
            },
            footer: {
                text: `Type ${guild.prefix}help for list of commands`
            },
            fields: [{
                    name: 'Owner',
                    value: '`☆彡#1001`',
                    inline: true
                },
                {
                    name: 'Contributors',
                    value: '`Alexc99xd#4264\nhopiakween#5638`',
                    inline: true
                },
                {
                    name: 'Bot Uptime',
                    value: `${day} Ds, ${hour} Hs, ${min} Ms, ${sec} Ss`,
                    inline: false
                },
                {
                    name: '# Servers In',
                    value: `${this.client.guilds.cache.array().length} servers`,
                    inline: true
                },
                {
                    name: `Current Server's Prefix`,
                    value: guild.prefix,
                    inline: true
                },
                {
                    name: 'Invite Bot To Your Server',
                    value: `[Link](https://discord.com/oauth2/authorize?client_id=706729347880321025&scope=bot)`
                }
            ]

        };
        message.channel.send({ embed });
    }
}

module.exports = BotCommand;