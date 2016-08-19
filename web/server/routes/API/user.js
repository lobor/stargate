var ConfigAdmin = require(process.cwd() + '/config/web/admin');
export default [
	{
		'name': 'logout',
		'call': function(data, fc){
			let sess = this.socket.request.session;
			sess.destroy(fc.bind(undefined, {"response":true}));//{
		}
	},
	{
		'name': 'login',
		'call': function(data, fc){
			if(data.name == ConfigAdmin.user && data.password == ConfigAdmin.password){
		    var sess = this.socket.request.session;
		    sess.views = true;
				sess.save();
		    fc({
		      "response":true
		    });
		  }
		  else{
		    fc({
		      "response":false,
		      "errors": {
		        "message": "Is not good user name or password"
		      }
		    });
		  }
		}
	}
];
