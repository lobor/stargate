require('babel/register');

var basePath = process.cwd(),
		Server = require(basePath + '/web/server/server'),
		ManagePlugin = require(basePath + '/core/manager/pluginsManager'),
		pluginManager, server;

var fs = require('fs');

// Load config
var ConfigEnv = require(basePath + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);



pluginManager = new ManagePlugin({pathProcess: basePath});
pluginManager
	.updateDB()
	.loadPlugins('/plugins');


server = new Server();

// load plugin routes
loadRouteOnServer(pluginManager.plugins);


pluginManager.on('addPlugin', (pluginName) => {
	let plugin = pluginManager.getPlugin(pluginName);
	server.io.emit('assets:add', plugin.assets)


	server.stop();
	loadRouteOnServer(pluginManager.plugins);

	server.start();
});

pluginManager.on('deletePlugin', (assets) => {
	server.io.emit('assets:delete', assets)


	server.stop();
	loadRouteOnServer(pluginManager.plugins);

	server.start();
})


server.set({pluginManager: pluginManager})
server.start();


function loadRouteOnServer(plugins){
	for(let pluginName in plugins){
		let plugin = plugins[pluginName];
		server.on('socketLoad', ()=>{
			for(let routeSocket of plugin.routes.api){
				server.addRouteSocket(routeSocket);
			}
		})

		for(let route of plugin.routes.front){
			server.addRoute(route);
		}

		if(-1 === server.assets.indexOf(plugin.assets))
			server.assets.push(plugin.assets);
	}
}


// let routesSocket = pluginManager.getRoutesSocket();
