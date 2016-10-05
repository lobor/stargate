require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		motion = require(basePath + '/utils/motion'),
		// toolbox = require(basePath + '/web/server/utils/toolbox'),
		fs = require('fs');


// // Load config
// var ConfigApp = require(basePath + '/config/config');
var ConfigEnv = require(basePath + '/config/web/environnement');
// var ConfigAdmin = require(basePath + '/config/web/admin');
// var ConfigMotion = require(basePath + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);


// start server
let server = new Server();

// load plugins
var plugins = {};
var listPlugins = fs.readdirSync(basePath + '/plugins');
var nbPassage = 0;

listPlugins
	.forEach((pluginName, index) => {
		let plugin = require(basePath + '/plugins/' + pluginName);
		plugin = new plugin();
		plugin.on('back', () => {
			server.setRoutes(plugin.back.routes);
		});

		plugin.on('front', () => {
			if(plugin.front.assets !== ''){
				server.setAssets(plugin.front.assets);
			}
			nbPassage++;
		});

		plugin.loadConfig()
			.loadBack()
			.loadFront();
	});

// load dependencies of plugins
for(let key in plugins){
	let plugin = plugins[key],
	 		dependencies = {};
	for(let keyDep in plugin.props){
		dependencies[keyDep] = plugins[plugin.props[keyDep]];
	}
	plugin.setDependencies(dependencies);
}

// console.log(plugins);

// console.log(plugins.face.props);
// plugins.face.setConfig({});

// start server
// let server = new Server();

if(nbPassage === listPlugins.length){
	server
	// 	.set(config)
	.loadRoutes()
	.start();
}
