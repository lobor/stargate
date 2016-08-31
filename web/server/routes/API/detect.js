var fs = require('fs');

export default [
	{
		'name': 'detect:get',
		'call': function(data, fc){
			fs.readdir(process.cwd() + '/visio/detect/', function(err, files){
				fc(files);
			});
		}
	},
	{
		'name': 'detect:delete',
		'call': function(data, fc){

			fs.unlink(process.cwd() + '/visio/detect/' + data.picture, function(){
				fc();
			})

			// fs.readdir(process.cwd() + '/visio/detect/', function(err, files){
			// 	fc(files);
			// });
		}
	}
];
