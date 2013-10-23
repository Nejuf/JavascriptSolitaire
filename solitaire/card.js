(function(root) {
	var Solitaire = root.Solitaire = (root.Solitaire || {});

	var Card = Solitaire.Card = function(suit, value){
		this.suit = suit;
		this.value = value;
		this.isHidden = true;
	}

	Card.prototype.reveal = function(){
		this.isHidden = false;
	}

	Card.prototype.hide = function(){
		this.isHidden = false;
	}

	Card.prototype.toString = function(){
		var numString;

		switch(this.value)
		{
		case 11:
			numString = "J";
			break;
		case 12:
			numString = "Q";
			break;
		case 13:
			numString = "K";
			break;
		default:
			numString = this.value.toString();
		}
		return numString + this.suit.toUpperCase();
	}
	exports.Card = Card;
})(this);