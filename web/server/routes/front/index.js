export default [
	{
		'url': '*',
		'type': 'get',
		'dep': ['io'],
		'call': function(req, res){
			// this.io.on('connection', function (socket) {
			// 	socket.on('my other event', function (data) {
			// 		console.log(data);
			// 	});
			// });
			res.sendFile(process.cwd() + '/web/server/html/template.html')
		}
	}
];
