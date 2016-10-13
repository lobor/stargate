/**
 * Base Class of plugins whend laod on server
 */


import { success, error, warning } from './console';
var fs = require('fs');

var pathConfig = '/config/config.js';
var rootPath = process.cwd();
var pathPlugin = rootPath  + '/plugins/';

class Plugin {
	constructor() {
    this.event = {};

		return this;
	}

	loadBack() {
    load.call(this, '/back/', (error, data) => {
      if(!error){
        this.back = data;
      }
      this.emit('back', error);
    });
		return this;
	}

	// loadConfig() {
  //   load.call(this, pathConfig, (error, data) => {
  //     if(!error){
  //       this.config = data;
  //     }
  //     this.emit('config', error);
  //   });
	// 	return this;
	// }

	remove(){
		this.event = {};
	}

  setConfig(conf){
    if(typeof conf === 'object'){
      let path = pathPlugin + plugin.props.conf.name + pathConfig;
      fs.writeFile(path, 'module.exports = ' + JSON.stringify(conf) + ';', 'utf8', (err) => {
        if(err){
          error(plugin.props.conf.name, 'Impossible to write:', path);
        }
        else{
          success(plugin.props.conf.name, 'Write file:', path);
          this.config = conf;
        }
        this.emit('config', err);
      });
    }
    else{
      error(plugin.props.conf.name, 'the param should be an object');
    }
  }

  setDependencies(deps){
    if(typeof deps === 'object'){
      this.dependencies = deps;
      this.emit('dependencies');
    }
    else{
      error(plugin.props.conf.name, 'the param should be an object');
    }
  }

	loadFront() {
    load.call(this, '/front/index', (error, data) => {
      if(!error){
        this.front = data;
      }
      this.emit('front', error);
    });
		return this;
	}

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

function load(path, cb){
  let className = this.props.conf.name;
  path = pathPlugin + className.toLowerCase() + path;
  try{
    cb(undefined, require(path));
  }
  catch (e){
    warning(className, 'Cannot find module:', path, '\n', e, '\n');
    cb(e);
  }
}

export default Plugin;
