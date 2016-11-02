require('babel/register');

var test = require('unit.js');
var request = require('supertest');



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

  it('responds to /', function testSlash(done) {
    request(server.server)
      .get('/')
      .expect(200, done);
  });

  it('Connection and disconnect socket', function(done){
    client = io.connect('http://localhost:8080', {transports: ['websocket']});
    client.once('connect', function() {
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
