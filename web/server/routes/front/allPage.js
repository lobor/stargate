export default [
	{
		'url': '/*',
		'type': 'get',
		'require': ['assets'],
		'call': function(req, res){
			res.render(process.cwd() + '/web/server/html/template.ejs', { assets: this.assets })
			// res.sendFile(process.cwd() + '/web/server/html/template.html', { assets: this.assets })
		}
	}
];
