const { Command } = require('discord-akairo');


class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give'],
            ownerOnly: false,
            channel: 'guild',
            args: [{
                id: 'arg1',
                default: 0
            }]
        })
    }

    exec(message, args) {
        if (args.args1 == 0)
            return message.channel.send('No amount was stated');
        let user = new User(message.author.id);
        user.update().then((u) => {
            u.setCurrency(u.currency + parseInt(args.arg1));
            return message.reply(`Currency updated to: ${u.currency}`);
        })
    }
}
module.exports = GiveCommand;