var basePath = process.cwd();
import { Plugin, success, error, warning } from './../../core/';

var cp = require('child_process');
var fs = require('fs');
var os = require("os");

var spawn = cp.spawn;
var exec = cp.exec;



function cleanJsonToConf(data){
  return JSON.stringify(data)
		.replace(/({|}|'|")/g, '')
		.replace(/:/g, ' ')
		.replace(/,/g, os.EOL);
}


class Motion extends Plugin{
  constructor(){
    super();

    let which = spawn('which', ['motion']);

    which.on('close', (code) => {
      if(1 === code){
        error('Sorry, this module requires Motion to be installed');
        this.error = true;
      }
    });

    this.motionBin = 'motion';

    this.configFile = null;
    this.configPath = null;
    this.camera = [];
    this.config = {};
    this.motion = null;

    this.httpBackendStarted = false;
    this.streamStarted = false;

    return this;
  }

  getConfig() {
    return this.config;
  }

  setConfigPath(path) {
    this.configPath = path;
    this.configFile = this.configPath + 'confcam.conf';
    return this;
  }

  build() {
    if (!this.config || !this.camera.length || !this.configFile) {
      return;
    }

    let config = {};
    Object.assign(config, this.config);
    delete config.thread;

  	config = cleanJsonToConf(config).replace(/username password/g, 'username:password');
    config += os.EOL + 'thread ' + this.config.thread.join(os.EOL + 'thread ');
  	fs.writeFileSync(this.configFile, config);


    this.camera.forEach((el, i) => {
      fs.writeFileSync(process.cwd() + '/tmp/cam' + i + '.conf', cleanJsonToConf(el));
    });

    return this;
  }

  addCam(dataCam) {
    this.camera.push(dataCam);
    if(undefined === this.config.thread){
      this.config.thread = [];
    }

    this.config.thread.push(this.configPath + 'cam' + this.config.thread.length + '.conf');
    return this;
  }

  getCamConfig(index) {
    if(index){
      return this.camera[index];
    }
    else{
      return this.camera;
    }
  }

  setCamConfig(data, index) {
    if(index){
      this.camera[index] = data;
    }
    else{
      this.camera = data;
    }

    return this;
  }

  setConfig(config) {
    Object.assign(this.config, config);
    return this;
  }


  start() {
    var that = this;
    that.stop();

    if (!that.configFile || this.error) {
      return;
    }
    var args = [
      '-n',
      '-d', '6',
      '-c', that.configFile
    ];
    this.motion = spawn(this.motionBin, args);
    this.motion.on('close', function(code) {
      that.emit('exit', 'child process exited with code ' + code);
    });

    var nbCam = this.camera.length;
    var nbPassage = 0;

    this.motion.stderr.on('data', (data) => {
      if(data.toString('utf8').match(/Started motion-stream server in port/g)){
        nbPassage++;
        if(nbPassage === nbCam){
          that.emit('start');
        }
      }
    });
  }

  stop() {
    if (this.motion) {
      this.motion.kill();
    }
  }

  running() {
    if (this.motion) {
      return true;
    }
    return false;
  }
}

export default Motion;
//
// var Motion = function() {
//   const which = spawn('which', ['motion']);
//
//   which.on('close', (code) => {
//     if(1 === code){
//       console.log('Sorry, this module requires Motion to be installed');
//       this.error = true;
//     }
//   });
//
//   this.motionBin = 'motion';
//
//   this.configFile = null;
//   this.configPath = null;
//   this.camera = [];
//   this.config = {};
//   this.motion = null;
//
//   this.httpBackendStarted = false;
//   this.streamStarted = false;
//
//   return this;
// };

// util.inherits(Motion, Emitter);


// Motion.prototype.getConfig = function() {
//   return this.config;
// };
//
// Motion.prototype.setConfigPath = function(path) {
//   this.configPath = path;
//   this.configFile = this.configPath + 'confcam.conf';
//   return this;
// };
//
// Motion.prototype.build = function() {
//   if (!this.config || !this.camera.length || !this.configFile) {
//     return;
//   }
//
//   let config = {};
//   Object.assign(config, this.config)
//   delete config.thread;
//
// 	config = cleanJsonToConf(config).replace(/username password/g, 'username:password');
//   config += os.EOL + 'thread ' + this.config.thread.join(os.EOL + 'thread ');
// 	fs.writeFileSync(this.configFile, config);
//
//
//   this.camera.forEach((el, i) => {
//     fs.writeFileSync(process.cwd() + '/tmp/cam' + i + '.conf', cleanJsonToConf(el));
//   })
//
//   return this;
// };
//
// Motion.prototype.addCam = function(dataCam) {
//   this.camera.push(dataCam);
//   if(undefined === this.config.thread){
//     this.config.thread = [];
//   }
//
//   this.config.thread.push(this.configPath + 'cam' + this.config.thread.length + '.conf');
//   return this;
// };
//
// Motion.prototype.getCamConfig = function(index) {
//   if(index){
//     return this.camera[index];
//   }
//   else{
//     return this.camera;
//   }
// };
//
// Motion.prototype.setCamConfig = function(data, index) {
//   if(index){
//     this.camera[index] = data;
//   }
//   else{
//     this.camera = data;
//   }
//
//   return this;
// };
//
// Motion.prototype.setConfig = function(config) {
//   Object.assign(this.config, config);
//   return this;
// };
//
//
// Motion.prototype.start = function() {
//   var that = this;
//   that.stop();
//
//   if (!that.configFile || this.error) {
//     return;
//   }
//   var args = [
//     '-n',
//     '-d', '6',
//     '-c', that.configFile
//   ];
//   this.motion = spawn(this.motionBin, args);
//   this.motion.on('close', function(code) {
//     that.emit('exit', 'child process exited with code ' + code);
//   });
//
//   var nbCam = this.camera.length;
//   var nbPassage = 0;
//
//   this.motion.stderr.on('data', (data) => {
//     if(data.toString('utf8').match(/Started motion-stream server in port/g)){
//       nbPassage++;
//       if(nbPassage === nbCam){
//         that.emit('start');
//       }
//     }
//   });
// };
//
// Motion.prototype.stop = function() {
//   if (this.motion) {
//     this.motion.kill();
//   }
// };
//
// Motion.prototype.running = function() {
//   if (this.motion) {
//     return true;
//   }
//   return false;
// };
//
//
// module.exports = Motion;
