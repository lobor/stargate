var fs = require('fs');
var https = require('https');

import { warning, success, error, info} from './../'

export default class PluginsManager{
  constructor(config){
    this.config = config || {};
    this.dbPlugins = {};

    this.plugins = {};

    return this;
  }

  updateDB(){
    let flagState = false;
    try {
      fs.accessSync(this.config.pathProcess + '/tmp/update.json', fs.F_OK);
    } catch (e) {
      flagState = true;
    }

    getFileUpdatePlugin((data) => {
      if(flagState){
        fs.writeFileSync(that.config.pathProcess + '/tmp/update.json', data)
      }

      let update = require(this.config.pathProcess + '/tmp/update.json');
      Object.assign(this.dbPlugins, update, JSON.parse(data));
    });

    return this;
  }

  loadPlugins(path){
    let plugins = fs.readdirSync(this.config.pathProcess + path);

    for(let plugin of plugins){
      this.add(this.config.pathProcess + path + '/' + plugin)
    }
  }

  add(plugin){
    plugin = require(plugin);
    plugin = new plugin();

    plugin.load();

    this.plugins[plugin.props.conf.name] = plugin;
    // console.log(plugin.props.conf.name);
    // info(plugin)
    // this.
  }

  installPlugin(){

  }

  deletePlugin(){

  }
}

function getFileUpdatePlugin(cb){
  var that = this;
  var request = https.get({hostname: "raw.githubusercontent.com", header: {'Content-Type': 'application/json'}, path: "/lobor/stargate/update/update.json"}, function(res) {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      cb(chunk)
    });
  });
}
