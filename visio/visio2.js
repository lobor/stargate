require('babel/register');
var fs = require('fs');


var mjpeg2jpegs = require("./utils/mjpeg2jpeg");

var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");
var Visio = require(basePath + "/visio/visio");


class Visio2 extends Visio {
	start() {
    var workers;
    var bitmap = fs.readFileSync(process.cwd() + '/visio/mjpeg2jpegs0.jpg');
    // convert binary data to base64 encoded string
    var img = new Buffer(bitmap).toString('base64');

    workers = workerFarm(process.cwd() + '/visio/electron-app.js');
    workers(img, (err, outp) => {
      workerFarm.end(workers);
      var base64Data = outp.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(process.cwd() + '/visio/result.png', base64Data, 'base64', function(err) {
        console.log(err);
      });
      // if (outp) {
      //   outp.port = stream.port;
      //   that.emit('result', outp);
      // } else {
      //   that.emit('noFace', {
      //     port: stream.port
      //   });
      // }
      // onPasse = true;
    });

		// var that = this;
		// if (!this.pathCollection && !this.collections.length && !this.stream.length) {
		// 	return;
		// }
		// this.isStarting = true;
		// var workers;
		// this.stream.forEach((stream, index) => {
		// 	http.request({
		// 		hostname: 'localhost',
		// 		port: stream.port,
		// 	}, mjpeg2jpegs((res) => {
		// 		var onPasse = true;
		// 		res.on("imageData", (data) => {
		// 			if (onPasse && this.isStarting) {
		// 				onPasse = false;
		// 				fs.writeFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), data, () => {
						// 	workers = workerFarm(process.cwd() + '/visio/worker.js');
						// 	workers(index, this.collections, (err, outp) => {
						// 		workerFarm.end(workers);
						// 		if (outp) {
						// 			outp.port = stream.port;
						// 			that.emit('result', outp);
						// 		} else {
						// 			that.emit('noFace', {
						// 				port: stream.port
						// 			});
						// 		}
						// 		onPasse = true;
						// 	});
						// });
		// 			}
		// 		});
		// 	})).end();
		// });
	}
}

var toto = new Visio2();

toto.start();
