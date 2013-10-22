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

// var clock = new Clock();
// clock.run(new Date());


var readline = require('readline');

var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

var addNumbers = function(sum, numsLeft, completionCallback){
	if(numsLeft > 0){
		reader.question("Enter next number: ", function(num){
			var int = parseInt(num);
			sum += int;
			console.log("Interval sum: " + sum);
			addNumbers(sum, numsLeft-1, completionCallback);
		});
	}
	else{
		completionCallback(sum);
	}
}

addNumbers(0, 3, function(sum){console.log("Total sum: " + sum);});