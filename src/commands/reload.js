module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  execute(message, args) {
    if (message.author.id != require('../config.json').ownerId)
      return message.channel.send('Access Denied');
    if (!args.length)
      return message.channel.send('ERROR; no commands were passed');

    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.include(commandName)
      );

    if (!command) return message.channel.send("That command doesn't exist");

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send('Command was reloaded!');
    } catch (error) {
      console.log(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
  },
};
