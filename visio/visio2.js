require('babel/register');
var fs = require('fs');

var spawn = require('child_process').spawn;


var mjpeg2jpegs = require("./utils/mjpeg2jpeg");

var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");
var Visio = require(basePath + "/visio/visio");



class Visio2 extends Visio {
	train(){
		const ls =spawn('python', [basePath + '/visio/train.py'])

		ls.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
			this.emit('train:ok')
		});

		ls.stderr.on('data', (data) => {
		  console.log(`stderr: ${data}`);
		});

		ls.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});
	}
	reco() {


		// const ls =spawn('python', [basePath + '/visio/train.py'])
		const ls =spawn('python', [basePath + '/visio/recognizer.py', basePath + '/tmp/mjpeg2jpegs0.jepg'])

		ls.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
			this.emit('reco:ok')
		});

		ls.stderr.on('data', (data) => {
		  console.log(`stderr: ${data}`);
		});

		ls.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});
	}
}

var option = process.argv[2];

var toto = new Visio2();


if(option === 'train'){
toto.train();
}
else if (option === 'reco'){
	toto.reco();
}
