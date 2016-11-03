var pluginManager = require('./../../core/manager/pluginsManager');
var basePath = process.cwd();



module.exports = {
  create: function(){
    pluginManager = new pluginManager({pathProcess: basePath});
  },
  updateDb: function(){
    pluginManager.updateDB();
  },
  loadPlugins: function(){
    pluginManager.loadPlugins('/plugins');
  },
  getPluginManager: function(){
    return pluginManager;
  },
}
