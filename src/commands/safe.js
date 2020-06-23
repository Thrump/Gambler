const { Command } = require("discord-akairo");
const Booru = require("booru");
const { MessageAttachment } = require("discord.js");

class PictureCommand extends Command {
    constructor() {
        super('safe', {
            aliases: ['safe'],
            cooldown: 3000,
            ratelimit: 2,
            args: [{
                id: 'tag',
                default: ''

            }]
        })
    }

    async exec(message, args) {
        const posts = await Booru.search('safebooru', [args.tag], { limit: 1, random: true });
        console.log(posts);
        if (posts.length == 0) return message.channel.send('ERROR: No pictures exist with that tag.');
        const attachment = new MessageAttachment(posts.first.fileUrl);
        message.channel.send(attachment);
    }
}

module.exports = PictureCommand;