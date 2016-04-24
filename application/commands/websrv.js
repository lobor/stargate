var isStart = false, 
    server = require('./../../web/server.js');
module.exports = {
  "command":"websrv <command>",
  "description": "start",
  "action": function(args, callback) {
    switch (args.command){
      case 'start': 
        if(!this.isStart){
          this.isStart = true;
          server.start();
          this.vantage.log("The server has been started !");
        }
        else{
          this.vantage.log("The server is already started !");
        }
      break;
      case 'stop': 
        this.isStart = false;
        server.stop();
        this.vantage.log("The server has been stoped !");
      break;
      case 'isStart': 
        this.vantage.log((this.isStart) ? 'The server is start' : 'The server is not start');
      break;
      default:
        this.vantage.log('');
        this.vantage.log('  Invalid Command.');
        this.vantage.log('');
        this.vantage.log('  Commands:');
        this.vantage.log('');
        this.vantage.log('    start');
        this.vantage.log('    stop');
        this.vantage.log('    isStart');
        this.vantage.log('');
        this.vantage.log('');
        this.vantage.log('');
      break;
    }
    callback();
  }
};