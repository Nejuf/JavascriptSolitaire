(function(root) {
	var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

	var Game = TicTacToe.Game = function() {
		this.board = new Board();
		this.player = "x";
	}

	var readline = require('readline');
	var reader = readline.createInterface({ input: process.stdin, output: process.stdout});

	Game.prototype.promptForMove = function(player, callback) {
		reader.question(player + ": what is your next move? ", function(answer) {
			var arr = answer.split(",");
			var x = parseInt(arr[0]);
			var y = parseInt(arr[1]);

			callback(player, x, y);
		});
	}

	Game.prototype.moveCallback = function(player, x, y) {
		if(this.board.validPos(x,y) && this.board.posEmpty(x,y)) {
			this.board.setPos(player, x, y);
			this.nextPlayer();
			this.checkWin();
		} else {
			console.log("Invalid move");
			this.promptForMove(player, this.moveCallback.bind(this));
		}
	}

	Game.prototype.checkWin = function() {

		var winner = this.board.winner();

		if(winner) {
			this.board.show();
			console.log(winner + " wins!");
			reader.close();
		} else if(this.board.is_full()) {
			this.board.show();
			console.log("Draw.");
			reader.close();
		} else {
			this.run();
		}
	}

	Game.prototype.run = function() {
		this.board.show();
		this.promptForMove(this.player, this.moveCallback.bind(this));
	}

	Game.prototype.nextPlayer = function(){
		this.player = (this.player === "x") ? "o" : "x";
	}

	//---- Board ----------
	var Board = TicTacToe.Board = function(){
		this.grid = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
	}

	Board.prototype.is_full = function(){
		for(var i=0; i<3; i++) {
			for(var j=0; j<3; j++) {
				if(this.grid[i][j] === 1) return false;
			}
		}

		return true;
	}

	Board.prototype.winner = function(){
		var that = this;
		var winner;

		this.lines.forEach(function(line) {
			if(winner) return;

			var piece = that.grid[line[0][0]][line[0][1]];
			if(piece === 1) return;

			if(piece === that.grid[line[1][0]][line[1][1]] &&
				 piece === that.grid[line[2][0]][line[2][1]]) {
					 winner = piece;
				}
		});
		return winner;
	}

	Board.prototype.lines = [
		// rows
		[ [0, 0], [0, 1], [0, 2] ],
		[ [1, 0], [1, 1], [1, 2] ],
		[ [2, 0], [2, 1], [2, 2] ],
		// columns
		[ [0, 0], [1, 0], [2, 0] ],
		[ [0, 1], [1, 1], [2, 1] ],
		[ [0, 2], [1, 2], [2, 2] ],
		// diagonals
		[ [0, 0], [1, 1], [2, 2] ],
		[ [0, 2], [1, 1], [2, 0] ] ]

		Board.prototype.setPos = function(val,x,y){
			this.grid[x][y] = val;
		}
		Board.prototype.getPos = function(x,y){
			return this.grid[x][y];
		}

		Board.prototype.posEmpty = function(x,y){
			return this.grid[x][y] === 1;
		}

		Board.prototype.validPos = function(x,y){
			return ((x >= 0 && x < 3) && (y >= 0 && y < 3));
		}

		Board.prototype.show = function(){
			for(var i=0; i<3; i++) {
				var row = "";
				for(var j=0; j<3; j++) {
					row += (this.posEmpty(i,j)) ? "-" : this.getPos(i,j);
				}
				console.log(row);
			}
		}

})(this);

var g = new this.TicTacToe.Game();
g.run();