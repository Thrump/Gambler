const { Listener } = require('discord-akairo');

class SimpListener extends Listener {
    constructor() {
        super('simp', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        if ((Math.floor(Math.random() * 100) + 1) > 50) return;
        if (message.content.toLowerCase().includes("simp") || message.content.toLowerCase().includes("miss") ||
            message.content.toLowerCase().includes("simping")) {
            message.channel.send("🎵 I just need some dick 🎵\n🎵 I just need some love 🎵");
        }
    }
}

module.exports = SimpListener;