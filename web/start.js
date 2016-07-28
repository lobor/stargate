require('babel/register');

var Server = require('./server/server');
var exec = require('child_process').exec;
var motion = require(process.cwd() + '/web/src/utils/motion');

var ConfigEnv = require(process.cwd() + '/config/web/environnement');
Object.assign(process.env, ConfigEnv);



let server = new Server();

exec('lsusb', (error, stdout, stderr) => {
	let config = {
		webcamRunning: false,
		webcamConnect: false,
		motion: new motion()
	};

	config
		.motion
		.setConfig(process.cwd() + '/config/motion/confcam.conf');

	config.webcamConnect = /(cam|webcam)/g.test(stdout);
	if(config.webcamConnect){
		config.motion.start();
		config.webcamRunning = true;
	}

	server
		.set(config)
		.loadRoutes()
		.start();

});



