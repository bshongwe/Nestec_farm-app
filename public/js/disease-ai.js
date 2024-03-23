// Leaf Disease Segmentation Detection API
/* How to Deploy the Leaf Disease Segmentation Detection API
 * Using Roboflow, you can deploy your object detection model to a range of environments, including:
 *  Luxonis OAK
 *  Raspberry Pi
 *  NVIDIA Jetson
 *  A Docker container
 *  A web page
 *  A Python script using the Roboflow SDK.
 */

// Model Type: Roboflow 2.0 Semantic Segmentation
$(function() {
	// #1.0 Default values pulled from query string
	// #1.1 Default model, version, API key
	$('#model').val("leaf-disease-segmentation-yguau");
	$('#version').val("1");
	$('#api_key').val("Ri67gCGCmzmgZkdo3PH2");

	// #1.2 Button event listeners
	setupButtonListeners();
});

// #2.0 Inference handler: URL
// #2.1 Inference: progress + result + scroll
var infer = function() {
	$('#output').html("Inferring...");
	$("#resultContainer").show();
	$('html').scrollTop(100000);

	// #2.2 GET: form settings, error-handler
	getSettingsFromForm(function(settings) {
		settings.error = function(xhr) {
			$('#output').html("").append([
				"Error loading response.",
				"",
				"Check your API key, model, version,",
				"and other parameters",
				"then try again."
			].join("\n"));
		};

		// #2.3 REQ: API request send
		$.ajax(settings).then(function(response) {
			var pretty = $('<pre>');
			var formatted = JSON.stringify(response, null, 4)

			// #2.4 RES: JSON + res + scroll
			pretty.html(formatted);
			$('#output').html("").append(pretty);
			$('html').scrollTop(100000);
		});
	});
};

// #3.0 Inference handler: Local DB
var retrieveDefaultValuesFromLocalStorage = function() {
	try {
		var api_key = localStorage.getItem("rf.api_key");
		var model = localStorage.getItem("rf.model");
		var format = localStorage.getItem("rf.format");

		// #3.1 API Set: key + model + format
		if (api_key) $('#api_key').val(api_key);
		if (model) $('#model').val(model);
		if (format) $('#format').val(format);
	} catch (e) {
		// localStorage disabled
	}

	// #3.2 Update local storage when form values change
	$('#model').change(function() {
		localStorage.setItem('rf.model', $(this).val());
	});

	$('#api_key').change(function() {
		localStorage.setItem('rf.api_key', $(this).val());
	});

	$('#format').change(function() {
		localStorage.setItem('rf.format', $(this).val());
	});
};

// #4.0 Setup event listeners for buttons
var setupButtonListeners = function() {
	// #4.1 run inference when the form is submitted
	$('#inputForm').submit(function() {
		infer();
		return false;
	});

	// #4.2 make the buttons blue when clicked
	// and show the proper "Select file" or "Enter url" state: I changed something about this
	$('.bttn').click(function() {
		$(this).parent().find('.bttn').removeClass('active');
		$(this).addClass('active');

		if($('#computerButton').hasClass('active')) {
			$('#fileSelectionContainer').show();
			$('#urlContainer').hide();
		} else {
			$('#fileSelectionContainer').hide();
			$('#urlContainer').show();
		}

		if($('#jsonButton').hasClass('active')) {
			$('#imageOptions').hide();
		} else {
			$('#imageOptions').show();
		}

		return false;
	});

	// wire styled button to hidden file input
	$('#fileMock').click(function() {
		$('#file').click();
	});

	// grab the filename when a file is selected
	$("#file").change(function() {
		var path = $(this).val().replace(/\\/g, "/");
		var parts = path.split("/");
		var filename = parts.pop();
		$('#fileName').val(filename);
	});
};

var getSettingsFromForm = function(cb) {
	var settings = {
		method: "POST",
	};

	var parts = [
		"https://segment.roboflow.com/",
		$('#model').val(),
		"/",
		$('#version').val(),
		"?api_key=" + $('#api_key').val()
	];

	var method = $('#method .active').attr('data-value');
	if(method == "upload") {
		var file = $('#file').get(0).files && $('#file').get(0).files.item(0);
		if(!file) return alert("Please select a file.");

		getBase64fromFile(file).then(function(base64image) {
			settings.url = parts.join("");
			settings.data = base64image;

			console.log(settings);
			cb(settings);
		});
	} else {
		var url = $('#url').val();
		if(!url) return alert("Please enter an image URL");

		parts.push("&image=" + encodeURIComponent(url));

		settings.url = parts.join("");
		console.log(settings);
		cb(settings);
	}
};

var getBase64fromFile = function(file) {
	return new Promise(function(resolve, reject) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
		resizeImage(reader.result).then(function(resizedImage){
			resolve(resizedImage);
		});
    };
		reader.onerror = function(error) {
			reject(error);
		};
	});
};

var resizeImage = function(base64Str) {
	return new Promise(function(resolve, reject) {
		var img = new Image();
		img.src = base64Str;
		img.onload = function(){
			var canvas = document.createElement("canvas");
			var MAX_WIDTH = 1500;
			var MAX_HEIGHT = 1500;
			var width = img.width;
			var height = img.height;
			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, width, height);
			resolve(canvas.toDataURL('image/jpeg', 1.0));  
		};
	});
};
