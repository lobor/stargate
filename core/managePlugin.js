/**
 * Plugin Manager
 */

var fs = require('fs');

var basePath = process.cwd();

class ManagePlugin{
  constructor(config){
    this.server = config.server;
    this.path = config.path;
    this.event = {};
    this.plugins = [];

    this.pointPlugin = {};
  }

  loadPlugin(){
    this.add(fs.readdirSync(this.path));
  }

  // load dependencies of plugins
  dependencies(){
    for(let key in this.plugins){
    	let plugin = this.plugins[key],
    	 		dependencies = {server: this.server};
    	for(let keyDep in plugin.props.dependencies){
        dependencies[plugin.props.dependencies[keyDep]] = this.plugins[this.pointPlugin[plugin.props.conf.name]];
    	}
    	plugin.setDependencies(dependencies);
    }
  }

  // Add plugin
  add(plugins){
    var nbPassage = 0,
    routes = [],
    assets = [],
    addPlugin = [];

    this.plugins.forEach((plugin)=>{
      routes = routes.concat(plugin.back.routes);
      assets = assets.concat(plugin.front.assets);
    });

    plugins.forEach((plugin) => {
      plugin = require(this.path + plugin);

      plugin = new plugin();

      plugin.setDependencies({
        server: this.server
      });

      plugin
        .load();

      routes = routes.concat(plugin.back.routes);
      assets = assets.concat(plugin.front.assets);

      addPlugin.push(plugin.front.assets);
      this.plugins.push(plugin);
      this.pointPlugin[plugin.props.conf.name] = this.plugins.length;
    });

    this.dependencies();
    this.emit('load:end', {routes: routes, assets: assets, add: addPlugin});
  }

  // Delete plugin
  delete(namePlugin){
    var routes = [],
    assets = [],
    delPlugin;

    this.plugins = this.plugins.map((plugin)=>{
      if(plugin.props.conf.name === namePlugin){
        plugin.remove();
        delPlugin = plugin.front.assets;
        plugin = undefined;
      }
      else{
        routes = routes.concat(plugin.back.routes);
        assets = assets.concat(plugin.front.assets);
      }


      return plugin;
    });

    this.plugins = this.plugins.filter((plugin)=>{
      return plugin;
    });

    this.dependencies();
    this.emit('load:end', {routes: routes, assets: assets, delete: delPlugin});
  }



  /**
   * Event system
   */
  on(name, cb) {
    this.event[name] = cb;
  }

  off(name) {
    this.event[name] = false;
  }

  emit(event, data) {
    let nameFunction = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    if(typeof this[nameFunction] === 'function'){
      this[nameFunction](data);
    }
    if (this.event[event]) {
    	this.event[event].call(undefined, data);
    }
  }
}





export default ManagePlugin;
