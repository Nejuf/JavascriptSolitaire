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
		_.times(20, function(num){
			var lineString = "";

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