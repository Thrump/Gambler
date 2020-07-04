const { Listener } = require('discord-akairo');
User = require('../models/user').User;

class PassiveMoneyListener extends Listener {
    constructor() {
        super('passiveMoney', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        const chance = Math.floor(Math.random() * 100);
        if (chance <= 25) {
            let user = await new User(message.author.id).update();
            user.setCurrency(user.currency + 100);
        }
    }
}

module.exports = PassiveMoneyListener;