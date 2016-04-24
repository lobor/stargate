var isStart = false, 
    server = require('./../../motor/index.js'),
    chalk = require('chalk');
module.exports = {
  "command":"motor <command>",
  "description": "start",
  "action": function(args, callback) {
    switch (args.command){
      case 'start': 
        this.isStart = true;
        server.start({
            events:{
              "quit":function(){
                callback();
              }
            }
          });
        this.vantage.log(chalk.green('Command motor manual enable'));
      break;
      default:
        this.vantage.log('');
        this.vantage.log('  Invalid Command.');
        this.vantage.log('');
        this.vantage.log('  Commands:');
        this.vantage.log('');
        this.vantage.log('    start');
        this.vantage.log('');
        this.vantage.log('');
        this.vantage.log('');
      break;
    }
    // callback();
  }
};