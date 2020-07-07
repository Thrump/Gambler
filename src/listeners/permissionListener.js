const { Listener } = require('discord-akairo');

class PermissionListener extends Listener {
    constructor() {
        super('permissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        })
    }


    exec(message, command, string, missing) {
        let values = '';
        missing.forEach(element => {
            values += element + ' ';
        });
        const embed = {
            title: `ERROR: Missing following Permissions on ${command}:`,
            color: `#C4FAF8`,
            description: values
        }

        return message.channel.send({ embed });
    }
}
module.exports = PermissionListener;