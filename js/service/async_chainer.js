/*
    This method is similar to AsyncChainer in Android client source code.
    Refer to 'com.pinthecloud.athere.util.AsyncChainer' class 
*/

var AsyncChainer = function() {
    this.queue = null;
    this.currentCount = 0;
    this.count = 0;
};

AsyncChainer.prototype.async = function(tasks) {
    this.queue = [];
    for (var i = 0 ; i < tasks.length ; i++) {
    	this.queue.push(tasks[i]);
    }
    this.executeAsync();
};

AsyncChainer.prototype.executeAsync = function() {
    this.currentCount++;
    if (this.currentCount < this.count) return;
    
	var task = this.queue.shift();
	if (task == null || task == undefined) return;
	
	task.apply(null, arguments);
};

AsyncChainer.prototype.wait = function(count) {
    this.currentCount = 0;
    this.count = count;
};
