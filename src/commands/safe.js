const { Command } = require("discord-akairo");
const Booru = require("booru");
const { MessageAttachment } = require("discord.js");

class SafeCommand extends Command {
    constructor() {
        super('sfw', {
            aliases: ['sfw', 's'],
            cooldown: 4000,
            ratelimit: 1,
            description: {
                desc: "Posts sfw pictures from booru websites",
                format: "$sfw {[tags]} {--site}",
                example: "$sfw --sb butt",
                options: {
                    site: ['e926',
                        'knet',
                        'safe',
                        'tbib',
                    ]
                }
            },
            args: [{
                id: 'tag',
                match: 'rest',
                default: ''
            }, {
                id: 'site',
                match: 'option',
                flag: '--',
                type: [
                    ['e9', 'e926'],
                    ['kn', 'konan', 'knet'],
                    ['sb', 'safe', 'safebooru'],
                    ['tb', 'tbib', 'big']
                ],
                default: 'kn'
            }, {
                id: 'hk',
                match: 'flag',
                flag: '-hk'
            }],
            typing: true,
            category: 'Picture'
        })
    }

    async exec(message, args) {
        const tags = args.hk ? ['haikyuu!!', 'yaoi'] : args.tag.split(' ');
        var posts = await Booru.search(args.site, tags, { limit: 1, random: true });
        if (posts.length == 0) return message.channel.send('ERROR: No pictures exist with that tag.');
        while (posts.posts[0].rating != 's') posts = await Booru.search(args.site, tags, { limit: 1, random: true });
        const attachment = posts.first.fileUrl.endsWith('.webm') ? posts.first.fileUrl : new MessageAttachment(posts.first.fileUrl);
        try {
            message.channel.send(attachment);
        } catch (error) {
            message.channel.send('ERROR: Something broke in the backend; eventually will fix.\n Try the commmand again.');
        }

    }
}

module.exports = SafeCommand;