(function(root){
	var Hanoi = root.Hanoi = (root.Hanoi || {});

var readline = require('readline');
var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

	var Game = Hanoi.Game = function(){
		this.pegL = [3,2,1];
		this.pegM = [];
		this.pegR = [];
	}

	Game.prototype.getPeg = function(letter){
		switch(letter){
		case "L":
		case "l":
			return this.pegL;
			break;
		case "M":
		case "m":
			return this.pegM;
			break;
		case "R":
		case "r":
			return this.pegR;
			break;
		default:
			throw("Invalid peg.");
			return;
		}
	}

	Game.prototype.promptForMove = function(callback){
		var that = this;
		reader.question("Move from which peg to where? (e.g. L,M)", function(answer){
			var ans = answer.split(",");
			callback(ans[0], ans[1]);
		})
	}

	Game.prototype.show = function() {
		console.log("L: " + this.pegL);
		console.log("M: " + this.pegM);
		console.log("R: " + this.pegR);
	}

	Game.prototype.moveCallback = function(peg1, peg2) {
		var fromPeg = this.getPeg(peg1);
		var toPeg = this.getPeg(peg2);
		if(fromPeg.length > 0 && (toPeg.length === 0 || fromPeg[fromPeg.length-1] < toPeg[toPeg.length-1])){
			toPeg.push(fromPeg.pop());
			this.checkWin();
		} else{
			console.log("Invalid move.");
			this.promptForMove(this.moveCallback.bind(this));
		}
	}

	Game.prototype.checkWin = function(){
		if(this.pegM.length === 3 || this.pegR.length === 3){
			this.show();
			console.log("You win!")
			reader.close();
		}
		else{
			this.run();
		}
	}

	Game.prototype.run = function() {
		this.show();
		this.promptForMove(this.moveCallback.bind(this));
	}

})(this);
console.log(this);
console.log(this.Hanoi);
var g = new this.Hanoi.Game();
g.run();
// var fromPeg = that.getPeg(ans[0]);
// var toPeg = that.getPeg(ans[1]);
// if(fromPeg.length > 0 && (toPeg.length === 0 || fromPeg[fromPeg.length-1] < toPeg[toPeg.length-1])){
// 	// toPeg.push(fromPeg.pop());
// }
// else{
// 	console.log("Invalid move.");
// 	that.promptForMove();
// }