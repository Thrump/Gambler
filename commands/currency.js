User = require('../models/user').User
module.exports = {
    name: 'currency',
    description: 'Testing User model and currency',
    execute(message, args) {
        if (message.author.id != require('../config.json').ownerId)
            return message.channel.send('Access Denied');
        let user = new User(message.author.id);
        setTimeout(function() {
            user.setCurrency(user.currency + 1);
            message.channel.send(`Your current currency: ${user.currency}`);
        }, 100);
    }

}