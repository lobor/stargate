require('babel/register');

var pluginManager = require('./../modules/pluginManager');
var server = require('./../modules/server');

var socket = require('./../modules/socketClient');


describe('pluginManager', function() {
	before(function(done) {
		server.create();
		pluginManager.create();
    server.set({pluginManager: pluginManager.getPluginManager()})
		socket.connect();

		socket.on('connect', function() {
			socket.login(function(success) {
				if (success) {
					done();
				} else {
					done(new Error('Login failed'));
				}
			});
		});

		socket.on('connect_error', function() {
			done(new Error('Not connected'));
		})
	});

	after(function() {
		server.close();
	});

	it('get file update plugins', function testSlash(done) {
		pluginManager.updateDb();
		done();
	});

	it('load plugins', function testSlash(done) {
		pluginManager.loadPlugins();
		done();
	});

	describe('install / uninstall plugin', function() {
		it('Install', function(done) {
      this.timeout(0)
			socket.emit('plugins:install', {
				"name": "sample",
				"url": "https://github.com/lobor/stargate-plugin-sample",
				"version": "1.0.0",
				"description": "Sample plugin"
			}, function(data) {
				if (data.success) {
					done()
				} else {
					done(new Error('Install failed'))
				}
			});
		});

    it('Uninstall', function(done){
      this.timeout(0)
  	  socket.emit('plugins:uninstall', {
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
});
