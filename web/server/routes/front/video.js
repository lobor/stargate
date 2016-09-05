var MjpegProxy = require('mjpeg-proxy').MjpegProxy;

// var mic = require('microphone');
//
// mic.startCapture({'mp3output' : true});
// var mic = require('mic');
// //
// var micInstance = mic({
// 	'rate': '16000',
// 	'channels': '1',
// 	'debug': false,
// 	'exitOnSilence': 6
// });

// var micInputStream = micInstance.getAudioStream();
// micInstance.start();
//
// var mic = require('microphone');
// mic.startCapture({'mp3output' : true});

export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'dep': ['webcamRunning', 'io'],
		'call': function(...args){
			// var spawn = require('electron-spawn');
			//
			// var electron = spawn('./test.js');
			// electron.stderr.on('data', function (data) {
			//   console.error(data.toString())
			// })
			// electron.stdout.on('data', function (data) {
			//   console.log(data.toString())
			// });
			// if(!this.webcamRunning){
			// 	args[1].status(404);
			// 	args[1].end();
			// }
			// else{
				// mic.audioStream.on('data', (data) => {
				//   this.io.emit('audio', data);
				// });
				// micInputStream.on('data', (data) => {
				// 	this.io.emit('audio', data);
				// });

				return new MjpegProxy('http://localhost:' + args[0].query.port).proxyRequest(...args);
			// }
		}
	},
	{
		'url': '/video/audio',
		'type': 'get',
		'call': function(req, res){
			// micInputStream.pipe(res);
		}
	},
];
