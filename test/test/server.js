require('babel/register');

var request = require('supertest');
var server = require('./../modules/server');
var socket = require('./../modules/socketClient');


describe('Server', function(){
  before(function (done) {
    server.create();
    socket.connect();

    socket.on('connect', function(socket) {
      done();
    });

    socket.on('connect_error', function() {
      done(new Error('Not connected'));
    })
  });

  after(function () {
    server.close();
  });

  it('responds to /user/login', function testSlash(done) {
    request(server.get('server'))
      .get('/user/login')
      .expect(200, done);
  });

  it('Login', function(done){
    socket.login(function(success){
      if(success){
        done();
      }
      else{
        done(new Error('Login failed'));
      }
    });
  });
});
