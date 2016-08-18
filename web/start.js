require('babel/register');

var Server = require('./server/server');

var exec = require('child_process').exec;
var motion = require('./server/utils/motion');

var ConfigEnv = require(process.cwd() + '/config/web/environnement');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var ConfigMotion = require(process.cwd() + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);


// motion.prototype.setConfig = function(config) {
// 	config = JSON.stringify(config)
// 		.replace(/({|}|'|")/g, '')
// 		.replace(/:/g, ' ')
// 		.replace(/,/g, os.EOL);
//
// 	fs.writeFileSync(process.cwd() + '/tmp/confcam.conf', config);
//
// 	this.configFile = process.cwd() + '/tmp/confcam.conf';
// };

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
		// .setConfig(process.cwd() + '/config/motion/confcam.conf');

	if(!error){
		console.log('Webcam connected');
		config.webcamConnect = true;
		config.motion.start();
		config.webcamRunning = true;
	}

	server
		.set(config)
		.loadRoutes()
		.start();

});
