var fs = require('fs');
var spawn = require('child_process').spawn;

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
		'name': 'fr:onOff',
		dep: ['visio'],
		'call': function(data, fc){
			if(undefined !== data.state){
				this.visio.stop();
			}
			fc(this.visio.isStarting);
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
		'name': 'fr:delete',
		dep: ['visio'],
		'call': function(data, fc){
			var ls = spawn('rm', ['-Rf', process.cwd() + '/visio/collections/' + data.id]);

			ls.on('close', (code) => {
				if(0 === code){
					this.visio.deleteCollection(data.id);
					fc(true);
				}
			});
		}
	},
	{
		'name': 'fr:update',
		'call': function(data, fc){
			let pathToSaveImg = process.cwd() + '/visio/collections/' + data.name;
			var img, passage = 0;

			data.files.forEach((file, i) => {
				var name = '';
				img = data.files[i].data.replace(/^data:image\/\w+;base64,/, '');
				try {
			    fs.accessSync(pathToSaveImg + '/' + file.name, fs.F_OK);
					name = file.name.replace('.', '0.');
				} catch (e) {
					name = file.name;
				}

	      fs.writeFile(pathToSaveImg + '/' + name, img, {encoding: 'base64'}, function(err){
					passage++;
					if(passage === data.files.length){
						fc({'state': true});
					}
	      });
			})
		}
	},
	{
		'name': 'fr:upload',
		'dep': ['visio'],
		'call': function(data, fc){
			let pathToSaveImg = process.cwd() + '/visio/collections/' + data.name;
			var img, passage = 0;

			try {
        fs.accessSync(process.cwd() + '/visio/collections', fs.F_OK);
      } catch (e) {
        fs.mkdirSync(process.cwd() + '/visio/collections', '0777')
      }

			try {
		    fs.accessSync(pathToSaveImg, fs.F_OK);
			} catch (e) {
		    fs.mkdirSync(pathToSaveImg, '0777');
				this.visio.addCollection(data.name);
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
