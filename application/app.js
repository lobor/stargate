var commands = require('./commands/bootstarp');
var vm = {
  vantage: require("vantage")(),
  isStart: false
};

for(var key in commands){
  var command = commands[key];
  vm.vantage
    .command(command.command)
    .description(command.description)
    .action(command.action);
    
  if(command.onLoad){
    command.onLoad();
  }
}
// vm.vantage
//   .command('test')
//   .description('return toto')
//   .action(function(){
//     this.log('toto')
//   });
vm.vantage
  .delimiter("Application~$")
  .listen(8080, function(){
    console.log('WELCOME your are connected');
  })
  .show();
