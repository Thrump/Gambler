const { Command } = require("discord-akairo");
//ConnectFourLogic = require('../util/connectFourLogic').ConnectFourLogic

class ConnectCommand extends Command {
    constructor() {
        super('connect', {
            aliases: ['connect'],
            ownerOnly: true,
            category: 'development',
            description: {
                desc: "Plays Connect four with another person!",
                format: "$connect",
                example: "$connect"
            },
        });
    }

    async exec(message) {
        //user 1 is the person who starts
        let userOne = message.author;
        let userTwo;
        const embed = {
            title: `REACT TO JOIN ${message.author.username}'s GAME OF CONNECT FOUR`,
        }
        let sent = await message.channel.send({embed});
        sent.react('👍');

        //filter and collection of one user (not initiator or bot)
        const filter = (reaction, user) => {
            //return reaction.emoji.name === '👍' && user.id !== message.author.id && user.id !== sent.author.id;
            return reaction.emoji.name === '👍'  && user.id !== sent.author.id; //for testing myself purposes
        };
        const collector = sent.createReactionCollector(filter, { maxUsers: 1 , time: 10000 });
        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            userTwo = user;
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            console.log(userTwo);
            let game = new ConnectFourLogic();
            this.startGame(userOne, userTwo, sent, game);
        });
        
    }

    boardToString(game){
        var gameString = "";
        //row then column
        for(var i = 0; i < 6; i++){
            for(var j = 0; j < 7; j++){
                if(game.board[i][j] == 0){
                    gameString+="⚪";
                } else if(game.board[i][j] == 1){
                    gameString+="🔴";
                } else { //it's 2
                    gameString+="🟡";
                }
                gameString+="\n";
            }
        }
        return gameString;
        
    }

    startGame(userOne, userTwo, gameMessage, connectFour){

        let boardString = boardToString(connectFour);
        let embed = {
            title: `🔴 ${userOne.username} vs 🟡 ${userTwo.username}`,
            fields: [{
                name: `Player 1's turn`,
                value: boardString
            }]
        }
        gameMessage.edit( {embed} );
    }
}

module.exports = ConnectCommand;

