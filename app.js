require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		motion = require(basePath + '/utils/motion'),
		// toolbox = require(basePath + '/web/server/utils/toolbox'),
		fs = require('fs'),
		ManagePlugin = require(basePath + '/core/managePlugin');


// // Load config
// var ConfigApp = require(basePath + '/config/config');
var ConfigEnv = require(basePath + '/config/web/environnement');
// var ConfigAdmin = require(basePath + '/config/web/admin');
// var ConfigMotion = require(basePath + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);


// start server
let server = new Server();


var pluginManager = new ManagePlugin({
	server: server,
	path: basePath + '/plugins/'
});

server
	.set({pluginManager: pluginManager})

pluginManager.on('load:end', (data) => {
	server.setRoutes(data.routes);
	server.setAssets(data.assets);
	server
		.reloadRoutes()
		.reloadFront({add: data.add, delete: data.delete});
		// .loadRoutes()
		// .start();
})

var listPlugins = fs.readdirSync(basePath + '/plugins');
pluginManager.add(listPlugins);

pluginManager.dependencies();

server.start();
