const { Command } = require('discord-akairo');
Guild = require('../models/guild').Guild

class EnableSimpListener extends Command {

    constructor() {
        super('simp', {
            aliases: ['simp'],
            description: {
                desc: "Enable or disable this server's Simp Listener",
                format: "$simp (flag)",
                example: "$simp --enable"
            },
            args: [{
                    id: 'enable',
                    match: 'flag',
                    flag: ['--enable', '--e']
                },
                {
                    id: 'disable',
                    match: 'flag',
                    flag: ['--disable', '--d']
                },
                {
                    id: 'status',
                    match: 'flag',
                    flag: ['--status', '--stat']
                }
            ],
            category: 'Utility',
            userPermissions: ['ADMINISTRATOR']
        })
    }

    async exec(message, args) {
        let guild = await new Guild(message.guild.id).update();
        
        if (args.enable) {
            if (guild.simpListener == 1) {
                return message.channel.send('Simp listener is already enabled.');
            }
            guild.setSimpListener(1);
            return message.channel.send('Simp listener has been enabled.');
        } else if (args.disable) {
            if (guild.simpListener == 0) {
                return message.channel.send('Simp listener is already disabled.');
            }
            guild.setSimpListener(0);
            return message.channel.send('Simp listener has been disabled.');
        } else if (args.status){
            if (guild.simpListener == 0) {
                return message.channel.send('Status: Simp listener is disabled.');
            } else if (guild.simpListener == 1) {
                return message.channel.send('Status: Simp listener is enabled.');
            }
        } else {
            return message.channel.send('Please provide a flag.');
        }
        
    }

}

module.exports = EnableSimpListener;