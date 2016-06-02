var isStart = false, 
    server = require('./../../visio/index.js'),
    chalk = require('chalk'),
    exec = require('child_process').exec;
    
module.exports = {
  "command":"visio [command]",
  "description": "manage visio app: start, stop, istart, test",
  "action": function(args, callback) {
    switch (args.command){
      case 'start': 
        if(!isStart){
          isStart = true;
          server.start();
          this.log(chalk.green("The visio has been started !"));
        }
        else{
          this.log("The visio is already started !");
        }
      break;
      case 'test':
        exec('br -algorithm FaceRecognition -compare ' + __dirname + '/../../visio/lunette.jpg ' + __dirname + '/../../visio/sans_lunette.jpg', function(error, stdout, stderr){
          console.log('resultat');
          if (error) {
            console.error(`exec error: ${error}`);
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          console.log('fini');
          // callback();
        });
        break;
      case 'stop': 
        isStart = false;
        server.stop();
        this.log(chalk.green("The visio has been stoped !"));
      break;
      case 'istart': 
        this.log('');
        this.log((isStart) ? chalk.green('[ACTIVE]') + ' The visio is start on 7076' : chalk.red('[INACTIVE]') + ' The visio is not start');
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