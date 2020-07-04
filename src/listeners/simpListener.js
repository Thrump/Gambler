const { Listener } = require('discord-akairo');
Guild = require('../models/guild').Guild

class SimpListener extends Listener {
    constructor() {
        super('simp', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        let guild = new Guild(message.guild.id);
        //console.log(guild);
        if (guild.simpListener == false || message.author.bot) {
            return;
        }

        if ((Math.floor(Math.random() * 100) + 1) > 50) return;
        if (message.content.toLowerCase().includes("simp") || message.content.toLowerCase().includes("miss") ||
            message.content.toLowerCase().includes("simping")) {
            message.channel.send("🎵 I just need some dick 🎵\n🎵 I just need some love 🎵");
        }
    }
}

module.exports = SimpListener;