require('babel/register');

var Server = require('./server/server');

var ConfigEnv = require(pathApp + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);



let server = new Server();
server.start();

