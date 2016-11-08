var fs = require('fs');
export default [
	{
		'name': 'logout',
		'require': ['socket'],
		'call': function(data, fc){
			let sess = this.socket.request.session;
			sess.destroy(function(){
				fc({"success":true});
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
		'name': 'user:list',
		'require': ['db'],
		'call': function(data, fc){
			let users = this.db.use('Users').list();
			let rolesTable = this.db.use('Roles');


			for(let key in users){
				users[key].role = rolesTable.findById(users[key].role);
				delete users[key].password;
			}

			fc({"users": users});

		}
	},
	{
		'name': 'lastLogin',
		'require': ['db'],
		'call': function(data, fc){
			let lastLogin = this.db.use('lastLogin').last(5);
			let users = this.db.use('Users');
			let date, hour, minutes, day, month, arrayDate = [];

			for(let date of lastLogin){
				let user = users.findById(date.id_user);

				date = new Date(date.date);
				month = date.getMonth() + 1;
				hour = (('' + date.getHours()).length > 1 ) ? date.getHours() : '0' + date.getHours();
				minutes = (('' + date.getMinutes()).length > 1 ) ? date.getMinutes() : '0' + date.getMinutes();
				month = (('' + month).length > 1 ) ? month : '0' + month;
				day = (('' + date.getDate()).length > 1 ) ? date.getDate() : '0' + date.getDate();

				arrayDate.push({
					date: day + '/' + month + '/' + date.getFullYear() + ' ' + hour + ':' + minutes,
					user: user.username
				});
			}

			fc({"lastLogin": arrayDate});
		}
	},
];
