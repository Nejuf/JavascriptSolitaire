var Clock = function() {
}
Clock.prototype.tick = function() {
	this.date.setMilliseconds(this.date.getMilliseconds() + 5000);
	console.log(this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds());
}
Clock.prototype.run = function(date) {
	this.date = date;
	setInterval(this.tick.bind(this), 5000);
}

var clock = new Clock();
clock.run(new Date());