var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var fs = require('fs');
export default [
	{
		'name': 'logout',
		'call': function(data, fc){
			let sess = this.socket.request.session;
			sess.destroy(function(){
				fc({"response":true});
			});
		}
	},
	{
		'name': 'user:changePassword',
		'call': function(data, fc){
			console.log((data.new_password == data.confirm_new_password));
			if(data.old_password == ConfigAdmin.password && data.new_password == data.confirm_new_password){
				fs.writeFile(process.cwd() + '/config/web/admin.js', 'module.exports = {user: "' + ConfigAdmin.user + '", password: "' + data.new_password + '"};',
					function(){
						ConfigAdmin.password = data.new_password;
						fc({"response":true});
					});
			}
			else{
					fc({"response":false});
			}
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
