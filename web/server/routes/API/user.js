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
			var date, hour, minutes, day, month, arrayDate = [];

			for(var key in this.data.LastLogin){
				date = this.data.LastLogin[key];
				month = date.getMonth() + 1;
				hour = (('' + date.getHours()).length > 1 ) ? date.getHours() : '0' + date.getHours();
				minutes = (('' + date.getMinutes()).length > 1 ) ? date.getMinutes() : '0' + date.getMinutes();
				month = (('' + month).length > 1 ) ? month : '0' + month;
				day = (('' + date.getDate()).length > 1 ) ? date.getDate() : '0' + date.getDate();

				arrayDate.push(day + '/' + month + '/' + date.getFullYear() + ' ' + hour + ':' + minutes);
			}

			fc({"lastLogin": arrayDate});
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

				if('[object Array]' !== Object.prototype.toString.call(this.data.LastLogin)){
					this.data.LastLogin = [];
				}

				if(5 === this.data.LastLogin.length){
					this.data.LastLogin.shift();
				}

				this.data.LastLogin.push(new Date());

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
