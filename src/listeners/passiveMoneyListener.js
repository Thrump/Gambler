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
        if (chance <= 10) {
            let user = await new User(message.author.id).update();
            user.setCurrency(user.currency + 100 + 10(user.rank - 1));
        }
    }
}

module.exports = PassiveMoneyListener;