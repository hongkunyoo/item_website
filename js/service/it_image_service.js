function ItImageService() {
}

ItImageService.prototype = function() {
	var PROFILE_IMAGE_SIZE = 212;
	var PROFILE_THUMBNAIL_IMAGE_SIZE = 75;
	
	var ITEM_PREVIEW_IMAGE_POSTFIX = "_preview";
	var ITEM_THUMBNAIL_IMAGE_POSTFIX = "_thumbnail";

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
		imageToDataUrl : function(image, callback) {

		},
		loadImgData : function(file, callback) {
			//	Prevent any non-image file type from being read.
			if (!file.type.match(/image.*/)) {
				console.log("The dropped file is not an image: ", file.type);
				return;
			}
			//	Create our FileReader and run the results through the render function.
			var _this = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				console.log(e.target.result);
				_this._dataURLToImage(e.target.result, callback);
				// callback(e.target.result);
			};
			reader.readAsDataURL(file);
		},
		_dataURLToImage : function(imgData, callback) {
			var image = new Image();
			console.log('in _dataToImage', imgData);
			image.onload = function() {
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
			// Set to Width
			if (image.width < image.height) {
				x_offset = 0;
				y_offset = (image.height - image.width) / 2;
				cropWidth = cropHeight = image.width;
				imgWidth = imgHeight = image.width;
				canvas.width = canvas.height = image.width;
				// Set to Height
			} else {
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
		makePrettyTime : function(datetime) {
			return new ItDateTime(datetime).toPrettyDateTime();
		},
		PROFILE_IMAGE_SIZE : PROFILE_IMAGE_SIZE,
		PROFILE_THUMBNAIL_IMAGE_SIZE : PROFILE_THUMBNAIL_IMAGE_SIZE,
		ITEM_PREVIEW_IMAGE_POSTFIX : ITEM_PREVIEW_IMAGE_POSTFIX,
		ITEM_THUMBNAIL_IMAGE_POSTFIX : ITEM_THUMBNAIL_IMAGE_POSTFIX
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