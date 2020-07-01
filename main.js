//Dotnev connection
require('dotenv').config();
const config = require('./config.json');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
// const { Guild } = require('./src/models/guild').Guild;






class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.ownerId,
        }, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: async msg => {
                let guild = await new Guild(msg.guild.id).update();
                return guild.prefix;
            }
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        })

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();

    }
}

const client = new MyClient();
client.login(process.env.TOKEN);