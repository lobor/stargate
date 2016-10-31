var spawn = require('child_process').spawn;
var fs = require('fs');
var pathProcess = process.cwd();

export default [
	{
		'name': 'plugins:get',
		'call': function(data, fc){
			var plugins = require(pathProcess + '/config/plugins/status').installed;
			var updates = require(pathProcess + '/tmp/update').plugins;
			for(let update of updates){
				update.installed = (-1 !== plugins.indexOf(update.name)) ? true : false;
			}
			fc(updates);
		}
	},
	{
		'name': 'plugins:install',
		'require': ['pluginManager'],
		'call': function(data, fc){
			var ls = spawn('git', ['clone', data.url, data.name], {cwd: pathProcess + '/plugins'});
			let error = [];

			ls.stderr.on('data', (data) => {
				error.push(data.toString('utf-8'));
			});

			ls.on('close', (code) => {
				if(code === 0){
					ls = spawn('npm', ['install', '--production'], {cwd: pathProcess + '/plugins/' + data.name + '/'});

					ls.stderr.on('data', (data) => {
					  error.push(data.toString('utf-8'));
					});

					ls.on('close', (code) => {
						if(code === 0){
							fc({
								success: true,
							});
							var plugins = require(pathProcess + '/config/plugins/status');

							plugins.installed.push(data.name);
							fs.writeFileSync(pathProcess + '/config/plugins/status.js', 'module.exports = ' + JSON.stringify(plugins) + ';');
							this.pluginManager.add(pathProcess + '/plugins/' + data.name);
							this.pluginManager.emit('addPlugin', data.name);
						}
						else{
							fc({
								success: false,
								error: error
							});
							removeDirectory(pathProcess + '/plugins', data.name);
						}
					});
				}
				else{
					fc({
						success: false,
						error: error
					});
				}
			});
		}
	},
	{
		'name': 'plugins:uninstall',
		'require': ['pluginManager'],
		'call': function(data, fc){

			removeDirectory(pathProcess + '/plugins', data.name, (success) => {
				if(success){
					var plugins = require(pathProcess + '/config/plugins/status');

					plugins.installed = plugins.installed.filter((plugin) => {
						return plugin !== data.name;
					})

					;
					this.pluginManager.emit('deletePlugin', this.pluginManager.getPlugin(data.name).assets);
					this.pluginManager.delete(data.name);

					fs.writeFileSync(pathProcess + '/config/plugins/status.js', 'module.exports = ' + JSON.stringify(plugins) + ';');
					fc({
						success: true
					})
				}
				else{
					fc({
						success: false
					})
				}
			})
		}
	}
];

function removeDirectory(path, directory, cb){
	var ls = spawn('rm', ['-Rf', directory], {cwd: path});
	ls.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
		if(cb){
			if(code === 0){
				cb(true);
			}
			else{
				cb(false);
			}
		}
	});
}
