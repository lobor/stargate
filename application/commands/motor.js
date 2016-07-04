var isStart = false, 
    server = require('./../../motor/index.js'),
    chalk = require('chalk');
module.exports = {
  "command":"motor",
  "description": "manage motor manual",
  "action": function(args, callback) {
    server.start({
      events:{
        "quit":function(){
          this.log(chalk.green('Command motor manual disable'));
          callback();
        }
      }
    });
    this.log(chalk.green('Command motor manual enable'));
  }
};