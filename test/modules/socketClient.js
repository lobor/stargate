var io = require('socket.io-client');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var db = require(process.cwd() + '/core/db')(process.cwd() + '/db');
var client;

module.exports = {
  connect: function(){
    client = io.connect('http://localhost:8080', {transports: ['websocket']});
  },
  on: function(event, cb){
    client.on(event, cb);
  },
  off: function(event){
    client.off(event);
  },
  emit: function(name, data, cb){
    client.emit(name, data, cb);
  },
  disconnect: function(){
    client.disconnect();
  },
  login: function(cb){
    let admin = db.use('Users').findOne({username: "admin"});
    client.emit('login', {
			name: admin.username,
			password: admin.password
		}, function(data){
      if(data.success){
        cb(true);
			}
			else{
        cb(false);
			}
    })
  }
}
