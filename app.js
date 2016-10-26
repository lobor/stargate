require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		ManagePlugin = require(basePath + '/core/manager/pluginsManager'),
		pluginManager, server;

var fs = require('fs');

// Load config
var ConfigEnv = require(basePath + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);

// Server.start();

// update file list plugins





pluginManager = new ManagePlugin({pathProcess: basePath});
pluginManager
	.updateDB()
	.loadPlugins('/plugins');


server = new Server();


// load plugin routes
for(let pluginName in pluginManager.plugins){
	let plugin = pluginManager.plugins[pluginName];
	server.on('socketLoad', ()=>{
		for(let routeSocket of plugin.routes.api[0]){
			server.addRouteSocket(routeSocket);
		}
	})

	for(let route of plugin.routes.front[0]){
		server.addRoute(route);
	}

	server.assets.push(plugin.assets);
	// server.addRoute({
	// 	type: 'get',
	// 	url: plugin.assets,
	// 	call: (req, res) => {
	// 		res.sendFile(process.cwd() + plugin.assets);
	// 	}
	// })
}



server.start();





// let routesSocket = pluginManager.getRoutesSocket();
