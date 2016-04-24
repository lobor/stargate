var server = {},
    express = require('express.io'),
    utils = {
      'emit': function(name, options){
        
      }
    };
    
module.exports = {
  start: function(){
    server.app = express();
    server.app.http().io();

    server.app.get('*', function (req, res) {
      res.sendfile(__dirname + '/index.html');
    });
    //build your realtime-web app

    server.server = server.app.listen(7076);
  },
  stop: function(){
    server.server.close();
    server.app = undefined;
    server.server = undefined;
  },
  isStart: function(){
    return (undefined === server.server);
  }
};