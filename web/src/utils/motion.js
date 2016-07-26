var spawn = require('child_process').spawn;
var _ = require('lodash');

var shell = require('shelljs');

var Emitter = require('events').EventEmitter;
var util = require('util');

var supportedVersions = [
  '3_2_12',
  '3_2_12_git20140228'
];

var Motion = function(path) {

  if (path && !shell.test('-e', path)) {
    shell.echo('Sorry, this module cannot find motion on given path: ' + path);
    process.exit(1);
  } else if (!shell.which('motion')) {
    shell.echo('Sorry, this module requires Motion to be installed');
    process.exit(1);
  }

  this.motionBin = path || 'motion';
  this.version = this.getVersion();

  if (!_.includes(supportedVersions, this.version)) {
    shell.echo('Sorry, motion version ' + this.version + ' is not supported');
    process.exit(1);
  }

  this.configFile = null;
  this.motion = null;

  this.httpBackendStarted = false;
  this.streamStarted = false;

  this.messageArray = [
    {version: '3_2_12', regex: /^motion-httpd: waiting for data on port TCP (\d+)/, action: 'backend'},
    {version: '3_2_12', regex: /^Started stream webcam server in port (\d+)/, action: 'stream'},
    {version: '3_2_12_git20140228', regex: /httpd_run: motion-httpd: waiting for data on (localhost|\d\.\d\.\d\.\d) port TCP (\d+)/, match: 2, action: 'backend'},
    {version: '3_2_12_git20140228', regex: /motion_init: Started motion-stream server in port (\d+).*$/, action: 'stream'}
  ];
};

util.inherits(Motion, Emitter);

Motion.prototype.getVersion = function(){
  var helpCmd = this.motionBin + ' -h | head -n 1';
  var versionRegEx = /^motion Version ([\d\.\+a-z]+), .*$/;
  var version = shell.exec(helpCmd, {silent: true}).stdout.replace(/\n/, '');
  if (version === '') {
    shell.echo('Sorry, cannot determine Motion version for given Motion binary on : ' + this.motionBin);
    process.exit(1);
  } else {
    var res = versionRegEx.exec(version);
    if (res) {
      return res[1].replace(/\./g, '_').replace(/\+/g, '_');
    } else {
      shell.echo('Sorry, cannot determine Motion version, or version is not supported');
      process.exit(1);
    }
  }
  return null;
};

Motion.prototype.setConfig = function(configFile) {
  if (!configFile) {
    return;
  }
  if (!shell.test('-e', configFile)) {
    shell.echo('Sorry, the provided configuration file cannot be found : ' + configFile);
    //process.exit(1);
  } else {
    this.configFile = configFile;
  }
};

Motion.prototype.start = function(){
  var that = this;
  that.stop();
  if (!that.configFile) {
    return;
  }
  var args = [
    '-n',
    '-d', '6',
    '-c', that.configFile
  ];
  this.motion = spawn(this.motionBin, args);
  this.motion.stdout.on('data', function (data) {
    that.processData(data);
  });
  this.motion.stderr.on('data', function (data) {
    that.processData(data);
  });
  this.motion.on('close', function (code) {
    that.emit('exit', 'child process exited with code ' + code);
  });
};

Motion.prototype.stop = function() {
  if (this.motion) {
    this.motion.kill();
  }
};

Motion.prototype.running = function(){
  if (this.motion) {
    return true;
  }
  return false;
};

Motion.prototype.checkMessages = function(msg) {
  var that = this;
  var matched = false;
  var payload = null;
  _.forEach(that.messageArray, function (message) {
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
  switch(matched) {
  case false:
    break;
  case 'backend':
    that.httpBackendStarted = payload;
    that.emit('msg', { action: matched, value: payload });
    break;
  case 'stream':
    that.streamStarted = payload;
    that.emit('msg', { action: matched, value: payload });
    break;
  default:
    break;
  }
};

Motion.prototype.processData = function(data) {
  var that = this;
  var regex = /^(\[[\dA-Z]+\]\ )+(.*)$/g;
  var strings = data.toString('ascii').split('\n');

  var msgs = _.chain(strings)
    .filter(function(msg) {
      return msg !== '';
    })
    .map(function (line) {
      return line.replace('\t', '').replace(regex, '$2');
    })
    .forEach(that.checkMessages.bind(that))
    .forEach(function (line) {
      that.emit('debug', line);
    })
    .value();

  return msgs;
};

module.exports = Motion;