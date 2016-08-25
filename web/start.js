require('babel/register');

var Server = require('./server/server');

var exec = require('child_process').exec;
var motion = require('./server/utils/motion');

var ConfigEnv = require(process.cwd() + '/config/web/environnement');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var ConfigMotion = require(process.cwd() + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);

let server = new Server();

exec('ls /dev/video0', (error, stdout, stderr) => {
	let config = {
		webcamRunning: false,
		webcamConnect: false,
		motion: new motion()
	};

	config
		.motion
		.setConfig(ConfigMotion, process.cwd() + '/tmp/confcam.conf', ConfigAdmin.user + ':' + ConfigAdmin.password);

	if(!error){
		console.log('Webcam connected');
		config.webcamConnect = true;
		config.motion.start();
		config.webcamRunning = true;
	}

	process.on('exit', function (){
	  config.motion.stop();
	});

	server
		.set(config)
		.loadRoutes()
		.start();

});
