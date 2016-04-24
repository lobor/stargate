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
    .action(command.action.bind(vm));
}
// Add the command "foo", which logs "bar".

vm.vantage
  .delimiter("Application~$")
  .listen(8080)
  .show();
