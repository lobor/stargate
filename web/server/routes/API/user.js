var ConfigAdmin = require(process.cwd() + '/config/web/admin');

export default [
	{
		'url': '/user/logout',
		'type': 'get',
		'call': function(req, res){
			let sess = req.session;
			sess.destroy(function(){
				res.status(200).json({
					"response":true
				});
			});
		}
	},
	{
		'url': '/user/login',
		'type': 'post',
		'call': function(req, res){
			if(req.body.name == ConfigAdmin.user && req.body.password == ConfigAdmin.password){
				var sess = req.session;
				sess.views = true;
				res.status(200).json({
					"response":true
				});
			}
			else{
				res.status(403).json({
					"response":false,
					"errors": {
						"message": "Is not good user name or password"
					}
				});
			}
		}
	}
];
