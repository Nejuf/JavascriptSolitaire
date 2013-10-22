(function(root) {
	var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

	var Game = TicTacToe.Game = function() {
		this.board = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
	}

	Game.prototype.show = function() {
		for(var i=0; i<3; i++) {
			var row = "";
			for(var j=0; j<3; j++) {
				row += (this.board[i][j] == 1) ? "-" : this.board[i][j];
			}
			console.log(row);
		}
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
		if((x >= 0 && x < 3) && (y >= 0 && y < 3) && this.board[x][y] === 1) {
			this.board[x][y] = player;
			this.player = (player === "x") ? "o" : "x";
			this.checkWin();
		} else {
			console.log("Invalid move");
			this.promptForMove(player, this.moveCallback.bind(this));
		}
	}

	Game.prototype.boardFull = function() {
		for(var i=0; i<3; i++) {
			for(var j=0; j<3; j++) {
				if(this.board[i][j] === 1) return false;
			}
		}

		return true;
	}



	var lines = [
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

	Game.prototype.checkWin = function() {
		var winner = undefined;
		var that = this;

		lines.forEach(function(line) {
			if(winner) return;

			var piece = that.board[line[0][0]][line[0][1]];
			if(piece === 1) return;

			if(piece === that.board[line[1][0]][line[1][1]] &&
				 piece === that.board[line[2][0]][line[2][1]]) {
					 winner = piece;
				}
		});

		if(winner) {
			this.show();
			console.log(winner + " wins!");
			reader.close();
		} else if(this.boardFull()) {
			this.show();
			console.log("Draw.");
			reader.close();
		} else {
			this.run();
		}
	}

	Game.prototype.run = function() {
		this.player = (this.player || "x");
		this.show();
		this.promptForMove(this.player, this.moveCallback.bind(this));
	}
})(this);

var g = new this.TicTacToe.Game();
g.run();