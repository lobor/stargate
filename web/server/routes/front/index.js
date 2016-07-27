export default [
	{
		'url': '*',
		'type': 'get',
		'call': function(req, res){
			res.render('template', {
				output: ''
			});
		}
	}
];
