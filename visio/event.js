try{
	// var traking = require('tracking');

	// var video = new Video();
	var traking = require(process.cwd() + '/node_module/tracking/build/tracking-min.js');
	console.log('3');
	// var video = document.createElement('video');
	// console.log(process.cwd());
	// video.src = "";
	// video.id = "myVideo";

	// document.body.appendChild(video);

//tracking.track('#myVideo', colors);
} 
catch(e){
	throw e;
}
require('electron').remote.app.quit();