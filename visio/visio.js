var fs = require('fs');


var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");

var spawn = require('child_process').spawn;


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
      if(files.length)
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

    this.stream.forEach((stream, index) => {
      this.launchWorker(index);
    });
	}

  launchWorker(index){
    var stream = this.stream[index];
    var workers = workerFarm(process.cwd() + '/visio/worker.js');
    workers(stream.port, this.collections, (outp) => {
      workerFarm.end(workers);
      if (outp) {
        var data = {
          port: stream.port,
          label: Object.keys(outp)[0],
          confidences: outp[Object.keys(outp)[0]]
        };
        this.emit('result', data);
      } else {
        this.emit('noFace', {
          port: stream.port
        });
      }
      this.launchWorker(index);
    });
  }
}
