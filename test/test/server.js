require('babel/register');

var test = require('unit.js');
var request = require('supertest');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');



describe('Server', function(){
  var server, io, client;
  before(function (done) {
    server = require('./../web/server/server');
    io = require('socket.io-client');
    server = new server();
    server.start();
    done();
  });

  after(function () {
    server.http.close();
  });

  it('responds to /user/login', function testSlash(done) {
    request(server.server)
      .get('/user/login')
      .expect(200, done);
  });

  it('Connection and disconnect socket', function(done){
    client = io.connect('http://localhost:8080', {transports: ['websocket']});
    client.on('connect', function(socket) {
      console.log(socket);
      client.disconnect();
    });

    client.on('connect_error', function() {
      done(new Error('Not connected'));
    })

    client.once('disconnect', function() {
      done();
    });
  });

});
