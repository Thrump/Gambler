const { Command } = require("discord-akairo");


class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            ownerOnly: true,
            category: 'development',
            description: {
                message: "test test test"
            }
        })
    }

    exec(message) {
        // const command = this.handler.modules;
        // console.log(command);
        // command.forEach((key, value) => {
        //     console.log(key.description.message);
        // });
        // return message.channel.send("Test Complete. Check Logs");
    }
}

module.exports = TestCommand;