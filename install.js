var spawn = require('child_process').spawn;
var cs = require('./core/console');



// install first plugin
let ls = spawn('npm', ['install'], {cwd: process.cwd() + '/plugins/motion/'});

ls.on('close', (code) => {
  if(code === 0){
    cs.success('Motion plugin');
  }
});



// install file auth
let cpAuth = spawn('cp', ['admin.js.dist', 'admin.js'], {cwd: process.cwd() + '/config/web/'});

cpAuth.stderr.on('data', (data) => {
  cs.error('Copy environnement', data);
});

cpAuth.on('close', (code) => {
  if(code === 0){
    cs.success('Copy Authentification');
  }
});


// install file environnement
let cpEnv = spawn('cp', ['environnement.js.dist', 'environnement.js'], {cwd: process.cwd() + '/config/web/'});

cpEnv.stderr.on('data', (data) => {
  cs.error('Copy environnement', data);
});

cpEnv.on('close', (code) => {
  if(code === 0){
    cs.success('Copy environnement');
  }
});
