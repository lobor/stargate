var fs = require('fs');

var mjpeg2jpegs = require("./utils/mjpeg2jpeg");

var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");

var spawn = require('child_process').spawn;

var extract = require('jpeg-extract');

export default class Visio {
  constructor () {
    this.stream = [];
		this.collections = [];
		this.pathCollection = null;

		this.isStarting = false;

		this.event = {};
	}

	addStream(config) {
		this.stream.push(config);
	}

	deleteCollection(id) {
		this.collections = this.collections.filter(function (collection) {
			return (collection !== id);
		});
	}

	addCollection(collection) {
		let sizeCollection = this.collections.length;
		this.collections.push(collection);
		if (0 === sizeCollection && this.isStarting)
			this.start();
	}

	setPathCollection(path) {
		this.pathCollection = path;
		fs.readdir(path, (err, files) => {
			files.forEach((file) => {
				this.addCollection(file);
			});
		});
	}

	on(name, cb) {
		this.event[name] = cb;
	}

	off(name) {
		this.event[name] = false;
	}

	emit(event, data) {
		if (this.event[event]) {
			this.event[event].call(undefined, data);
		}
	}

	stop() {
		this.isStarting = false;
	}

  // start(){
  //   var that = this;
  //   if (!this.pathCollection && !this.collections.length && !this.stream.length) {
  //     return;
  //   }
  //   this.isStarting = true;
  //   var workers;
  //
  //   this.stream.forEach((stream, index) => {
  //     console.log('stream ', index);
  //     extract('http://localhost:' + stream.port, (img) => {
  //       console.log('write');
  //       fs.writeFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), img , () => {
  //       //   const ls =spawn('python', [basePath + '/visio/recognizer.py', pathTmpMjpeg2jpegs.replace('{{index}}', index)]);
  //       //
  //       //   ls.stdout.on('data', (data) => {
  //       //     console.log(`stdout: ${data}`);
  //       //     data = JSON.parse(data)
  //       //     console.log(data.label, this.collections[data.label]);
  //       //     // onPasse = true;
  //       //     // this.emit('train:ok')
  //       //   });
  //       //
  //       //   ls.stderr.on('data', (data) => {
  //       //     console.log(`stderr: ${data}`);
  //       //   });
  //       });
  //     });
  //   });
  // }


  // start(){
  //   var fs = require('fs');
  //
  //   this.stream.forEach((stream, index) => {
  //     var rr = fs.createReadStream('http://localhost:' + stream.port);
  //     rr.on('readable', function() {
  //       console.log('readable:', rr.read());
  //     });
  //     rr.on('end', function() {
  //       console.log('end');
  //     });
  //   });
  // }

	start() {
		var that = this;
		if (!this.pathCollection && !this.collections.length && !this.stream.length) {
			return;
		}
		this.isStarting = true;
		// var workers;

		this.stream.forEach((stream, index) => {
      // console.log('python', basePath + '/visio/recognizer.py', 'http://localhost:' + stream.port);
      const ls = spawn('python', ['-u', basePath + '/visio/recognizer.py', 'http://localhost:' + stream.port + '/']);

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        data = JSON.parse('{' + data + '}')
        console.log(data.label, this.collections[data.label]);
        // onPasse = true;
        // this.emit('train:ok')
      });

      ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    });

			// http.request({
			// 	hostname: 'localhost',
			// 	port: stream.port,
			// }, mjpeg2jpegs((res) => {
			// 	var onPasse = true;
	// 			var onPasse2 = false;
  //       res.on("imageEnd", (d) => {
  //         res.pause()
  //         console.log('end');
  //         const ls =spawn('python', [basePath + '/visio/recognizer.py', pathTmpMjpeg2jpegs.replace('{{index}}', index)]);
  //
  //         ls.stdout.on('data', (data) => {
  //           console.log(`stdout: ${data}`);
  //           data = JSON.parse(data)
  //           console.log(data.label, this.collections[data.label]);
  //           // onPasse = true;
  //           // this.emit('train:ok')
  //         });
  //
  //         ls.stderr.on('data', (data) => {
  //           console.log(`stderr: ${data}`);
  //         });
  //       //   if (onPasse2 && this.isStarting) {
  //       //     onPasse2 = false;
  //       //     console.log("Image end");
            // const ls =spawn('python', [basePath + '/visio/recognizer.py', pathTmpMjpeg2jpegs.replace('{{index}}', index)]);
            //
            // ls.stdout.on('data', (data) => {
            //   console.log(`stdout: ${data}`);
            //   data = JSON.parse(data)
            //   console.log(data.label, this.collections[data.label]);
            //   // onPasse = true;
            //   // this.emit('train:ok')
            // });
            //
            // ls.stderr.on('data', (data) => {
            //   console.log(`stderr: ${data}`);
            // });
  //       //   }
  //       });
  //
	// 			res.on("imageData", (data) => {
  // //         // res.pause()
	// // 				if (this.isStarting) {
	// 				if (onPasse && this.isStarting) {
	// 					onPasse = false;
  // //
	// 					fs.writeFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), data, (err) => {
  //             if (err) throw err;
  //             // onPasse2 = true;
  //             console.log('img ecrit');
  //
  //             fs.readFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), function(err, data){
  //               const ls =spawn('python', [basePath + '/visio/recognizer.py', pathTmpMjpeg2jpegs.replace('{{index}}', index)]);
  //
  //               ls.stdout.on('data', (data) => {
  //                 console.log(`stdout: ${data}`);
  //                 data = JSON.parse(data)
  //                 console.log(data.label, this.collections[data.label]);
  //                 onPasse = true;
  //                 // this.emit('train:ok')
  //               });
  //
  //               ls.stderr.on('data', (data) => {
  //                 console.log(`stderr: ${data}`);
  //               });
  //               // console.log(data.toString('utf8'));
  //               // onPasse = true;
  //             })
  //
  //
  //
  //         		// ls.on('close', (code) => {
  //         		//   console.log(`child process exited with code ${code}`);
  //         		// });
	// 						// workers = workerFarm(process.cwd() + '/visio/worker.js');
	// 						// workers(index, this.collections, (err, outp) => {
	// 						// 	workerFarm.end(workers);
	// 						// 	if (outp) {
	// 						// 		outp.port = stream.port;
	// 						// 		that.emit('result', outp);
	// 						// 	} else {
	// 						// 		that.emit('noFace', {
	// 						// 			port: stream.port
	// 						// 		});
	// 						// 	}
								// onPasse = true;
	// 						// });
		// 				});
		// 			}
		// 		});
		// 	})).end();
		// });
	}
}
