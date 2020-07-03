const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            category: 'Utility',
            description: {
                desc: 'Provides information on categories and commands',
                format: '$help {catergory | command}',
                example: '$help picture'
            },
            args: [{
                id: 'option',
                default: ''
            }]
        })
    }

    sendHelp() {
        const categories = this.handler.categories;
        const embed = {
            title: 'Help Categories',
            fields: [],
            description: 'Find a command in a category!'
        }

        categories.forEach((key, value) => {
            if (key != "development")
                embed.fields.push({
                    name: key,
                    value: `\`$help ${key}\``,
                    inline: false
                });
        })
        return { embed };
    }

    sendCommand(command) {
        if (command.catergoryID == 'development') return "ERROR: Owner Privelege Command";
        const embed = {
                title: `${command.id} Command`,
                description: command.description.desc,
                footer: {
                    text: `{}: Optional Parameter. []: Multiple Parameters. (): Required Parameter.`
                },
                fields: [{
                    name: 'Format',
                    value: `\`\`\`${command.description.format}\`\`\``
                }, {
                    name: `Example`,
                    value: `\`\`\`${command.description.example}\`\`\``
                }],
            }
            // if (command.description.hasOwnProperty('options')) {
            //     const optionsArray = command.description.options.map(x => {
            //         return {

        //         }
        //     })
        // }

        return { embed };
    }

    sendCatergory(category) {
        const embed = {
            title: `${category.id} Commands`,
            fields: []
        }

        category.forEach((command) => {
            embed.fields.push({
                name: command.id,
                value: `\`$help ${command.id.toLowerCase()}\``,
                inline: true
            })
        })

        return { embed }
    }


    exec(message, args) {
        if (args.option.length == 0) {
            return message.channel.send(this.sendHelp());
        } else {
            var option = this.handler.findCategory(args.option);
            if (option) {
                return message.channel.send(this.sendCatergory(option));
            } else if (this.handler.findCommand(args.option)) {
                option = this.handler.findCommand(args.option);
                return message.channel.send(this.sendCommand(option));
            } else {
                return message.channel.send('ERROR: That category or command doesn\'t exist.');
            }
        }

    }


}

module.exports = HelpCommand;