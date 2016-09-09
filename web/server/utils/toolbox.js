var fs = require('fs');

module.exports = {
  writeCameraJs: function(config, index){
    let path = process.cwd() + '/config/motion/camera/cam{{index}}.js';
    let data = 'module.exports = {{data}};';
    if(undefined !== index){
      path = path.replace('{{index}}', index);
      data = data.replace('{{data}}', JSON.stringify(config));
      // create directory tmp if not exist
      try {
        fs.accessSync(process.cwd() + '/config/motion/camera', fs.F_OK);
      } catch (e) {
        fs.mkdirSync(process.cwd() + '/config/motion/camera', '0777')
      }
      fs.writeFileSync(path, data);
    }
    else if(undefined === index && Array.isArray(data)){
      data.forEach((el, i) => {
        path = path.replace('{{index}}', i);
        data = data.replace('{{data}}', JSON.stringify(el));
        fs.writeFileSync(path, data);
      })
    }
  }
}
