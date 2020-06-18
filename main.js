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


// const Discord = require('discord.js');
// const client = new Discord.Client();

// module.exports.client = client;

// client.commands = new Discord.Collection();
// const commandFiles = fs
//     .readdirSync('./commands')
//     .filter((file) => file.endsWith('.js'));

// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
// }

// client.once('ready', () => {
//     console.log('Bot is online!');
// });

// client.on('message', (message) => {
//     if (!message.content.startsWith(config.prefix) && !message.author.bot) {
//         // drop portion
//         // message.reply('test message');
//         return;
//     } else if (message.author.bot) return;
//     const args = message.content.slice(config.prefix.length).split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     if (!client.commands.has(commandName)) return;
//     const command = client.commands.get(commandName);

//     try {
//         command.execute(message, args);
//     } catch (error) {
//         console.log(error);
//         message.reply('there was an error trying to execute that command!');
//     }
// });

// client.login(process.env.TOKEN);