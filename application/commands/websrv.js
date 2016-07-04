var isStart = false, 
    server = require('./../../web/server.js'),
    chalk = require('chalk');
    
module.exports = {
  "command":"websrv <command>",
  "description": "Command which manage web server: start, stop, istart",
  "onLoad": function(){
    isStart = true;
    server.start();
  },
  "action": function(args, callback) {
    switch (args.command){
      case 'start': 
        if(!isStart){
          isStart = true;
          server.start();
          this.log(chalk.green("The server has been started !"));
        }
        else{
          this.log("The server is already started !");
        }
      break;
      case 'stop': 
        isStart = false;
        server.stop();
        this.log(chalk.green("The server has been stoped !"));
      break;
      case 'istart': 
        this.log('');
        this.log((isStart) ? chalk.green('[ACTIVE]') + ' The server is start on 7076' : chalk.red('[INACTIVE]') + ' The server is not start');
        this.log('');
      break;
      default:
        this.log('');
        this.log('  Invalid Command.');
        this.log('');
        this.log('  Commands:');
        this.log('');
        this.log('    start');
        this.log('    stop');
        this.log('    isStart');
        this.log('');
        this.log('');
        this.log('');
      break;
    }
    callback();
  }
};