var Deck = require('./Deck').Deck;
var Board = require('./board').Board;

(function(root) {
	var Solitaire = root.Solitaire = (root.Solitaire || {});

	var Game = Solitaire.Game = function(){
		this.deck = new Deck();
		this.board = new Board(this.deck);
	}
	Game.prototype.run = function(){
		this.deck.shuffle();
		this.board.show();
	}

	exports.Game = Game;
})(this);
