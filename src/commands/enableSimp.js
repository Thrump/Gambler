const { Command } = require('discord-akairo');
Guild = require('../models/guild').Guild

class EnableSimpListener extends Command {

    constructor() {
        super('simp', {
            aliases: ['simp'],
            description: {
                desc: "Enable or disable this server's Simp Listener",
                format: "$enable-simp (true/false)",
                example: "$enable-simp true"
            },
            args: [{
                    id: 'enable',
                    match: 'flag',
                    flag: '--enable'
                },
                {
                    id: 'disable',
                    match: 'flag',
                    flag: '--disable'
                },
                {
                    id: 'status',
                    match: 'flag',
                    flag: '--status'
                }
            ],
            category: 'Utility',
            userPermissions: ['ADMINISTRATOR']
        })
    }

    async exec(message, args) {
        let guild = await new Guild(message.guild.id).update();
        if (args.enable) {
            //enable listener
            guild.setSimpListener(1);
            return message.channel.send('Simp listener is enabled');
        } else if (args.disable) {
            //disable listener
            guild.setSimpListener(0);
            return message.channel.send('Simp listener is disabled');
        } else if (args.status){
            //probably make a function to get the simp_listener value from the database
        } else {
            return message.channel.send('Please provide a flag.');
        }
        
    }

}

module.exports = EnableSimpListener;