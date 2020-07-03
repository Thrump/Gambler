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
            //console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            userTwo = user;
        });
        
        collector.on('end', collected => {
            //console.log(`Collected ${collected.size} items`);
            //console.log(userTwo);
            let game = new ConnectFourLogic();
            this.startGame(userOne, userTwo, sent, game);
        });
        
    }

    boardToString(game){
        var gameString = "0⃣1⃣2⃣3⃣4⃣5⃣6⃣\n";
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
            }
            gameString+="\n";
        }
        return gameString;
        
    }

    async startGame(userOne, userTwo, gameMessage, connectFour){
        gameMessage.reactions.removeAll();
        let currentTurn = userOne;
        let boardString = this.boardToString(connectFour);
        let embed = {
            title: `🔴 ${userOne.username} vs 🟡 ${userTwo.username}`,
            fields: [{
                name: `Player 1's turn`,
                value: boardString
            }]
        }
        gameMessage.edit( {embed} );
    }

    getColumn(name){
        if(name === '0⃣'){
            return 0;
        }
        if(name === '1⃣'){
            return 1;
        }
        if(name === '2⃣'){
            return 2;
        }
        if(name === '3⃣'){
            return 3;
        }
        if(name === '4⃣'){
            return 4;
        }
        if(name === '5⃣'){
            return 5;
        }
        if(name === '6⃣'){
            return 6;
        }
    }
}

module.exports = ConnectCommand;


//connect 4 logic
class ConnectFourLogic {
    constructor() {
        this.board =   [[0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]];
        this.turn = 1; //1 = player 1, 2 = player 2 
        this.columnEmpty = [5,5,5,5,5,5,5];
        this.latestPieceRow;
        this.latestPieceCol;
    }

    start(){
        //resets everything
        this.board =   [[0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]];
        this.turn = 1; //1 = player 1, 2 = player 2 
        this.columnEmpty = [5,5,5,5,5,5,5];
        this.latestPieceRow = -1;
        this.latestPieceCol = -1;
    }

    drop(column){
        if(this.columnEmpty[column] == 0){
            return 0; //error telling player to try again
        } else {
            this.latestPieceCol = column;
            this.latestPieceRow = this.columnEmpty[column];
            this.board[this.latestPieceRow][this.latestPieceCol] = this.turn;
            this.columnEmpty[column]--;
            this.checkWin();
            this.checkTie();
            this.changeTurn();
            return this.turn; //successful turn (returns who's going to move next)
        }
    }

    changeTurn(){
        this.turn == 1 ? this.turn = 1 : this.turn = 2;
    }

    checkWin(){
        var count = 1; //1 including the piece you just dropped

        //Turn change hasn't happened yet
        var check = this.turn; //the number we search for
        //start search on piece that just dropped
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;
        //check up/down

        //start looking up
        while(row != 0){
            row--; //subtracting row goes upwards
            if(this.board[row][col] == check){
                count++;
            }
        }

        //and look down
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 6){
            row++; //adding rows goes down
            if(this.board[row][col] == check){
                count++;
            }
        }

        if(count => 4){
            return true;
        } else {
            count = 1;
        }
        //check left/right
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        //left
        while(col != 0){
            col--; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        //right
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(col != 6){
            col++; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        if(count => 4){
            return true;
        } else {
            count = 1;
        }

        //check UpRight/DownLeft
        //upright
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 0 && col != 6){
            row--;
            col++; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        //downleft
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 5 && col != 0){
            row++;
            col--; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        if(count => 4){
            return true;
        } else {
            count = 1;
        }

        //check UpLeft/DownRight
                //upright
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 0 && col != 6){
            row--;
            col++; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        //downleft
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 5 && col != 0){
            row++;
            col--; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        if(count => 4){
            return true;
        } else {
            count = 0;
        }


        //upleft
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 0 && col != 0){
            row--;
            col--; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        //downleft
        var col = this.latestPieceCol;
        var row = this.latestPieceRow;

        while(row != 5 && col != 6){
            row++;
            col++; 
            if(this.board[row][col] == check){
                count++;
            }
        }

        if(count => 4){
            return true;
        } else {
            return false;
        }
    }

    checkTie(){
        return this.columnEmpty === [0,0,0,0,0,0,0];
    }
}

//module.export = ConnectFourLogic;

