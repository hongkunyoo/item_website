$(function(){
	
});

// var target = document.getElementById("drop-target");
// target.addEventListener("dragover", function(e){e.preventDefault();}, true);
// target.addEventListener("drop", function(e){
	// e.preventDefault(); 
	// loadImage(e.dataTransfer.files[0]);
// }, true);





function ItDateTime(date_time) {
	if (date_time == undefined) {
        var dateInstance = newDateInstanceWithTimeZone(0);
		this.datetime = dateInstance.getFullYear() + getNumber(dateInstance.getMonth() + 1, 2)
		+ getNumber(dateInstance.getDate(), 2) + getNumber(dateInstance.getHours(), 2)
		 + getNumber(dateInstance.getMinutes(), 2) + getNumber(dateInstance.getSeconds(), 2);	
	} else {
		if (typeof(date_time) == 'string'){
            this.datetime = date_time;
        }
		else{
            this.datetime = date_time.toString();
        }
	}
}

function newDateInstanceWithTimeZone(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000*offset));
}


function getNumber(num, digit) {
	num = ''+num;
	for (var i = num.length ; i < digit ; i++) {
		num = '0'+num;
	}
	return num;
}

ItDateTime.prototype.getYear = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(0, 4);
};

ItDateTime.prototype.getMonth = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(4, 6);
};

ItDateTime.prototype.getDate = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(6, 8);
};

ItDateTime.prototype.getHours = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(8, 10);
};

ItDateTime.prototype.getMinutes = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(10, 12);
};

ItDateTime.prototype.getSeconds = function() {
	if (this.datetime.length != 14) {
		throw 'format err';
	}
	return this.datetime.substring(12, 14);
};

ItDateTime.prototype.toString = function() {
	return this.datetime;
};

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
};

 ItDateTime.prototype.toPrettyDateTime = function() {
 	return String.format("{0}-{1}-{2} {3}:{4}", this.getYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes());
	// return this.datetime.format("%Y-%m-%d %H:%M");
};