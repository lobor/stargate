var ConfigAdmin = require(process.cwd() + '/config/web/admin');

var fs = require('fs');

export default [
	{
		'url': '/api/detect',
		'type': 'get',
		'call': function(req, res){

			fs.readdir(process.cwd() + '/visio/motion_detection/', function(err, files){
				if(err){
					res.status(200).json({
						"response":false
					});
				}
				else{
					res.status(200).json({
						"response": {
							videos: files.map((el) => {return {name: el};})
						},
					});
				}
			});
		}
	}
];
