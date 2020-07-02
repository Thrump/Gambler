const { Command } = require("discord-akairo");
const fetch = require('node-fetch');

class WeatherCommand extends Command {
    constructor() {
        super('weather', {
            aliases: ['weather'],
            ownerOnly: true,
            category: 'development',
            description: {
                message: "The weather"
            },
            args: [{
                id: 'arg1',
                default: 0
            }]
        });
    }

    async exec(message, args) {
        var json;
        if(args.arg1 > 0 && args.arg1 < 100000){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${args.arg1}&appid=${process.env.WET}`);
            json = await response.json();

        } 
        else if(/\d/.test(args.arg1)){
            //string has number   
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${args.arg1}&appid=${process.env.WET}`);
            //put it in the zip and make it fail
            json = await response.json();
        } 
        else {
            //is some string with no numbers    
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args.arg1}&appid=${process.env.WET}`);
            json = await response.json();
        }
        //code 404 or 400
        if(json.cod == 404 || json.cod == 400){
            message.channel.send(`Invalid entry, please enter Zip Code or City Name`);
        } else {
            var temp = ((json.main.temp - 273.15)*1.8+32).toFixed(0);
            var high = ((json.main.temp_max - 273.15)*1.8+32).toFixed(0);
            var low = ((json.main.temp_min - 273.15)*1.8+32).toFixed(0);
            message.channel.send(`Current Temperature in ${json.name}: ${temp}F\nCondition: ${json.weather[0].description}\nHigh: ${high}F\nLow: ${low}F`);
        }
    }
}

module.exports = WeatherCommand;