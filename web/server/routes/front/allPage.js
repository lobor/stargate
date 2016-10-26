export default [
	{
		'url': '*',
		'type': 'get',
		'require': ['assets'],
		'call': function(req, res){
			// this.io.on('connection', function (socket) {
			// 	socket.on('my other event', function (data) {
			// 		console.log(data);
			// 	});
			// });
			res.render(process.cwd() + '/web/server/html/template.ejs', { assets: this.assets })
			// res.sendFile(process.cwd() + '/web/server/html/template.html')
		}
	}
];
