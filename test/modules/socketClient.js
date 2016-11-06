var io = require('socket.io-client');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
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
    client.emit('login', {
			name: ConfigAdmin.user,
			password: ConfigAdmin.password
		}, function(data){
      if(data.response){
        cb(true);
			}
			else{
        cb(false);
			}
    })
  }
}
