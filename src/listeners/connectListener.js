const { Listener } = require('discord-akairo');

class ConnectListener extends Listener {
    constructor() {
        super('connect', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        if (message.content.toLowerCase().startsWith("cf") && message.content.length == 4){
            //current form is "cf #"
        }
    }
}

module.exports = ConnectListener;