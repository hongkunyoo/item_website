function ItImageUtil() {
}

ItImageUtil.prototype = function() {
	var MAX_SIZE = 212;
	var THUMB_NAIL_SIZE = 75;

	function reSize(MAX, width, height) {
		var small,
		    big;
		if (width > height) {
			small = height;
			big = width;
		} else {
			small = width;
			big = height;
		}
		if (small > MAX) {
			big *= MAX / small;
			small = MAX;
		}
		if (width > height) {
			height = small;
			width = big;
		} else {
			height = big;
			width = small;
		}
		return {
			width : width,
			height : height
		};
	}

	// function drawImageToCanvasWithWidthHeight(canvas, image, width, height) {
	// var ctx = canvas.getContext("2d");
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// canvas.width = width;
	// canvas.height = height;
	// ctx.drawImage(image, 0, 0, width, height);
	// }

	return {
		loadImgData : function(file, callback) {
			//	Prevent any non-image file type from being read.
			if (!file.type.match(/image.*/)) {
				return;
			}
			
			//	Create our FileReader and run the results through the render function.
			var _this = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				_this._dataURLToImage(e.target.result, callback);
				// callback(e.target.result);
			};
			reader.readAsDataURL(file);
		},
		_dataURLToImage : function(imgData, callback) {
			var image = new Image();
			image.onload = function() {
				// var origCanvas = document.createElement("canvas");
				// var imgSize = reSize(size, image.width, image.height);
				// image.width = imgSize.width;
				// image.height = imgSize.height;
				callback(image);
			};
			image.src = imgData;
		},
		degradeResol : function(image, LEVEL, callback) {
			var imgSize = reSize(LEVEL, image.width, image.height);
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = imgSize.width;
			canvas.height = imgSize.height;
			ctx.drawImage(image, 0, 0, imgSize.width, imgSize.height);
			// image.width = imgSize.width;
			// image.height = imgSize.height;
			// return image;
			this._dataURLToImage(canvas.toDataURL(), callback);
		},
		cropSquare : function(image, callback) {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			var x_offset = 0;
			var y_offset = 0;
			var cropWidth = 0;
			var cropHeight = 0;
			var canvasPosX = 0;
			var canvasPosY = 0;
			var imgWidth = 0;
			var imgHeight = 0;

			if (image.width < image.height) {
				// Set to Width
				x_offset = 0;
				y_offset = (image.height - image.width) / 2;
				cropWidth = cropHeight = image.width;
				imgWidth = imgHeight = image.width;
				canvas.width = canvas.height = image.width;
			} else {
				// Set to Height
				x_offset = (image.width - image.height) / 2;
				y_offset = 0;
				cropWidth = cropHeight = image.height;
				imgWidth = imgHeight = image.height;
				canvas.width = canvas.height = image.height;
			}
			ctx.clearRect(0, 0, canvasPosX, canvasPosY);
			ctx.drawImage(image, x_offset, y_offset, cropWidth, cropHeight, canvasPosX, canvasPosY, imgWidth, imgHeight);

			this._dataURLToImage(canvas.toDataURL(), callback);
		},
		drawToCanvas : function(canvas, image) {
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, image.width, image.height);
			canvas.width = image.width;
			canvas.height = image.height;

			ctx.drawImage(image, 0, 0, image.width, image.height);
		},
		imageToBlob : function(image) {

			var canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;

			// Copy the image contents to the canvas
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);

			var dataURL = canvas.toDataURL();
			var parsed = parseString(dataURL);
			return b64toBlob(parsed.base64, parsed.type);
		},
		makeUserImage : function(id) {
			return "https://athere.blob.core.windows.net/item-user-profile/" + id;
		},
		makeItemImage : function(id) {
			return "https://athere.blob.core.windows.net/item-image-container/" + id;
		},
		makePrettyTime : function(datetime) {
			return new ItDateTime(datetime).toPrettyDateTime();
		},
		MAX_SIZE : MAX_SIZE,
		THUMB_NAIL_SIZE : THUMB_NAIL_SIZE
	};

	function parseString(data) {
		var str = "";
		var type = "";

		var first = data.split(":")[1];
		type = (first.split(";")[0]);
		str = (first.split(",")[1]);

		return {
			base64 : str,
			type : type
		};
	}

	function b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {
			type : contentType
		});
		return blob;
	}
}();
