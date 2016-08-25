var usage = require('usage');
var cpu = false;

export default [
	{
		'name': 'cpu',
		'call': function(data, fc){
      let socket = this.socket;
      if(false === cpu){
        cpu = setInterval(function(){
          usage.lookup(process.pid, function(err, result) {
            socket.emit('cpu:change', result);
          });
        }, 1000);
      }
		}
	},
  {
		'name': 'cpu:stop',
		'call': function(data, fc){
      if(false !== cpu){
        clearInterval(cpu);
        cpu = false;
      }
		}
	}
];
