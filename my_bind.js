Function.prototype.myBind = function(obj) {
	var that = this;

	return function() {
		that.apply(obj);
	}
}


var Cat = function(name) {
	this.name = name;
}
Cat.prototype.sayName = function() {
	console.log(this.name);
}

var cat = new Cat("Frisky");
var f = cat.sayName;

var g = f.myBind(cat);

g();