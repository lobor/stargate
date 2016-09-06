export default [
	{
		'url': '/facerecognition/img/:nameCollection/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/visio/collections/' + req.params.nameCollection + '/' + req.params.img);
		}
	}
];
