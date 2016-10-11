var spawn = require('child_process').spawn;
var fs = require('fs');
var pathProcess = process.cwd();

export default [
	{
		'name': 'plugins:get',
		'call': function(data, fc){
			var plugins = require(pathProcess + '/config/plugins/status');

			fc(plugins);
		}
	},
	{
		'name': 'plugins:install',
		'call': function(data, fc){
			var ls = spawn('git', ['clone', data.url, data.name], {cwd: pathProcess + '/plugins'});
			ls.stdout.on('data', (data) => {
			  console.log(`stdout: ${data}`);
			});

			ls.stderr.on('data', (data) => {
			  console.log(`stderr: ${data}`);
			});

			ls.on('close', (code) => {
				if(code === 0){
					console.log(data.name, pathProcess + '/plugins/' + data.name + '/');
					// ls = spawn('npm', ['install', '--production'], {cwd: process.cwd() + '/plugins/face/'});
					ls = spawn('npm', ['install', '--production'], {cwd: pathProcess + '/plugins/' + data.name + '/'});

					ls.stdout.on('data', (data) => {
					  console.log(`stdout: ${data}`);
					});

					ls.stderr.on('data', (data) => {
					  console.log(`stderr: ${data}`);
					});

					ls.on('close', (code) => {
						if(code === 0){
							var plugins = require(pathProcess + '/config/plugins/status');

							plugins.installed.push(data.name);
							fs.writeFileSync(pathProcess + '/config/plugins/status.js', 'module.exports = ' + JSON.stringify(plugins) + ';');

							fc({
								success: true
							})
						}
					});
				}
			});
		}
	},
	{
		'name': 'plugins:uninstall',
		'call': function(data, fc){
			var ls = spawn('rm', ['-Rf', data.name], {cwd: pathProcess + '/plugins'});
			ls.stdout.on('data', (data) => {
			  console.log(`stdout: ${data}`);
			});

			ls.stderr.on('data', (data) => {
			  console.log(`stderr: ${data}`);
			});

			ls.on('close', (code) => {
				if(code === 0){
					var plugins = require(pathProcess + '/config/plugins/status');

					plugins.installed = plugins.installed.filter((plugin) => {
						return plugin !== data.name;
					})

					fs.writeFileSync(pathProcess + '/config/plugins/status.js', 'module.exports = ' + JSON.stringify(plugins) + ';');
					fc({
						success: true
					})
				}
			});
		}
	}
];
