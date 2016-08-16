var http = require('http');
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'dep': ['webcamRunning'],
		'call': function(req, res){
			if(!this.webcamRunning){
				res.status(404);
				res.end();
			}
			else{
				return new MjpegProxy('http://localhost:8081').proxyRequest;
			}
		}
	}
];
