var usage = require('usage');
var cpu = false;

export default [
	{
		'name': 'cpu',
		'require': ['socket'],
		'call': function(data, fc){
      let socket = this.socket;
      cpu = setInterval(function(){
        usage.lookup(process.pid, function(err, result) {
          socket.emit('cpu:change', result);
        });
      }, 1000);
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
