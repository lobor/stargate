var fs = require('fs');

var pathProcess = process.cwd();
var pathVisioDetect = pathProcess + '/visio/detect/';

export default [
	{
		'name': 'detect:get',
		'call': function(data, fc){
			fs.readdir(pathVisioDetect, function(err, dirs){
				var files = [];
				dirs.forEach((dir) => {
					files = files.concat(fs.readdirSync(pathVisioDetect + dir).map((file)=>{
						return dir + '/' + file
					}));
				})
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
		}
	}
];
