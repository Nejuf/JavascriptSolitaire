var Card = require('./card.js').Card;
var _ = require('./underscore.js')._;

(function(root) {
	var Solitaire = root.Solitaire = (root.Solitaire || {});

	var Deck = Solitaire.Deck = function(){
		this.cards = [];
		var that = this;

		var suits = ["h", "d", "c", "s"];
		suits.forEach(function(suit){
			for(var i=1; i < 14; i++){
				that.cards.push(new Card(suit, i));
			}
		});
	}

	Deck.prototype.shuffle = function(){
		this.cards = _.shuffle(this.cards);
	}

	Deck.prototype.draw = function(){
		return this.cards.pop();
	}

	exports.Deck = Deck;
})(this);