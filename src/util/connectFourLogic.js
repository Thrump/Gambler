class ConnectFourLogic{
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
        return this.columnEmpty == [0,0,0,0,0,0,0];
    }
}