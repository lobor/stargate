var fs = require('fs');

var basePath = process.cwd();
console.log(basePath);
import Plugin from './../../core/plugin';


var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");

var spawn = require('child_process').spawn;


export default class Visio extends Plugin {
  constructor () {
    super();
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
