const { Listener } = require('discord-akairo');

class PermissionListener extends Listener {
    constructor() {
        super('permissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        })
    }


    exec(message, command, string, missing) {
        const embed = {
            title: `ERROR: Missing following Permissions on ${command} `,
            color: `#C4FAF8`,
            description: () => {
                return missing.reduce((acc, cur) => {
                    acc.concat(cur, ' ');
                })
            }
        }

        return message.channel.send({ embed });
    }
}
module.exports = PermissionListener;