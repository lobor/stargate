var spawn = require('child_process').spawn;
var fs = require('fs');
var cs = require('./core/console');
var pathProcess = process.cwd();


// // install first plugin
// let ls = spawn('npm', ['install'], {cwd: process.cwd() + '/plugins/motion/'});
//
// ls.on('close', (code) => {
//   if(code === 0){
//     cs.success('Motion plugin');
//   }
// });


// install file auth
try {
  fs.accessSync(pathProcess + '/config/web/admin.js', fs.F_OK);
} catch (e) {
  let cpAuth = spawn('cp', ['admin.js.dist', 'admin.js'], {cwd: pathProcess + '/config/web/'});

  cpAuth.stderr.on('data', (data) => {
    cs.error('Copy environnement', data);
  });

  cpAuth.on('close', (code) => {
    if(code === 0){
      cs.success('Copy Authentification');
    }
  });
}


// install file environnement
try {
  fs.accessSync(pathProcess + '/config/web/environnement.js', fs.F_OK);
} catch (e) {
  let cpEnv = spawn('cp', ['environnement.js.dist', 'environnement.js'], {cwd: pathProcess + '/config/web/'});

  cpEnv.stderr.on('data', (data) => {
    cs.error('Copy environnement', data);
  });

  cpEnv.on('close', (code) => {
    if(code === 0){
      cs.success('Copy environnement');
    }
  });
}


// install file plugin
try {
  fs.accessSync(pathProcess + '/config/plugins/status.js', fs.F_OK);
} catch (e) {
  let cpPlugins = spawn('cp', ['status.js.dist', 'status.js'], {cwd: pathProcess + '/config/plugins/'});

  cpPlugins.stderr.on('data', (data) => {
    cs.error('Copy status', data);
  });

  cpPlugins.on('close', (code) => {
    if(code === 0){
      cs.success('Copy status');
    }
  });
}


try {
  fs.accessSync(pathProcess + '/plugins/', fs.F_OK);
} catch (e) {
  fs.mkdirSync(pathProcess + '/plugins/', 0777);
}


try {
  fs.accessSync(pathProcess + '/db/', fs.F_OK);
} catch (e) {
  fs.mkdirSync(pathProcess + '/db/', 0777);
  let db = require(pathProcess + '/core/db')(pathProcess + '/db/');
  let users = db.use('Users');
  if(!users.list().length){
    users.push({
      username: 'admin',
      role: 1,
      password: 'password'
    });
    users.save();
  }

  let roles = db.use('Roles');
  if(!roles.list().length){
    roles.push({
      name: "Administrator"
    });
    roles.push({
      name: "User"
    });
    roles.save();
  }
}




try {
  fs.accessSync(pathProcess + '/tmp/', fs.F_OK);
} catch (e) {
  fs.mkdirSync(pathProcess + '/tmp/', 0777);
}
