module.exports = {
  name: 'restart',
  description: 'Restarts the bot',
  execute(message, args) {
    //If PM2 is running, it will restart the procress
    //otherwise the program will stop
    if (message.author.id != require('../config.json').ownerId) return;
    message.channel.send('Restarting bot');
    console.log('Bot is restarting');
    setTimeout(function () {
      process.exit();
    }, 100);
  },
};
