var fs = require('fs');

export default [
	{
		'name': 'fr:list',
		'call': function(data, fc){
			fs.readdir(process.cwd() + '/visio/collections/', function(err, files){
				fc(files);
			});
		}
	},
	{
		'name': 'fr:get',
		'call': function(data, fc){
			fs.readdir(process.cwd() + '/visio/collections/' + data.id, function(err, files){
				fc(files);
			});
		}
	},
	{
		'name': 'fr:upload',
		'call': function(data, fc){
			let pathToSaveImg = process.cwd() + '/visio/collections/' + data.name;
			var img, passage = 0;
			try {
		    fs.accessSync(pathToSaveImg, fs.F_OK);
			} catch (e) {
		    fs.mkdirSync(pathToSaveImg, '0777');
			}

			data.files.forEach((file, i) => {
				img = data.files[i].data.replace(/^data:image\/\w+;base64,/, '');
	      fs.writeFile(pathToSaveImg + '/' + file.name, img, {encoding: 'base64'}, function(err){
					passage++;
					if(passage === data.files.length){
						fc({'state': true});
					}
	      });
			})
		}
	}
];
