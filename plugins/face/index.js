var basePath = process.cwd();
import { Plugin } from './../../core/';

var workerFarm = require('worker-farm');

var http = require("http");

var spawn = require('child_process').spawn;


class Face extends Plugin {
  get props() {
    return {
      dependencies: ['motion']
    };
  }

  constructor () {
    super();
    this.stream = [];
		this.collections = [];
		this.pathCollection = null;

		this.isStarting = false;
	}

  onConfig(error){
    // console.log('config', error);

    // console.log('config', this.config);
  }

  // onDependencies(){
  //   console.log(this.dependencies);
  // }

  // onBack(error){
  //   // console.log('config', error);
  // }

	// addStream(config) {
	// 	this.stream.push(config);
	// }
  //
	// deleteCollection(id) {
	// 	this.collections = this.collections.filter(function (collection) {
	// 		return (collection !== id);
	// 	});
	// }
  //
	// addCollection(collection) {
	// 	let sizeCollection = this.collections.length;
	// 	this.collections.push(collection);
	// 	if (0 === sizeCollection && this.isStarting)
	// 		this.start();
	// }
  //
	// setPathCollection(path) {
	// 	this.pathCollection = path;
	// 	fs.readdir(path, (err, files) => {
  //     if(files.length)
  // 			files.forEach((file) => {
  // 				this.addCollection(file);
  // 			});
	// 	});
	// }
  //
	// stop() {
	// 	this.isStarting = false;
	// }
  //
	// start() {
	// 	var that = this;
	// 	if (!this.pathCollection && !this.collections.length && !this.stream.length) {
	// 		return;
	// 	}
	// 	this.isStarting = true;
  //
  //   this.stream.forEach((stream, index) => {
  //     this.launchWorker(index);
  //   });
	// }
  //
  // launchWorker(index){
  //   var stream = this.stream[index];
  //   var workers = workerFarm(process.cwd() + '/visio/worker.js');
  //   workers(stream.port, this.collections, (outp) => {
  //     workerFarm.end(workers);
  //     if (outp) {
  //       var data = {
  //         port: stream.port,
  //         label: Object.keys(outp)[0],
  //         confidences: outp[Object.keys(outp)[0]]
  //       };
  //       this.emit('result', data);
  //     } else {
  //       this.emit('noFace', {
  //         port: stream.port
  //       });
  //     }
  //     this.launchWorker(index);
  //   });
  // }
}


export default Face;
