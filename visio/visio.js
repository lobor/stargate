var cv = require('opencv');
var fs = require('fs');

var mjpeg2jpegs = require("./utils/mjpeg2jpeg");

var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var workerFarm = require('worker-farm');

var http = require("http");

export default class Visio {
  constructor(){
    this.stream = [];
    this.collections = [];
    this.pathCollection = null;

    this.isStarting = false;

    this.event = {};
  }

  addStream(config){
    this.stream.push(config);
  }

  deleteCollection(id){
    this.collections = this.collections.filter(function(collection){
      return (collection !== id);
    });
  }

  addCollection(collection){
    let sizeCollection = this.collections.length;
    this.collections.push(collection);
    if(0 === sizeCollection && this.isStarting)
      this.start();
  }

  setPathCollection(path){
    this.pathCollection = path
    fs.readdir(path, (err, files) => {
			files.forEach((file)=>{
				this.addCollection(file);
			})
		});
  }

  on(name, cb){
    this.event[name] = cb;
  }

  off(name){
    this.event[name] = false;
  }

  emit(event, data){
    if(this.event[event]){
      this.event[event].call(undefined, data)
    }
  }

  stop(){
    this.isStarting = false;
  }

  start(){
    var that = this;
    if(!this.pathCollection && !this.collections.length && !this.stream.length){
      return;
    }
    this.isStarting = true;
    var workers;
    this.stream.forEach((stream, index) => {
      http.request({
        hostname: 'localhost',
        port: stream.port,
      }, mjpeg2jpegs((res) => {
        var onPasse = true;
        res.on("imageData", (data) => {
          if(onPasse && this.isStarting){
            onPasse = false;
            fs.writeFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), data, () => {
              workers = workerFarm(process.cwd() + '/visio/worker.js');
              workers(index, this.collections, (err, outp) => {
                workerFarm.end(workers)
                if(outp){
                  outp.port = stream.port;
                  that.emit('result', outp)
                }
                else{
                  that.emit('noFace', {port: stream.port})
                }
                onPasse = true;
              })
            });
          }
        });
      })).end();
    });
  }
}
