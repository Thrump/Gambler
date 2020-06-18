User = require('../models/user').User

module.exports = {
    name: 'give',
    description: 'Owner power of giving money',
    execute(message, args) {
        if (args.length == 0)
            return message.channel.send('No amount was stated');
        let user = new User(message.author.id);
        user.update().then((u) => {
            u.setCurrency(u.currency + parseInt(args[0]));
            return message.reply(`Currency updated to: ${u.currency}`);
        })
    }
}