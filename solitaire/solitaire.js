
var _ = require('./underscore.js');
var Game = require('./game.js').Game;

(function(root) {
	var Solitaire = root.Solitaire = (root.Solitaire || {});

	var g = new Game();
	g.run();

})(this);