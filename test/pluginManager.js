require('babel/register');
var test = require('unit.js');
var request = require('supertest');



describe('pluginManager', function(){
  var pluginManager, server, client;

  before(function (done) {
    var basePath = process.cwd();
    pluginManager = require('./../core/manager/pluginsManager');

    pluginManager = new pluginManager({pathProcess: basePath});

    server = require('./../web/server/server');
    server = new server();
    server.set({pluginManager: pluginManager})
    server.start();

    var io = require('socket.io-client');
    client = io.connect('http://localhost:8080', {transports: ['websocket']});
    done();
  });

  after(function () {
    server.http.close();
  });

  it('get file update plugins', function testSlash(done) {
    pluginManager
    	.updateDB();
    done();
  });

  it('load plugins', function testSlash(done) {
    pluginManager
    	.loadPlugins('/plugins');
    done();
  });

  it('Install plugin', function(done){
    client.emit('plugins:install', {
      "name":"sample",
      "url":"https://github.com/lobor/stargate-plugin-sample",
      "version":"1.0.0",
      "description": "Sample plugin"
    }, function(data) {
      if(data.success){
        done();
      }
      else{
        done(new Error('Install failed'))
      }
    });
  });

  it('Uninstall plugin', function(done){
    client.emit('plugins:uninstall', {
      "name":"sample",
      "url":"https://github.com/lobor/stargate-plugin-sample",
      "version":"1.0.0",
      "description": "Sample plugin"
    }, function(data) {
      if(data.success){
        done();
      }
      else{
        done(new Error('Uninstall failed'))
      }
    });
  })
});
