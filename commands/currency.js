User = require('../models/user').User
module.exports = {
    name: 'currency',
    description: 'Testing User model and currency',
    execute(message, args) {
        let user = new User(message.author.id);
        user.update().then((u) => {
            console.log(u);
            message.channel.send(`Your current currency: ${u.currency}`);
        })
    }

}