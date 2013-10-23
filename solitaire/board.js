var _ = require('./underscore.js')._;

(function(root) {
	var Solitaire = root.Solitaire = (root.Solitaire || {});

	var Board = Solitaire.Board = function(deck){
		this.deck = deck;
		this.waste = [];
		this.foundations = [[],[],[],[]];
		this.tableau = this.buildTableau();
	}

	Board.prototype.buildTableau = function(){
		var arr = [[],[],[],[],[],[],[]];
		for(var i = 0; i < arr.length; i++)
		{
			for(var j = i; j < arr.length; j++){
				arr[j].push(this.deck.draw());
			}
			arr[i][arr[i].length-1].reveal();
		}

		return arr;
	}

	Board.prototype.show = function(){
		var that = this;
		var topLineArr = (this.deck.length() < 10) ?
			["  " + this.deck.length()] : [" " + this.deck.length()];
		for(var i = this.waste.length-3; i<this.waste.length; i++) {
			if(i < 0) continue;

			topLineArr.push(this.waste[i]);
		}

		while(topLineArr.length < 5) {
			topLineArr.push("  ");
		}

		this.foundations.forEach(function(foundation) {
			var card = foundation[foundation.length-1];
			if(card) {
				topLineArr.push(card);
			} else {
				topLineArr.push("  ");
			}
		});

		console.log(topLineArr.join(" "));



		_.times(20, function(num){
			var lineString = "      ";

			for(var i=0; i < that.tableau.length; i++){
				var c = that.tableau[i][num-1];
				var str;
				if(c){
					str = c.isHidden ? "__" : c.toString();
				}
				else{
					str = "  ";
				}
				lineString += (" " + str);
			}

			console.log(lineString);
		});
	}

	exports.Board = Board;
})(this);