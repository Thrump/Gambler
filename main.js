//Dotnev connection
require('dotenv').config();
const config = require('./config.json');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

//Database setup
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: process.env.DATABASE
    }
});

module.exports.knex = knex;



class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.ownerId,
        }, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: config.prefix
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