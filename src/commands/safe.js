const { Command } = require("discord-akairo");
const Booru = require("booru");
const { MessageAttachment } = require("discord.js");

class SafeCommand extends Command {
    constructor() {
        super('safe', {
            aliases: ['safe', 's'],
            cooldown: 4000,
            ratelimit: 1,
            args: [{
                id: 'tag',
                match: 'rest',
                default: ''
            }, {
                id: 'site',
                match: 'option',
                flag: 'site:',
                type: [
                    ['e9', 'e926'],
                    ['kn', 'konan', 'knet'],
                    ['sb', 'safe', 'safebooru'],
                    ['tb', 'tbib', 'big']
                ],
                default: 'tbib'
            }]
        })
    }

    async exec(message, args) {
        var posts = await Booru.search(args.site, args.tag.split(' '), { limit: 1, random: true });
        if (posts.length == 0) return message.channel.send('ERROR: No pictures exist with that tag.');
        while (posts.posts[0].rating != 's') posts = await Booru.search(args.site, args.tag.split(' '), { limit: 1, random: true });
        const attachment = new MessageAttachment(posts.first.fileUrl);
        try {
            message.channel.send(attachment);
        } catch (error) {
            message.channel.send('ERROR: Something broke in the backend; eventually will fix.\n Try the commmand again.');
        }

    }
}

module.exports = SafeCommand;