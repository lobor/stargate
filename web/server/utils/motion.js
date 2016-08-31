var cp = require('child_process');
var spawn = cp.spawn;
var exec = cp.exec;

var shell = require('shelljs');

var fs = require('fs');
var os = require("os");

var Emitter = require('events').EventEmitter;
var util = require('util');

var supportedVersions = [
  '3_2_12',
  '3_2_12_git20140228'
];

var Motion = function(path) {
  if(path){
    try{
      fs.accessSync(path, fs.constants.F_OK);
    }
    catch (e){
      this.error = true;
      console.log('Sorry, this module cannot find motion on given path: ' + path);
    }
  } else {
    const which = spawn('which', ['motion']);
    which.stdout.on('data', (data) => {
      this.motionBin = path || 'motion';
      this.version = this.getVersion();

      if (-1 === supportedVersions.indexOf(this.version)) {
        console.log('Sorry, motion version ' + this.version + ' is not supported');
      }

      this.configFile = null;
      this.motion = null;

      this.httpBackendStarted = false;
      this.streamStarted = false;

      this.messageArray = [{
        version: '3_2_12',
        regex: /^motion-httpd: waiting for data on port TCP (\d+)/,
        action: 'backend'
      }, {
        version: '3_2_12',
        regex: /^Started stream webcam server in port (\d+)/,
        action: 'stream'
      }, {
        version: '3_2_12_git20140228',
        regex: /httpd_run: motion-httpd: waiting for data on (localhost|\d\.\d\.\d\.\d) port TCP (\d+)/,
        match: 2,
        action: 'backend'
      }, {
        version: '3_2_12_git20140228',
        regex: /motion_init: Started motion-stream server in port (\d+).*$/,
        action: 'stream'
      }];
    });

    which.on('close', (code) => {
      if(1 === code){
        console.log('Sorry, this module requires Motion to be installed');
        this.error = true;
      }
    });
  }
};

util.inherits(Motion, Emitter);

Motion.prototype.getVersion = function() {
  if(!this.error){
    var helpCmd = this.motionBin + ' -h | head -n 1';
    var versionRegEx = /^motion Version ([\d\.\+a-z]+), .*$/;
    var version;
    exec(helpCmd, (error, stdout, stderr) => {
      version = stdout.replace(/\n/, '');
      if (version === '') {
        console.log('Sorry, cannot determine Motion version for given Motion binary on : ' + this.motionBin);
      } else {
        var res = versionRegEx.exec(version);
        if (res) {
          return res[1].replace(/\./g, '_').replace(/\+/g, '_');
        } else {
          console.log('Sorry, cannot determine Motion version, or version is not supported');
        }
      }
    });
  }
  else{
    return null;
  }
};

Motion.prototype.getConfig = function() {
  return this.config;
};

Motion.prototype.setConfig = function(config, pathFile, auth) {
  if (!config || !pathFile) {
    return;
  }
  this.config = config;
	config = JSON.stringify(config)
		.replace(/({|}|'|")/g, '')
		.replace(/:/g, ' ')
		.replace(/,/g, os.EOL)
    .replace(/username password/g, auth || 'username:password');

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
  this.motion.stdout.on('data', function(data) {
    that.processData(data);
  });
  this.motion.stderr.on('data', function(data) {
    that.processData(data);
  });
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

Motion.prototype.checkMessages = function(msg) {
  var that = this;
  var matched = false;
  var payload = null;
  that.messageArray.forEach(function(message) {
    if (message.version !== that.version) {
      return;
    }
    if (message.msg && msg.indexOf(message.msg) !== -1) {
      matched = message.action;
    }
    if (message.regex) {
      var res = message.regex.exec(msg);
      if (res) {
        matched = message.action;
        var match = message.match || 1;
        payload = res[match];
      }
    }
  });
  switch (matched) {
    case false:
      break;
    case 'backend':
      that.httpBackendStarted = payload;
      that.emit('msg', {
        action: matched,
        value: payload
      });
      break;
    case 'stream':
      that.streamStarted = payload;
      that.emit('msg', {
        action: matched,
        value: payload
      });
      break;
    default:
      break;
  }
};

Motion.prototype.processData = function(data) {
  var that = this;
  var regex = /^(\[[\dA-Z]+\]\ )+(.*)$/g;
  var strings = data.toString('ascii').split('\n');

  // var msgs = _.chain(strings)
  var msgs = strings.filter(function(msg) {
      return msg !== '';
    })
    .map(function(line) {
      return line.replace('\t', '').replace(regex, '$2');
    });
  msgs.forEach(that.checkMessages.bind(that));

  msgs.forEach(function(line) {
      that.emit('debug', line);
    });

  return msgs;
};

module.exports = Motion;
