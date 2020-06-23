const { Command } = require("discord-akairo");
const Booru = require("booru");
const { MessageAttachment } = require("discord.js");

class NsfwCommand extends Command {
    constructor() {
        super('nsfw', {
            aliases: ['nsfw', 'n'],
            cooldown: 3000,
            ratelimit: 2,
            args: [{
                id: 'tag',
                default: '',
                match: 'rest'
            }, {
                id: 'site',
                match: 'option',
                flag: 'site:',
                type: [
                    ['e6', 'e621'],
                    ['hh', 'hypnohub'],
                    ['db', 'dan', 'danbooru'],
                    ['kc', 'knoac', 'kcom'],
                    ['yd', 'yand', 'yandere'],
                    ['gb', 'gel', 'gelbooru'],
                    ['r34', 'rule34'],
                    ['xb', 'xbooru'],
                    ['lb', 'lol', 'loli', 'lolibooru'],
                    ['pa', 'paheal'],
                    ['dp', 'derp', 'derpi', 'derpibooru'],
                    ['fb', 'furrybooru'],
                    ['rb', 'realbooru']
                ],
                default: 'danbooru'
            }]
        })
    }

    async exec(message, args) {
        if (!message.channel.nsfw) return message.channel.send("ERROR: Channel must be marked nsfw to use this command.");
        const posts = await Booru.search(args.site, [args.tag], { limit: 1, random: true });
        if (posts.length == 0) return message.channel.send('ERROR: No pictures exist with that tag.');
        const attachment = new MessageAttachment(posts.first.fileUrl);
        message.channel.send(attachment);
    }
}

module.exports = NsfwCommand;