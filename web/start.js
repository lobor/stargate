require('babel/register');

var Server = require('./server/server');

var exec = require('child_process').exec;
var motion = require('./server/utils/motion');
var fs = require('fs');
var os = require('os');

var ConfigEnv = require(process.cwd() + '/config/web/environnement');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var ConfigMotion = require(process.cwd() + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);

let server = new Server();

exec('ls /dev/video*', (error, stdout, stderr) => {
	let webCam = stdout.split('\n'); // output => ['/dev/video0', '/dev/video1', '']

	// Hack last item
	webCam.pop();

	let config = {
		webcam: [],
		motion: new motion()
	};

	ConfigMotion.thread = [];
	webCam.forEach((el, i) => {
		let configJson = {
			videodevice: el,
			stream_port: '808' + (i + 1),
			stream_localhost: 'on'
		};
		config.webcam.push({
			running: false,
			name: el,
			port: configJson.stream_port
		});

		fs.writeFileSync(process.cwd() + '/config/motion/cam' + i + '.js', 'module.exports = ' + JSON.stringify(configJson) + ';');
		configJson = JSON.stringify(configJson)
			.replace(/({|}|'|")/g, '')
			.replace(/:/g, ' ')
			.replace(/,/g, os.EOL);

		fs.writeFileSync(process.cwd() + '/tmp/cam' + i + '.conf', configJson);

		ConfigMotion.thread.push(process.cwd() + '/tmp/cam' + i + '.conf');
	});

	// create directory tmp if not exist
	try {
    fs.accessSync(process.cwd() + '/tmp/', fs.F_OK);
	} catch (e) {
    fs.mkdirSync(process.cwd() + '/tmp/', 0777)
	}

	config
		.motion
		.setConfig(ConfigMotion, process.cwd() + '/tmp/confcam.conf', ConfigAdmin.user + ':' + ConfigAdmin.password);

	if(!error){
		config.motion.start();
	}

	process.on('exit', function (){
	  config.motion.stop();
	});

	server
		.set(config)
		.loadRoutes()
		.start();

});
