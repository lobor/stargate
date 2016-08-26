var fs = require('fs');

export default [
	{
		'name': 'detect:get',
		'call': function(data, fc){

			fs.readdir(process.cwd() + '/visio/detect/', function(err, files){
				fc(files);
			});
		}
	}
];
