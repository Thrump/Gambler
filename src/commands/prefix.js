const { Command } = require('discord-akairo');
Guild = require('../models/guild').Guild

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix', 'pre'],
            description: {
                desc: "Change the prefix of the server",
                format: "$prefix (symbol)",
                example: "$prefix $$"
            },
            args: [{
                    id: 'prefix',
                    default: 0
                },
                {
                    id: 'reset',
                    match: 'flag',
                    flag: '--reset'
                }
            ],
            category: 'Utility',
            userPermissions: ['ADMINISTRATOR']
        })
    }

    async exec(message, args) {
        let guild = await new Guild(message.guild.id).update();
        if (args.reset) {
            guild.setPrefix('$');
            return message.channel.send('Server\'s prefix has been reset to $');
        }
        if (args.prefix == 0) return message.reply('ERROR: Must supply a prefix');
        guild.setPrefix(args.prefix);
        return message.channel.send(`Server\'s prefix has been changed to ${args.prefix}`);
    }
}

module.exports = PrefixCommand;