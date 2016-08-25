var MjpegProxy = require('mjpeg-proxy').MjpegProxy;

export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'dep': ['webcamRunning', 'io'],
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
];
