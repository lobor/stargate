var cp = require('child_process');
var fs = require('fs');
var os = require("os");

var Emitter = require('events').EventEmitter;
var util = require('util');
var spawn = cp.spawn;
var exec = cp.exec;

var Motion = function() {
  const which = spawn('which', ['motion']);

  which.on('close', (code) => {
    if(1 === code){
      console.log('Sorry, this module requires Motion to be installed');
      this.error = true;
    }
  });

  this.motionBin = 'motion';

  this.configFile = null;
  this.config = {};
  this.motion = null;

  this.httpBackendStarted = false;
  this.streamStarted = false;

};

util.inherits(Motion, Emitter);


Motion.prototype.getConfig = function() {
  return this.config;
};

Motion.prototype.setConfig = function(config, pathFile, auth) {
  if (!config || !pathFile) {
    return;
  }
  Object.assign(this.config, config)
  delete config.thread;
	config = JSON.stringify(config)
		.replace(/({|}|'|")/g, '')
		.replace(/:/g, ' ')
		.replace(/,/g, os.EOL)
    .replace(/username password/g, auth || 'username:password');

  config += os.EOL + 'thread ' + this.config.thread.join(os.EOL + 'thread ');
	fs.writeFileSync(pathFile, config);

	this.configFile = pathFile;
  return this;
};


Motion.prototype.start = function() {
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
};

Motion.prototype.stop = function() {
  if (this.motion) {
    this.motion.kill();
  }
};

Motion.prototype.running = function() {
  if (this.motion) {
    return true;
  }
  return false;
};


module.exports = Motion;
