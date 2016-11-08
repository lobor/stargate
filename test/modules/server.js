var db = require(process.cwd() + '/core/db');
var Server = require('./../../web/server/server');
var server;


module.exports = {
  create: function(){
    server = new Server();
    server.start();
  },
  get: function(param){
    if(server[param]){
      return server[param];
    }
    return false;
  },
  close: function(){
    server.http.close();
  },
  set: function(data){
    server.set(data)
  }
};
