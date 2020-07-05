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

        const embed = {
            color: `#C4FAF8`
        };

        if (args.enable) {

            if (guild.simpListener == 1) {
                embed.title = 'Simp listener is already enabled.';
            } else {
                embed.title = 'Simp listener is now enabled.';
                guild.setSimpListener(1);
            }
            
            return message.channel.send( {embed} );
        } 
        
        if (args.disable) {

            if (guild.simpListener == 0) {
                embed.title = 'Simp listener is already disabled.';
            } else {
                embed.title = 'Simp listener is now disabled.';
                guild.setSimpListener(0);
            }
            
            return message.channel.send( {embed} );
        } 
        
        // Display status by default if no flag is provided.
        if (guild.simpListener == 0) {
            embed.title = 'Simp listener is enabled.';
        } else if (guild.simpListener == 1) {
            embed.title = 'Simp listener is disabled.';
        }

        return message.channel.send( {embed} );
    }

}

module.exports = EnableSimpListener;