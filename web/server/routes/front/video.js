// var http = require('http');
// var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
//
// var mic = require('mic');
var micInstance = mic({
	'rate': '16000',
	'channels': '1',
	'debug': true,
	'exitOnSilence': 0,
	device: 'hw:2,0'
});
var micInputStream = micInstance.getAudioStream();
micInstance.start();

export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'dep': ['webcamRunning'],
		'call': function(...args){
			if(!this.webcamRunning){
				args[1].status(404);
				args[1].end();
			}
			else{
				return new MjpegProxy('http://localhost:8081').proxyRequest(...args);
			}
		}
	},
	{
		'url': '/video/audio',
		'type': 'get',
		'call': function(req, res){
			res.json({})
			// res.set({'Content-Type': 'audio/mpeg'});
			// micInputStream.on('data', function(data) {
			//   res.write(data);
			// });
			// micInputStream.pipe(res);
		}
	},
];
