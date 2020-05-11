User = require('../models/user').User
module.exports = {
    name: 'currency',
    description: 'Testing User model and currency',
    execute(message, args) {
        if (message.author.id != require('../config.json').ownerId)
            return message.channel.send('Access Denied');
        let user = new User(message.author.id);
        user.update().then((u) => {
            u.setCurrency(u.currency + 1);
            message.channel.send(`Your current currency: ${u.currency}`);
        })
    }

}