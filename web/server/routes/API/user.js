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
		'name': 'lastLogin',
		'dep': ['data'],
		'call': function(data, fc){
			var date = this.data.LastLogin, hour, minutes, day, month;
			hour = (('' + date.getHours()).length > 1 ) ? date.getHours() : '0' + date.getHours();
			minutes = (('' + date.getMinutes()).length > 1 ) ? date.getMinutes() : '0' + date.getMinutes();
			month = (('' + date.getMonth()).length > 1 ) ? date.getMonth() : '0' + date.getMonth();
			day = (('' + date.getDay()).length > 1 ) ? date.getDay() : '0' + date.getDay();

			fc({"lastLogin": day + '/' + month + '/' + date.getFullYear() + ' ' + hour + ':' + minutes});
		}
	},
	{
		'name': 'login',
		'dep': ['data'],
		'call': function(data, fc){
			if(data.name == ConfigAdmin.user && data.password == ConfigAdmin.password){
		    var sess = this.socket.request.session;
		    sess.views = true;
				sess.save();
				this.data.LastLogin = new Date();
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
