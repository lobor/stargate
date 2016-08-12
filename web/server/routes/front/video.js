var http = require('http');
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'call': new MjpegProxy('http://localhost:8081').proxyRequest
	}
];
