export default [
	// {
	// 	'url': '/user/logout',
	// 	'type': 'get',
	// 	'call': function(req, res){
	// 		let sess = req.session;
	// 		sess.destroy(function(){
	// 			res.status(200).json({
	// 				"response":true
	// 			});
	// 		});
	// 	}
	// },
	{
		'url': 'login',
		// 'type': 'post',
		// 'call': function(){
		// 	return {
		// 		read: require('./user/create').bind(this)
		// 	};
		// },
		// 'call': require('./user/create')
		'call': function(){
			console.log(5);
		}
	}
];
